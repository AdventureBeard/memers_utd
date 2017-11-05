const fs = require('fs');
const Jimp = require('jimp');
const path = require('path');

class ExpandingBrainMeme {

    constructor(baseImageName, captionCoordinates, captionMaxWidth) {
        this.baseImageName = 'expand.jpg'
        this.baseImagePath = path.join(__dirname, this.baseImageName)
        this.captionCoordinates = [
            [30, 100],
            [30, 400],
            [30, 700],
            [30, 1000]
        ]
        this.textMaxWidth = 370
    }

    async create(captions) {
        if (captions.length != this.captionCoordinates.length) {
            return null;
        } else {
            let captionMap = this._createCaptionMapping(captions);
            let image = await this._writeCaptionsToImage(captionMap);
            let imageData = await this._getBuffer(image)
            return imageData;
        }
    }

    _createCaptionMapping(captions) {
        let captionMap = [];
        this.captionCoordinates.forEach((coords, i) => {
            let captionMapping = {}
            captionMapping.x = coords[0];
            captionMapping.y = coords[1];
            captionMapping.text = captions[i];
            captionMap.push(captionMapping)
        }) 
        return captionMap
    }

    async _writeCaptionsToImage(captionMap) {
        let image = await Jimp.read(this.baseImagePath);
        let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
        captionMap.forEach((e) => {
            image.print(font, e.x, e.y, e.text, this.textMaxWidth)
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

module.exports = ExpandingBrainMeme;