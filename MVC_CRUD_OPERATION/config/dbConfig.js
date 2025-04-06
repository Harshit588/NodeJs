const mysql = require('mysql2');

const mySqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'user',
  port: 3306
});

// Export the promise-based pool
module.exports = mySqlPool.promise();
