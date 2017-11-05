
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs');

let Meme = require('./memes/expandingBrain');

app.use(bodyParser.json());

app.route('/memes/expandingbrain').get((req, res) => {
    res.send("Expanding Brain endpoint");
});

app.route('/memes/expandingbrain').post(async (req, res) => {
    let body = req.body;
    let meme = new Meme(
        'expand.jpg',
        [
            [30, 100],
            [30, 400],
            [30, 700],
            [30, 1000]
        ],
        370
    )
    let imageData = await meme.create(body.captions)
    res.set('Content-Type', 'image/jpeg');
    res.end(imageData)
});

app.listen(3000, () => console.log("Demo listening on port 3000"));


