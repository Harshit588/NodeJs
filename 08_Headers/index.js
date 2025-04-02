const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log(req.headers); // print the coming custom header 
    res.setHeader('X-myName', 'Harshit') // Send the header in response
    res.send('Hello World!')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))