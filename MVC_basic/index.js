const express = require('express');
const userRouter = require('./routes/userRoute')

const app = express();

app.use('/user', userRouter);
app.use('/user:id', userRouter)

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))