
let express = require("express");
const noteModel = require("./models/note.model");

let app = express()


/**
 *@route POST/api/notes
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




module.exports = app