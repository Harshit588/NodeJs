const express = require('express');
const app = express();
const port = 3000;

const studentRoute = require('./routes/studentRoute')

app.use(express.urlencoded({ extended: true }));

// // Getting Student data by ID :: GET:id, GET, DELETE ,POST, UPDATE(PATCH)
app.use('/students', studentRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});