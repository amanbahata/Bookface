/**
 * Created by aman1 on 06/03/2017.
 */
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/Bookface';
mongoose.connect(dbURI);

/*Monitoring monggose connection for successful connection, connection error and when mongoose is disconnected*/
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected.');
})


require('./books_repo');