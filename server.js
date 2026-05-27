let app = require("./src/app")
const connectDB = require("./src/config/db")

//-------connecting db  with server
connectDB();

//initialize server on port 3000
app.listen(3000, () => {
    console.log("server is running on port 3000")
})