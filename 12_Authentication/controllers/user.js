const db = require('../config/mysqlDbConfig');

// Function to handle user signup
const userSignUp = (req, res) => {
    const { username, email, password } = req.body;
    console.log("Request body:", req.body);

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    db.execute(insertQuery, [username, email, password])
        .then(() => {
            // Redirect to login page with a success message
            res.redirect('/api/user/login?signup=success');
        })
        .catch((error) => {
            console.error('Signup error:', error);
            res.status(500).send('Error creating user' + error);
        });
};




// Function to handle user login
async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log('Login attempt with email:', email);
        console.log('Password:', password);

        const selectQuery = `SELECT * FROM users WHERE email = "${email}" AND password = ${password}`;

        console.log(selectQuery);

        const [rows] = await db.query(selectQuery);
        console.log('DB Result:', rows); // Log the rows to check if they're being fetched

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If a user was found, proceed with success
        return res.redirect('/')
        // res.status(200).json({ loginStatus: 'User logged in successfully!' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}


module.exports = {
    userSignUp,
    userLogin
};