const { default: mongoose } = require("mongoose");

let noteSchema = new mongoose.Schema(
    {
        title: String,
        description: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)



let noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel