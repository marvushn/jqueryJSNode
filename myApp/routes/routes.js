/**
 * Created by avishnikin on 10/10/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;