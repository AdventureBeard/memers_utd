
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs');

app.use(bodyParser.json());


const Meme = require('./meme');
app.route('/memes/expandingbrain').get((req, res) => {
    res.send("Expanding Brain endpoint");
});

app.route('/memes/expandingbrain').post(async (req, res) => {
    let body = req.body;
    let expandingBrainMeme = new Meme(
        'expand.jpg',
        [
            [30, 100],
            [30, 400],
            [30, 700],
            [30, 1000]
        ],
        370
    )

    /* Remember that error we threw in the Meme class? Let's catch 
    it here and return a 400 if something goes wrong. There's a lot
    more to error handling than this, but it's a start! */
    try {
        let imageData = await expandingBrainMeme.create(body.captions);
        res.set('Content-Type', 'image/jpeg');
        res.end(imageData);
    } catch (e) {
        res.status = 400;
        res.send(e);
    }
});

app.listen(3000, () => console.log("Demo listening on port 3000"));


