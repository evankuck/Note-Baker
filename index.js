// import express
const express = require("express");
// start the express server
const app = express();
const fs = require("fs");
const path = require("path");
const router = express.Router();
// declare the port
const port = 3000;

// apply middleware before we turn on the server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// declare the routes

// GET /api/notes
app.get("/api/notes", (req, res) => {
  // get the notes from the json database (db/db.json)
  // use FS to read the file
  fs.readFile("./db/db.json", { encoding: "utf8" }, (error, data) => {
    if (error) throw error;
    console.log(data);
    // console.log("typeof data:", typeof data)
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST /api/notes
app.post("/api/notes", (req, res) => {
  // get the note from the json database(db/db.json)
  // use FS to read the file
  fs.readFile("./db/db.json", { encoding: "utf-8" }, (error, data) => {
    if (error) throw error;
    console.log(data);
    // parse the data into an object
    const notes = JSON.parse(data);
    // add the new note to the notes array
    notes.push(req.body); // key method here: push adds to the end of the array
    // stringify the notes array so we can write it to the file
    const stringifiedNotes = JSON.stringify(notes);
    // write the stringified notes to the file
    fs.writeFile("./db/db.json", stringifiedNotes, (error) => {
      if (error) throw error;
      else console.log("Note added to database");
    });
  });

  res.json({ message: "Hello World POST" });
});

// DELETE /api/notes
app.delete("/api/notes", (req, res) => {
  // get the note from the json database(db/db.json)
  // use FS to read the file
  fs.readFile("./db/db.json", { encoding: "utf-8" }, (error, data) => {
    if (error) throw error;
    console.log(data);
    // parse the data into an object
    const notes = JSON.parse(data);
    const id = req.body.id;
    // find the note with the id in the notes array and remove it
    notes.splice(id, 1); // key method here: splice removes from the array provided the index to start at and the number of items to remove
    // stringify the notes array so we can write it to the file
    const stringifiedNotes = JSON.stringify(notes);
    // write the stringified notes to the file
    fs.writeFile("./db/db.json", stringifiedNotes, (error) => {
      if (error) throw error;
      else console.log("Note deleted from database");
    });
  });

  res.json({ message: "Hello World DELETE" });
});

// GET the /notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// GET the home page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// turn on the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
