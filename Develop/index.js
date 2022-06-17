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
  res.json({ message: "Hello World POST" });
});

// DELETE /api/notes
app.delete("/api/notes", (req, res) => {
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
