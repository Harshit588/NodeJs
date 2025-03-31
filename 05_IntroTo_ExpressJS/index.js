const express = require('express')
const app = express();
const port = 7777;

app.get('/', (req, res) => {
    return res.send(`Home Page \n Hello ${req.query.name} and you are ${req.query.age} year old`)
})
app.get('/about', (req, res) => {
    return res.send('Hello From About Page')
})

app.listen(port, () => console.log(`Server Started at port No ${port}`))










