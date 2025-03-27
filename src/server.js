const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);

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