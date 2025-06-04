const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

// Models
const db = require('./config/database');
const User = require('./models/user');
const Address = require('./models/address');
const Role = require('./models/role');
const Image = require('./models/image');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    // Paths
    this.paths = {
      default: '/api/',
      fileUpload: '/api/upload'
    };

    // Connect to the database
    this.database();

    // Json
    this.app.use(express.json());

    // Middlewares
    this.middlewares();

    // Application routes
    this.routes();
  }

  async database() {
    // Database connection
    try {
      await db.authenticate();
      // Add models
      await Address.sync({force: false});
      await Role.sync({force: false});
      await User.sync({force: false});
      await Image.sync({force: false});
      console.log('Database connected');
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    // Morgan
    this.app.use(morgan('dev'));

    // Read and parse body
    this.app.use(express.json());

    // CORS 
    this.app.use(cors());

    // File Upload
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }))
  }

  routes() {
    // Use route paths
    this.app.use(this.paths.default, require('./routes/authRoutes'));
    this.app.use(this.paths.fileUpload, require('./routes/fileUploadRoutes'));
  }

  listen() {
    // Start the server
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;