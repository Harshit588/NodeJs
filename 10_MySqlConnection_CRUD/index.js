const express = require('express') // Import express
const table = require('./models/user.model') // Import table
const userRouter = require('./routes/user.route') // Import user route
const connection = require('./config/MySqlConnection') // Import connection
const logReqRes = require('./middlewares/app.middleware') // Import Middleware

const app = express() // Create an instance of express
const port = 3000 // Define the port

// Connect to the database  
connection.authenticate()// Authenticate the connection
    .then(() => console.log('Database connected successfully')) // Log success message
    .catch(err => console.error('Database connection error:', err)); // Log error message

// Table creation
table.sync() // Create the table if it doesn't exist
    .then(() => console.log('Users table created successfully')) // Log success message
    .catch(err => console.error('Error creating table:', err)); // Log error message

// Middleware plugins
app.use(logReqRes('./middlewares/log.txt')) // Middleware to log request and response 
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data

// Routes
app.use('/users', userRouter) // Use user router for /users endpoint

app.listen(port, () => console.log(`App listening on port ${port}!`))// Log success message
