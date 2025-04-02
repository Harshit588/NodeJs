const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'indew_librarysystem',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306
});

// Function to create tables if they don't exist
const createTables = async () => {
    const db = pool.promise();

    try {
        // Users Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                phone VARCHAR(15) NOT NULL
            )
        `);

        // Books Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS books (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(100) NOT NULL,
                isbn VARCHAR(50) UNIQUE NOT NULL,
                available BOOLEAN DEFAULT TRUE
            )
        `);

        // Borrow Records Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS borrow_records (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                book_id INT NOT NULL,
                borrow_date DATE DEFAULT (CURRENT_DATE),
                return_date DATE DEFAULT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
            )
        `);

        console.log("✅ Tables checked and created if not found!");

        // Close the connection pool after execution
        pool.end();
    } catch (err) {
        console.error("❌ Error creating tables:", err);
    }
};

// Call the function
createTables();
