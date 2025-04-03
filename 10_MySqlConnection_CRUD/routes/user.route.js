const express = require('express'); // Import express
const UserController = require('../controllers/user.controller'); // Import controller


const router = express.Router(); // Create a new router instance

// Define routes and connect to controller functions
router.get('/', UserController.getAllUsers); // Get all users
router.get('/:id', UserController.getUserById); // Get user by ID
router.post('/', UserController.insertUser); // Insert a new user
router.put('/:id', UserController.updateUser); // Update user by ID
router.delete('/:id', UserController.deleteUser); // Delete user by ID

module.exports = router;// Export the router instance
