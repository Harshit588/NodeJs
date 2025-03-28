var mysql = require("mysql");

// Create mySql connection using phpmyadmin credentials
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root12345",
  database: "sqlpractice",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// crate Select query to fetch all records from the table
var sql = "SELECT * FROM student";
connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log(
    result.forEach(function (row) {
      console.log(
        row.id +
          " " +
          row.name +
          " " +
          row.age +
          " " +
          row.gender +
          " " +
          row.city +
          " " +
          row.phoneNo
      );
    })
  );
});