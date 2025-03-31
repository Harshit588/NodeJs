const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',  // Use 127.0.0.1 to avoid potential issues with localhost
  user: 'root',
  password: 'root12345',  // Use the correct password here
  database: 'user',  // Replace with the actual database you're connecting to
  port: 3306,  // Default MySQL port
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the MySQL server');
});
