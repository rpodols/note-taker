const express = require('express');
const path = require('path');
const fs = require('fs');
// npm install uuid
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }
    const notes = JSON.parse(data);

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => res.json(notes));

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = uuid.v4()
    notes.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(notes), function(err) {
        if (err) {
        console.log(err);
        }
        console.log("Success, note added!")
    });
    res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res){
    const noteDelete = req.params.id;
    for(var i = 0; i < notes.length; i++){ 
        var noteIndex = notes.findIndex(obj => obj.id == noteDelete)
        if (notes[i].id === noteDelete) { 
            notes.splice(noteIndex, 1); 
        }
    }
    fs.writeFile("db/db.json", JSON.stringify(notes), function(err) {
        if (err) {
        console.log(err);
        }
        console.log("Success, note deleted!")
    });
    res.json(notes)
});

app.get('/api/notes/:id', function(req, res) {
    res.json(notes[req.params.id])
});

app.use("*", function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => {
  console.log(`app listening @ http://localhost:${PORT}`)
});

});
