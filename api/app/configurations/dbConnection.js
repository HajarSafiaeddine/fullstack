const mysql = require("mysql");
config = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  port: process.env.DB_PORT,
};
const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
});

connection.connect((err) => {
  if (!err) {
    console.log("connected to database");
  } else {
    console.log(err);
  }
});

module.exports = connection;
