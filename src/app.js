
let express = require("express");
const noteModel = require("./models/note.model");

let app = express()

//----to accept the data from the user
app.use(express.json())


/**
 *@route POST/note/create
 *@description create a new note need title and description in the request body
 *@access Public
 */

app.post("/note/create", async (req, res) => {
    try {
        let { title, description } = req.body

        //validate the given info from the user

        if (!title) return res.status(400).json({ error: "Title required" });

        if (!description) return res.status(400).json({ error: "description required" });

        if (title.trim().length < 4) return res.status(400).json({ error: "title must be at least 4 character long" });

        if (description.trim().length < 10) return res.status(400).json({ error: "description must be at least 10 character long" });

        //if vaidate successfully create new note

        let newNote = await noteModel.create({
            title,
            description
        });

        return res.status(201).json({
            message: "note created successfully",
            newNote,
        })


    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            err: error.message
        })
    }
})



/**
 *@route GET/note/read
 *@description get app notes
 *@access Public
 */

app.get("/note/read", async (req, res) => {
    try {

        let notes = await noteModel.find()

        return res.status(200).json({
            message: "all data fetched successfully",
            notes
        })


    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            err: error.message
        })
    }
})



/**
 *@route PATCH/note/update
 *@description update a note by id require description  in the request body
 *@access Public
 */

app.patch("/note/update/:id", async (req, res) => {
    try {

        let { id } = req.params;
        let { description } = req.body

        //validation
        if (!description) return res.status(400).json({ error: "description required" });

        if (description.trim().length < 10) return res.status(400).json({ error: "description must be at least 10 character long" });

        let note = await noteModel.findById(id)

        if (!note) return res.status(400).json({ message: "note not found" });
        note.description = description
        await note.save();

        return res.status(200).json({
            message: "note updated successfully",
            note
        })

    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            err: error.message
        })
    }
})


/**
 *@route DELETE/note/delete
 *@description update a note by id require description  in the request body
 *@access Public
 */

app.patch("/note/delete/:id", async (req, res) => {
    try {

        let { id } = req.params;


        let note = await noteModel.findByIdAndDelete(id)

        return res.status(200).json({
            message: "note Deleted successfully",
        })

    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            err: error.message
        })
    }
})





module.exports = app