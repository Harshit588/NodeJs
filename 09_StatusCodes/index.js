const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.post('/users', (req, res) => {
    res.status(201).send({ 'status': "Success" })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))  
