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



//++++++++++++++++++++++++++++++++++ USERS ++++++++++++++++++++++++++++++++++++++++++++++++
app.route('/users')
    // GET all users using mysql2   
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
    })

//++++++++++++++++++++++++++++++++++ USERS READ(id),UPDATE,DELETE(id) ++++++++++++++++++++++++++++++++++++++++++++++++
app.route('/users/:id')
    // GET user where id =" " using mysql2   
    // Get User by ID
    .get(async (req, res) => {
        const userId = req.params.id;
        const query = 'SELECT * FROM users WHERE id = ?';

        pool.promise()
            .query(query, [userId])
            .then(([rows]) => {
                if (rows.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(rows[0]); // Return user details
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    })

    // Update User by ID
    .put(async (req, res) => {
        const userId = req.params.id;
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Name, email, and phone are required' });
        }

        const query = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';

        pool.promise()
            .query(query, [name, email, phone, userId])
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json({ status: 'Success', message: 'User updated successfully' });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    })

    // Delete User by ID
    .delete(async (req, res) => {
        const userId = req.params.id;
        const query = 'DELETE FROM users WHERE id = ?';

        pool.promise()
            .query(query, [userId])
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json({ message: 'User deleted successfully' });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    });

//++++++++++++++++++++++++++++++++++ Books ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.route('/books')
    // GET all books using mysql2   
    .get(async (req, res) => {
        pool.promise()
            .query('SELECT id, title, author, isbn, available FROM books')
            .then(([rows]) => {
                // Convert 0 → false and 1 → true
                rows = rows.map(row => ({
                    ...row,
                    available: row.available === 1 // Ensures boolean conversion
                }));
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


//++++++++++++++++++++++++++++++++++ BOOKS READ(id),UPDATE,DELETE(id) ++++++++++++++++++++++++++++++++++++++++++++++++
app.route('/books/:id')
    // GET books where id =" " using mysql2   
    // Get Book by ID
    .get(async (req, res) => {
        const bookId = req.params.id;
        const query = 'SELECT id, title, author, isbn, available FROM books WHERE id = ?';

        pool.promise()
            .query(query, [bookId])
            .then(([rows]) => {
                if (rows.length === 0) {
                    return res.status(404).json({ error: 'Book not found' });
                }
                // Convert available (0/1) to boolean (true/false)
                const book = {
                    ...rows[0],
                    available: rows[0].available === 1 // Convert 1 → true, 0 → false
                };
                res.json(book);
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    })

    // Update a Book
    .put(async (req, res) => {
        const bookId = req.params.id;
        const { title, author, isbn, available } = req.body;

        if (!title || !author || !isbn) {
            return res.status(400).json({ error: 'Title, Author, and ISBN are required' });
        }

        const query = 'UPDATE books SET title = ?, author = ?, isbn = ?, available = ? WHERE id = ?';

        pool.promise()
            .query(query, [title, author, isbn, available ? 1 : 0, bookId])  // Convert boolean to 0/1
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Book not found' });
                }
                res.json({ status: 'Success', message: 'Book updated successfully' });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    })

    // Delete a Book
    .delete(async (req, res) => {
        const bookId = req.params.id;
        const query = 'DELETE FROM books WHERE id = ?';

        pool.promise()
            .query(query, [bookId])
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Book not found' });
                }
                res.json({ status: 'Success', message: 'Book deleted successfully' });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    });

//++++++++++++++++++++++++++++++++++ BORROW RECORD OF BOOK AND USER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

//++++++++++++++++++++++++++++++++++ BORROW READ(id),UPDATE,DELETE(id) ++++++++++++++++++++++++++++++++++++++++++++++++
app.route('/borrow/:id')
    // GET borrow where id =" " using mysql2   
    .get(async (req, res) => {
        const borrowId = req.params.id;
        const query = `
        SELECT borrow_records.id, borrow_records.borrow_date, borrow_records.return_date,
               users.name AS user_name, books.title AS book_title
        FROM borrow_records
        JOIN users ON borrow_records.user_id = users.id
        JOIN books ON borrow_records.book_id = books.id
        WHERE borrow_records.id = ?
    `;

        pool.promise()
            .query(query, [borrowId])
            .then(([rows]) => {
                if (rows.length === 0) {
                    return res.status(404).json({ error: 'Borrow record not found' });
                }
                res.json(rows[0]); // Return borrow record details
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    })
    // Update a Borrow
    .put(async (req, res) => {
        const borrowId = req.params.id;
        const { return_date } = req.body;

        if (!return_date) {
            return res.status(400).json({ error: 'return_date is required' });
        }

        const query = 'UPDATE borrow_records SET return_date = ? WHERE id = ?';

        pool.promise()
            .query(query, [return_date, borrowId])
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Borrow record not found' });
                }
                res.json({ status: 'Success', message: 'Borrow record updated successfully' });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    })
    // delete a Borrow
    .delete(async (req, res) => {
        const borrowId = req.params.id;
        const query = 'DELETE FROM borrow_records WHERE id = ?';

        pool.promise()
            .query(query, [borrowId])
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Borrow record not found' });
                }
                res.json({ status: 'Success', message: 'Borrow record deleted successfully' });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    });

// Home Page Route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "🏠 Welcome to the Library System API",
        status: "success",
        documentation: "http://localhost:3000/docs",
        availableRoutes: {
            books: "/books",
            users: "/users",
            borrowRecords: "/borrow"
        }
    });
});

// API Documentation Route
app.get('/docs', (req, res) => {
    res.status(200).json({
        project: "📚 Library System API",
        description: "A RESTful API for managing books, users, and borrow records in a library.",
        techStack: ["Node.js", "Express.js", "MySQL", "mysql2"],
        features: [
            "📖 Manage books (CRUD operations)",
            "👤 Manage users (CRUD operations)",
            "📅 Track borrow and return records",
            "🔍 Search books and users",
            "✅ Data validation & security"
        ],
        endpoints: {
            home: { method: "GET", url: "/" },
            books: {
                getAll: { method: "GET", url: "/books" },
                getById: { method: "GET", url: "/books/:id" },
                create: { method: "POST", url: "/books" },
                update: { method: "PUT", url: "/books/:id" },
                delete: { method: "DELETE", url: "/books/:id" }
            },
            users: {
                getAll: { method: "GET", url: "/users" },
                getById: { method: "GET", url: "/users/:id" },
                create: { method: "POST", url: "/users" },
                update: { method: "PUT", url: "/users/:id" },
                delete: { method: "DELETE", url: "/users/:id" }
            },
            borrowRecords: {
                getAll: { method: "GET", url: "/borrow" },
                getById: { method: "GET", url: "/borrow/:id" },
                create: { method: "POST", url: "/borrow" },
                update: { method: "PUT", url: "/borrow/:id" },
                delete: { method: "DELETE", url: "/borrow/:id" }
            }
        },
        repository: "https://github.com/your-username/library-system-api",
        status: "✅ API is running"
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
