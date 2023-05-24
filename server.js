const express = require('express');
const path = require('path');
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  // Create a new note
  app.post("/api/notes", function (req, res) {
    let serverNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let inNote = req.body;
    let newId = savedNotes.length.toString();
    inNote.id = newId;
    serverNotes.push(inNote);
  
    fs.writeFileSync("./db/db.json", JSON.stringify(serverNotes));
    console.log("Note saved to db.json ");
    res.json(serverNotes);
  });

  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);