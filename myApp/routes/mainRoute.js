/**
 * Created by avishnikin on 10/11/2016.
 */
//var express = require('express');
//var router = express.Router();

/* GET home page. */
function hello(req, res) {
    res.send('Hello world');
}

module.exports = function (app) {
    app.get('/', hello);
};
/*
 router.get('/about', function(req, res) {
 res.send('elaela');
 });

 router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
 });
 */

//module.exports = router;