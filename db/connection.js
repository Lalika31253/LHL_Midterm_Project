// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect();

// db.query(`SELECT * FROM products LIMIT 1;`).then(response => {console.log(response)})
db.query(`SELECT * FROM products LIMIT 1;`).then(response => {console.log(response.rows[0])}) //Shows you are connected to db

module.exports = db;
