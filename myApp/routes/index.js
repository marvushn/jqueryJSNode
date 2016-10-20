var express = require('express');
var router = express.Router();
var foo = require('/nodeJS/jqueryJSNode/myApp/mocks/navigation.json');
var fs = require('fs');

///nodeJS/jqueryJSNode/myApp

//navigationTemplate

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/lava', function(req, res, next) {
  //var Obj = JSON.parse(foo);
  res.send(foo);
  /*readJSONFile("/nodeJS/jqueryJSNode/myApp/mocks/navigation.json", function (err, json) {
    if (err) {
      throw err;
    }
    res.send(json.title);
  });*/
});

module.exports = router;
