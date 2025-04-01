const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/database");
const User = require("./models/user");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    // Paths
    this.paths = {
      users: "/api/users/",
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
      await User.sync({ force: false });
      console.log("Database connected");
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    // Morgan
    this.app.use(morgan("dev"));

    // Read and parse body
    this.app.use(express.json());

    // CORS
    this.app.use(cors());
  }

  routes() {
    // Use route paths
    this.app.use(this.paths.users, require("./routes/userRoutes"));
  }

  listen() {
    // Start the server
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;