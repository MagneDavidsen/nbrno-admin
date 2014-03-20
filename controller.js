var db = require('./db');
var models = require('./models');

function createRapper(rapperName, imageName, imageData, imageType) {
	var rapper = new models.Rapper
	rapper.name = rapperName
	rapper.picture.fileName = imageName
	rapper.picture.data = imageData.toString('base64')
	rapper.picture.contentType = imageType
	rapper.save(function (err, rapper) {
		if (err) return console.error(err);
	});
}

module.exports = {
	createRapper: createRapper
};
