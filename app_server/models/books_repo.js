/**
 * Created by aman1 on 06/03/2017.
 */
var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
    
        name: String,
        author: String,
        rating: Number


});