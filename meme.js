const fs = require('fs');
const Jimp = require('jimp');
const path = require('path');

class Meme {

    constructor(baseImageName, captionCoordinates, captionMaxWidth) {
        this.templateImageName = baseImageName;
        this.templateImagePath = path.join(__dirname, 'meme_templates', this.templateImageName)
        this.captionCoordinates = captionCoordinates;
        this.captionMaxWidth = captionMaxWidth;
    }
}

module.exports = Meme;