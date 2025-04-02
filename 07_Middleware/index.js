const express = require('express')
const app = express()
const port = 3000

// Custom middleware1
app.use((request, response, next) => {
    console.log("Inside middleware 1");
    next()
})
// Custom middleware3
app.use((request, response, next) => {
    console.log("Inside middleware 2");
    // return response.send('Hii from Middleware 2')
    next()
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))