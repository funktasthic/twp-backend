const { Sequelize } = require("sequelize");

const db = new Sequelize({
    dialect: "sqlite",
    logging: false,
    storage: `src/database/${process.env.DB_NAME}.sqlite`,
});

module.exports = db;