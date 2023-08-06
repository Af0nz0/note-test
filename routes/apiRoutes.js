const express = require("express");
const router = express.Router();

const store = require("../db/store");

router.get("/notes", (req, res) => {
  store
    .getNotes()

    //send notes a JSON
    .then((notes) => res.json(notes))

    //if error occurs, 500
    .catch((err) => res.status(500).json(err));

});

router.post("/notes", (req, res) => {
  store
    .addNote(req.body)

    //sends added note a JSON response
    .then((note) => res.json(note))

    //sends 500 status code if an error occurs
    .catch((err) => res.status(500).json(err));
  
});


router.delete("/notes/:id", (req, res) => {
  store
    .removeNote(req.params.id)

    //sends confirmation json response
    .then(() => res.json({ success: true }))

    //respond with status 500 for any error that occurs
    .catch((err) => res.status(500).json(err));
  
});

// exports router module for use in other file
module.exports = router;

