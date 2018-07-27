module.exports = function(app) {

    // Home
    app.get('/', function(req, res){
        res.redirect('/home');
    });

    app.get('/home', function(req, res){
        res.render('pages/home');
    });
}