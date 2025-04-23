const express = require('express');
const path = require('path');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user');

const app = express();
const port = 3000;

const { initDb } = require('./models/urlShort');

// create tables and Connect DB
initDb();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Set the view engine to EJS 
app.set('view engine', 'ejs');

// Set the views directory
app.set("views", path.resolve("./views"))

// Use routes
app.use('/api/short', urlRoute); // POST, GET Shorten URL APIs

// Handle redirect for short URL access
// app.use('/api/short/:shortId', urlRoute); // GET http://localhost:3000/q0HiSbPk

// redirect to Home page 
app.use('/', staticRoute)

// redirect to signup and Login page
app.use('/api/user', userRoute); // POST http://localhost:3000/api/user/signup

// Start server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
