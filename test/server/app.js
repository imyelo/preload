var express = require('express');
var path = require('path');
var app = express();

var imgsPath = path.join(__dirname, 'imgs/');

app.get('/', function(req, res){
  res.sendfile(path.join(imgsPath, 'github.png'));
});
app.get('/:timeout', function(req, res){
  setTimeout(function () {
    res.sendfile(path.join(imgsPath, 'github.png'));
  }, req.params['timeout']);
});

app.listen(3000);