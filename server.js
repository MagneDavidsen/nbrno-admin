var fs = require('fs');
var controller = require('./controller');

var express = require('express');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;

app.configure(function(){
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/admin/createRapper' enctype='multipart/form-data'>" +
"<input type='text' name='rapperName'/>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";


app.get('/rappers', controller.getRappers);
app.get('/scorelist', controller.getScoreList);


app.get('/admin/createRapper', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html' });
	res.end(form);
});

/// Post files
app.post('/admin/createRapper', function(req, res) {
  console.log(req)

  var imageData = fs.readFileSync(req.files.image.path)
  var imageName = req.files.image.name
  var imageType = req.files.image.type
  var rapperName = req.body.rapperName

  controller.createRapper(rapperName, imageName, imageData, imageType)

  res.redirect('/admin/createRapper');
});

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
