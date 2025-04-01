const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "127.0.0.1",  // Use 127.0.0.1 instead of 'localhost'
    user: "root",
    password: "root123",
    database: "user", // Replace with your database name
    port: 3306,  // Ensure it's 3306
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to MySQL successfully!");
});

// ✅ Create table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS UserData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    age INT
  )
`;

connection.query(createTableQuery, (err, result) => {
    if (err) {
        console.error("Error creating table:", err);
        return;
    }
    console.log("UserData table created or already exists.");
    
    // ✅ Insert sample data
    const insertQuery = `INSERT INTO UserData (name, email, age) VALUES (?, ?, ?)`;
    const user = ["John Doe", "john.doe@example.com", 25];

    connection.query(insertQuery, user, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return;
        }
        console.log("User inserted successfully! ID:", result.insertId);

        // ✅ Fetch and display all users
        connection.query("SELECT * FROM UserData", (err, results) => {
            if (err) {
                console.error("Error fetching users:", err);
                return;
            }
            console.log("All Users:", results);

            connection.end(); // Close the connection after execution
        });
    });
});
