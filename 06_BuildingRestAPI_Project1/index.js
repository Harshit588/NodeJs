// requires the Mock Data of User
const user = require('./MOCK_DATA.json')

// require the FS module
var fs = require('fs');

// require the express library
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data

// Create All Routes 

// 1. Show all users' first names in an HTML list: http://localhost:3000/users
// - Uses `map()` to extract `first_name` from each user and generate an unordered list.
app.get('/users', (request, response) => {
    const html = `<ul>${user.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`
    return response.send(html)
})

// 2. Show all users as JSON: http://localhost:3000/api/users
// - Uses `route()` to handle multiple HTTP methods on `/api/users`.
// - `GET` returns all users in JSON format.
// - `POST` is currently a placeholder; should be implemented to create a new user.
app.route('/api/users')
    .get((request, response) => response.json(user)) // Returns all users
    .post((request, response) => {
        const data = request.body; // Get the data sent from the frontend

        // Calculate the next ID based on the highest existing ID in the array
        const maxId = Math.max(...user.map(user => user.id), 0);
        const newId = maxId + 1;

        // Add the new user with the unique ID
        user.push({ id: newId, ...data });

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(user, null, 2), (err) => {
            if (err) {
                return response.status(500).json({ error: "Some problem occurred while saving user" });
            } else {
                return response.json({ status: "Success", id: newId });
            }
        });
    });


// 3. Get, Delete, and Update user by ID: http://localhost:3000/api/users/:id
// - `GET`: Finds and returns the user by `id`.
// - If the user is not found, returns `{ error: "User not found" }`.
// - `DELETE` and `PATCH` are placeholders; they need proper implementation.
app
    .route('/api/users/:id')
    .get((request, response) => {
        const id = parseInt(request.params.id); // Get ID from URL params

        const data = user.find(user => user.id === id); // Find user by ID
        if (!data) {
            return response.json({ error: "User not found" }); // Return error if user is not found
        }
        return response.json(data); // Return user data
    })
    .delete((request, response) => { // Ensure `.delete()` is correctly formatted
        const id = parseInt(request.params.id); // Get the ID from params

        const index = user.findIndex(user => user.id === id); // Find user index

        if (index === -1) {
            return response.status(404).json({ error: "User not found" }); // If user not found, return error
        }

        user.splice(index, 1); // Remove user from array

        // Update the MOCK_DATA.json file
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(user, null, 2), (err) => {
            if (err) {
                return response.status(500).json({ error: "Some problem occurred while deleting user" });
            } else {
                return response.json({ status: "Success", message: "User deleted successfully" });
            }
        });
    })
    .patch((request, response) => {
        const id = parseInt(request.params.id); // Get ID from URL params
        const data = request.body; // Get updated user data from the body

        // Find the user by ID
        const userToUpdate = user.find(user => user.id === id);

        if (!userToUpdate) {
            return response.status(404).json({ error: "User not found" }); // If user not found
        }

        // Update the user properties with the new data
        Object.assign(userToUpdate, data);

        // Save the updated users array to MOCK_DATA.json
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(user, null, 2), (err) => {
            if (err) {
                return response.status(500).json({ error: "Some problem occurred while updating user" });
            } else {
                return response.json({ status: "Success", message: "User updated successfully" });
            }
        });
    })

// create the server at port 8000 and start it
app.listen(port, () => console.log(`Server Started at port :: ${port}`))