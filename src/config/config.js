module.exports = {
  "development": {
    "database": `${process.env.DB_NAME}.sqlite`,
    "dialect": "sqlite"
  },
  "test": {
    "database": `${process.env.DB_NAME}.sqlite`,
    "dialect": "sqlite"
  },
  "production": {
    "database": `${process.env.DB_NAME}.sqlite`,
    "dialect": "sqlite"
  }
}