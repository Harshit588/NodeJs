const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user');
const { initDb } = require('./models/urlShort');
const { restrictToLoggedUserOnly } = require('./middleware/auth');

const app = express();
const port = 3000;

// create tables and Connect DB
initDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

// Public routes (no authentication needed)
app.use('/api/user', userRoute); // signup, login

// Protected routes (authentication required)
app.use('/', restrictToLoggedUserOnly, staticRoute);
app.use('/api/short', restrictToLoggedUserOnly, urlRoute);

// Start server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
