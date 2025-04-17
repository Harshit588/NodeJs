const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url'); // Make sure this exports router, not an object

const staticRoute = require('./routes/staticRouter')

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
app.use('api/short/:shortId', urlRoute); // GET http://localhost:3000/q0HiSbPk

app.use('/', staticRoute)


// Start server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
