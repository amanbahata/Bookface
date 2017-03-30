/**
 * Created by aman1 on 06/03/2017.
 */
require('dotenv').load();       // enables the set up environment variables
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');           // require passport before model definition



require('./app_api/models/db');
require('./app_api/config/passport');        // require strategy

app.set('port', process.env.PORT || 3000);


app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade' );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');



app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/', routes);
app.use(passport.initialize());

app.use('/api', routesApi);


var server = app.listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});