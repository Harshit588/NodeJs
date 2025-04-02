const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.post('/users', (req, res) => {
    const body = req.body;
    if (!body || !body.username || !body.password) {
        res.status(400).send({ "Status": "Not All Fields Revieced" }) //BAD REQUEST
    } else {
        console.log(body.username, " :: ", body.password);
        res.status(201).send({ 'status': "Success" }) // CREATED
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))  
