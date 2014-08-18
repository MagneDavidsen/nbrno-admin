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

function getRappers(req, res) {
	models.Rapper.find().select('name -_id').exec(function(err, rappers) {
		if (err) return console.error(err);
		res.send(200, rappers);
	});
}

function setScoreAndSort(rappers) {
    var rappersResponse = rappers.map(function (rapper) {
        var winPercentage = rapper.totalWins / (rapper.totalWins + rapper.totalLosses);
        return {name: rapper.name, score: rapper.totalWins - rapper.totalLosses, winPercentage: winPercentage}
    });

    rappersResponse.sort(function (a, b) {
        return a.winPercentage - b.winPercentage
    }).reverse();

    return rappersResponse;
}

function getScoreList(req, res) {
    models.Rapper.find().select('name totalWins totalLosses').exec(function (err, rappers) {
        if (err) return console.error(err);
        rappersResponse = setScoreAndSort(rappers);

        res.send(200, rappersResponse);
    });
}

module.exports = {
	createRapper: createRapper,
	getRappers: getRappers,
    getScoreList: getScoreList
};
