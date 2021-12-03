const Pool = require("pg").Pool;
const pass = require("./pass/pass");

const pool = new Pool({
  user: "postgres",
  password: pass,
  host: "localhost",
  port: 5432,
  database: "todoapp",
});

module.exports = pool;
