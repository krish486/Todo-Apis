const { default: mongoose } = require("mongoose")


//creating db connecting function 

let connectDB = async () => {
    try {

        await mongoose.connect("mongodb://0.0.0.0/todo");
        console.log("db connected successfully");

    } catch (error) {
        console.log("error in connecting db", error)
    }
}

module.exports = connectDB