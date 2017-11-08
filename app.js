const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.route('/memes/expandingbrain').get((req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => console.log("Demo listening on port 3000"));


