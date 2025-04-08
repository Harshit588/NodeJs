const express = require('express');
const { initDb } = require('./models/urlShort');
const urlRoute = require('./routes/url'); // Make sure this exports router, not an object

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use routes
app.use('/api/short', urlRoute); // POST, GET Shorten URL APIs

// Handle redirect for short URL access
app.use('api/short/:shortId', urlRoute); // GET http://localhost:3000/q0HiSbPk

// Start server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
