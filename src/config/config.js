module.exports = {
  "development": {
    "database": process.env.DB_NAME,
    "storage": `src/database/${process.env.DB_NAME}.sqlite`,
    "dialect": "sqlite"
  },
  "test": {
    "storage": "src/database/database_test.sqlite",
    "dialect": "sqlite"
  },
  "production": {
    "storage": "src/database/database_production.sqlite",
    "dialect": "sqlite"
  }
}