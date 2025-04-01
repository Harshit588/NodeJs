// requires the Mock Data of User
const user = require('./MOCK_DATA.json')

// require the express library
const express = require('express');
const app = express();
const port = 3000;

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
        // TODO :: Implement user creation logic
        response.json("user created")
    })

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
    .delete((request, response) => {
        // TODO :: Implement logic to delete a user by ID
    })
    .patch((request, response) => {
        // TODO :: Implement logic to update a user by ID
    })


// create the server at port 8000 and start it
app.listen(port, () => console.log(`Server Started at port :: ${port}`))
