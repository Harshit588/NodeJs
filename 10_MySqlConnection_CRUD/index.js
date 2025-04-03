const mysql = require('mysql2')
const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data

// Give DB details
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'user',
    port: 3306,
});

// Connect to DB 
connection.connect((err) => {
    if (err) {
        console.log("Error in Connection ", err);
    } else {
        console.log("Coonection Done");
    }
})

app.get('/', async (req, res) => {
    const query = 'Select * from userdata';
     connection.query(query, (err, result) => {
        if (err) {
            res.send({ status: "UnSuccefful", Massage: err })
        } else {
            res.json(result)
        }
    })
})


// Insert Query Data recieved from Postman useing try catch and async await
app.post('/user', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
            return res.status(400).json({ Status: 'Error', Message: 'All fields are required' });
        }

        const query = "INSERT INTO userdata (name, email, age) VALUES (?, ?, ?)";
        const values = [name, email, age];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.log("Error in Insert Operation..");
                return res.status(500).json({ Status: 'Error', Message: 'Database Error' });
            }
            return res.status(201).json({ Status: 'Success', InsertedID: result.insertId });
        })

    } catch (error) {
        res.send({ status: "Error", Msg: error })
    }
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))