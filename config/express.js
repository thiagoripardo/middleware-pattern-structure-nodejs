var express = require('express');
var consign = require('consign');
var app = express();
var bodyParser = require('body-parser');
//var passport = require('passport');
var morgan = require('morgan');
/*var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');*/

module.exports = function() {

    // Load engine
    app.set('view engine', 'ejs');
    app.set('views','./public/views');

    // Load paths
    app.use('/styles', express.static(process.cwd() + '/public/styles'));
    app.use('/img', express.static(process.cwd() + '/public/img'));
    app.use('/vendor', express.static(process.cwd() + '/public/vendor'));
    app.use('/css', express.static(process.cwd() + '/public/css'));
    app.use('/js', express.static(process.cwd() + '/public/js'));
    app.use('/dist', express.static(process.cwd() + '/public/dist'));
    app.use('/images/colaboradores', express.static(process.cwd() + '/images/colaboradores'));

    // Log every request to the console
    app.use(morgan('dev'));

    // CORS and Parsers configurations
    //app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    // Load and configurations for passport
    /*require('../config/passport')(passport); 
    
    let hash = bcrypt.hashSync((new Date())+Date.now(), 10);
    app.use(session({ secret: hash, cookie: { maxAge: 43200000 }, resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());*/

    consign({cwd: 'app'})
    .include('models')
    .then('infra')
    .then('middlewares')
    .then('routes')
    .into(app);
   
    // General Routes
    //require('../app/routes/test.js')(app);
    //require('../app/routes/errors.js')(app);

    // Meta, users and configurations
    //require('../app/routes/sobre.js')(app);
    //require('../app/routes/downloads.js')(app);

    // Handle 404 error
    /*app.use(function(req, res, next) {
        res.redirect("/error/404");
    });*/

    return app;

}