const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "worud0554*-*",
  database: "breakalegg",
  connectionLimit: 40,
  charset: "utf8",
  dateStrings: "date",
});

module.exports = pool;
