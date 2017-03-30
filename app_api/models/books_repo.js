/**
 * Created by aman1 on 06/03/2017.
 */
var mongoose = require('mongoose');

// var reviewSchema = new mongoose.Schema({
//     author: {type: String,required: true},
//     rating: {type: Number, required: true, min: 0, max: 5},
//     reviewText: {type: String, required: true},
//     createdOn: {type: Date, 'default': Date.now}
//
// });
//
// var bookSchema = new mongoose.Schema({
//
//         name: {type: String, unique: true, required: true},
//         description: {type: String, required: true},
//         rating: {type: Number, 'default' : 0, min: 0, max: 5},
//         reviews: [reviewSchema]
// });
//
// var authorSchema = new mongoose.Schema({
//     name: {type: String, unique: true,required: true},
//     books: [bookSchema]
// });


var reviewSchema = new mongoose.Schema({
    rating: {type: Number, required: true, min: 0, max: 5},
    screenName: {type:String, required:true},
    reviewText: {type: String, required: true},
    createdOn: {type: Date, 'default': Date.now}

});

var bookSchema = new mongoose.Schema({
    bookRating: {type: Number, 'default': 0, min: 0, max: 5},
    addedBy: {type: String, required: true},
    author: {type: String, require: true},
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true },
    reviews: [reviewSchema]
});


mongoose.model('Book', bookSchema);



// mongoose.model('Book', authorSchema);