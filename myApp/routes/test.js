/**
 * Created by avishnikin on 10/11/2016.
 */
var express = require('express');
var router = express.Router();


router.get('/test', function(req, res) {
    res.send('elaela');
});

module.exports = router;

