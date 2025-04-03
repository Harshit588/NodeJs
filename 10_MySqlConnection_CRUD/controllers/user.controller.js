const db = require('../config/MySqlConnection'); // Import MySQL connection
const User = require('../models/user.model'); // Ensure correct path

const insertUser = async (req, res) => {
    try {
        const { name, email, age } = req.body; // Extract values from request
        if (!name || !email || !age) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newUser = await User.create({ name, email, age, createdAt: new Date(), updatedAt: new Date() });

        // Send response with created user and ID 
        res.status(201).json({ message: "User created successfully", ID: newUser.id });
    } catch (error) {
        console.error("SQL Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// get all users
const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users'); // Query to get all users
        res.status(200).json(rows); // Send response with users
    } catch (error) {
        console.error("SQL Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// get user by id
const getUserById = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters

    try {
        const user = await User.findByPk(id); // Use Sequelize findByPk

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user); // Send user data
    } catch (error) {
        console.error("SQL Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update user by ID 
const updateUser = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    const { name, email, age } = req.body; // Extract values from request

    try {
        const user = await User.findByPk(id); // Use Sequelize findByPk

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user data
        user.name = name || user.name;
        user.email = email || user.email;
        user.age = age || user.age;
        await user.save(); // Save changes

        res.status(200).json({ message: "User updated successfully", afterUpdate: user });
    } catch (error) {
        console.error("SQL Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
// Delete user by ID 
const deleteUser = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters

    try {
        const user = await User.findByPk(id); // Use Sequelize findByPk

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy(); // Delete user

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("SQL Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { insertUser, getAllUsers, getUserById, updateUser, deleteUser }; // Export controller functions
