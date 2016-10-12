/**
 * Created by avishnikin on 10/11/2016.
 */
function hello(req, res) {
    res.send('WEEEE');
}

module.exports = function (app) {
    app.get('/searching', hello);
};