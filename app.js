/**
 * Created by aman1 on 06/03/2017.
 */
var path = require('path');
var express = require('express');
var app = express();


require('./app_server/models/db');

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade' );

app.use(require('./app_server/routes/index'));
app.use(require('./app_api/routes/index'));

var server = app.listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});