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

    async create(captions) {
        if (captions.length != this.captionCoordinates.length) {
            throw "Wrong number of captions";
        } else {
            let captionMap = this._createCaptionMapping(captions);
            let image = await this._writeCaptionsToImage(captionMap);
            return image;
        }
    }

    _createCaptionMapping(captions) {
        return this.captionCoordinates.map((coords, i) => ({
            x: coords[0],
            y: coords[1],
            text: captions[i]
        }));
    }

    async _writeCaptionsToImage(captionMap) {
        let image = await Jimp.read(this.templateImagePath);
        let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        captionMap.forEach((c) => {
            image.print(font, e.x, e.y, e.text, this.captionMaxWidth);
        });
        return image;
    }
}

module.exports = Meme;