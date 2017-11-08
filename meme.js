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
        /*
        OLD SKOOL
        let captionMapping = [];
        for (let i = 0; i < this.captionCoordinates.length; i++) {
            captionMapping.push({
                x: this.captionCoordinates[i][0],
                y: this.captionCoordinates[i][1],
                text: captions[i]
            })
        }
        return captionMapping;
        */

        return this.captionCoordinates.map((coords, i) => ({
            x: coords[0],
            y: coords[1],
            text: captions[i]
        }));
    }
}

module.exports = Meme;