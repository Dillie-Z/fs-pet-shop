'use strict'
const fs = require('fs')
const express = require('express');
const router = express.Router();
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json')

/* GET users listing. */
router.get('/', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        var pets = JSON.parse(petsJSON);
        res.set('Content-Type', 'text/plain');
        res.send(pets);
    })
});

router.get('/:id', (req, res) => {

    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        var pets = JSON.parse(petsJSON);
        let id = Number.parseInt(req.params.id);
        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }
        res.set('Content-Type', 'text/plain')
        res.send(pets[id])
    })
});

router.post('/', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        let pets = JSON.parse(petsJSON);
        let pet = {
            age: req.body.age,
            kind: req.body.kind,
            name: req.body.name
        };
        pets.push(pet);
        let petsJson = JSON.stringify(pets);
        fs.writeFile(petsPath, petsJson, (err) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }
            res.redirect('/')
        });
    });
})

router.put('/:id', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        let pets = JSON.parse(petsJSON);
        let id = Number.parseInt(req.params.id);
        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }
        pets[id] = {
            age: req.body.age,
            kind: req.body.kind,
            name: req.body.name
        };
        let petsJson = JSON.stringify(pets)
        fs.writeFile(petsPath, petsJson, (err) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }
            // res.redirect('/pets')
            res.end()
        })
    })
})

router.delete('/:id', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        let pets = JSON.parse(petsJSON)
        let id = Number.parseInt(req.params.id);
        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }
        pets.splice(petIndex, 1)
        let petsJson = JSON.stringify(pets)
        fs.writeFile(petsPath, petsJson, (err) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }
            res.redirect('/')
        })
    })
})
module.exports = router;
