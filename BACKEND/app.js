const express = require("express")
require('./db')
const userRouter = require("./routes/user")

const app = express()

//the data coming from frontend will be in chunk, we need to convert it into JSON
app.use(express.json())

//app.get(routes, controller)
app.use('/api/user', userRouter)


//.listen will listen when the connection of the backend to the port 8000 is made
app.listen(8000, () => {
    console.log("This is amazing");
});


