/**
 * Created by aman1 on 06/03/2017.
 */
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.send('<h1>Hello</h1>');
});

app.get('/', function(req, res){
    res.send('<h1>Hello</h1>');
});


var server = app.listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});