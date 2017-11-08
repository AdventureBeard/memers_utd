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
            let imageData = await this._getBuffer(image);
            return imageData;
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
        captionMap.forEach((e) => {
            image.print(font, e.x, e.y, e.text, this.captionMaxWidth);
        });
        return image;
    }

    _getBuffer(image) {
        return new Promise((resolve, reject) => {
            image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
                if (err) reject();
                resolve(buffer);
            })
        });
    }
}

module.exports = Meme;