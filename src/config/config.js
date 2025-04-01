module.exports = {
  "development": {
    "database": process.env.DB_NAME,
    "storage": `${process.env.DB_NAME}.sqlite`,
    "dialect": "sqlite"
  },
  "test": {
    "storage": "database_test.sqlite",
    "dialect": "sqlite"
  },
  "production": {
    "storage": "database_production.sqlite",
    "dialect": "sqlite"
  }
}