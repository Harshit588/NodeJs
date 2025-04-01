const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies (use Express's built-in middleware)
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'indew_librarysystem',
    password: "root123",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306 // Ensure it's 3306
});

app.route('/books')
    // GET all books using mysql2   
    .get(async (req, res) => {
        pool.promise()
            .query('SELECT * FROM books')
            .then(([rows]) => {
                res.json(rows);
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    })
    // POST create a new book using mysql2
    .post(async (req, res) => {
        const data = req.body;  // Get the data from the request body
        console.log(data);  // Logs the data to see what is being sent

        // Check if required fields are present
        const { title, author, isbn, available } = data;
        if (!title || !author || !isbn) {
            return res.status(400).json({ error: 'Title, author, and ISBN are required' });
        }

        // Default 'available' to true if not provided
        const isAvailable = available !== undefined ? available : true;

        const query = 'INSERT INTO books (title, author, isbn, available) VALUES (?, ?, ?, ?)';
        pool.promise()
            .query(query, [title, author, isbn, isAvailable])  // Insert the values into the books table
            .then(([result]) => {
                res.status(201).json({ status: 'Success', id: result.insertId });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    });

app.route('/users')
    .get(async (req, res) => {
        pool.promise()
            .query('SELECT * FROM users')
            .then(([rows]) => {
                res.json(rows);
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    })
    // POST create a new user using mysql2
    .post(async (req, res) => {
        const data = req.body;  // Get the data from the request body
        console.log(data);  // Logs the data to see what is being sent

        // Check if required fields are present
        const { name, email, phone } = data;
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Name, email, and phone are required' });
        }

        const query = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
        pool.promise()
            .query(query, [name, email, phone])  // Use the destructured values directly
            .then(([result]) => {
                res.status(201).json({ status: 'Success', id: result.insertId });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    });

app.route('/borrow')
    // POST create a new borrow record
    .post(async (req, res) => {

        console.log('Request Body:', req.body);
        const data = req.body;  // Get the data from the request body
        console.log(data);  // Logs the data to see what is being sent

        // Destructure the data from the body
        const { user_id, book_id, borrow_date, return_date } = data;

        // Validate required fields
        if (!user_id || !book_id || !borrow_date) {
            return res.status(400).json({ error: 'User ID, Book ID, and Borrow Date are required' });
        }

        // Optional: Validate if the user and book exist (if necessary)
        // You can check if the user and book exist in the database before inserting the borrow record

        const query = 'INSERT INTO borrow_records (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)';
        pool.promise()
            .query(query, [user_id, book_id, borrow_date, return_date || null])  // Insert the borrow record
            .then(([result]) => {
                res.status(201).json({ status: 'success', id: result.insertId });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    })
    // GET all borrow records with user and book details
    .get(async (req, res) => {
        const query = `
            SELECT borrow_records.id, borrow_records.borrow_date, borrow_records.return_date,
                   users.name AS user_name, books.title AS book_title
            FROM borrow_records
            JOIN users ON borrow_records.user_id = users.id
            JOIN books ON borrow_records.book_id = books.id
        `;

        pool.promise()
            .query(query)
            .then(([rows]) => {
                res.json(rows); // Send the records as JSON response
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
