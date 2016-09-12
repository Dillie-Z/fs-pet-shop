'use strict'

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.PORT || 8000;

app.get('/pets', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        var pets = JSON.parse(petsJSON);
        res.set('Content-Type', 'text/plain');
        res.send(pets);
    });
});


app.get('/pets/:id', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(404);
        }
        let id = Number.parseInt(req.params.id);
        let pets = JSON.parse(petsJSON);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }
        res.set('Content-Type', 'text/plain');
        res.send(pets[id]);
    });
});

// app.post('/pets', (req, res) => {
//     fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
//       if(err){
//         console.error("this here error",err.stack);
//         return res.sendStatus(404);
//       }
//         let pets = JSON.parse(petsJSON);
//         var petAge = ;
//         var petKind = ;
//         var petName = ;
//         let pet = {
//             age: petAge,
//             kind: petKind,
//             name: petName
//         };
//         pets.push(pet);
//
//         let petsJson = JSON.stringify(pets);
//         res.send(petsJson);
//
//     });
// 
// });

app.listen(port, () => {
    console.log('listening on port: ', port);
});
