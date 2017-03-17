/**
 * Created by aman1 on 06/03/2017.
 */
var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: String,
    createdOn: {type: Date, 'default': Date.now}

});

var bookSchema = new mongoose.Schema({

        name: {type: String, required: true},
        description: {type: String, required: true},
        rating: {type: Number, "default" : 0, min: 0, max: 5},
        reviews: [reviewSchema]
});

var authorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    books: [bookSchema]
});


mongoose.model('Book', authorSchema);