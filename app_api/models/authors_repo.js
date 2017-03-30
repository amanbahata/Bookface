/**
 * Created by aman1 on 30/03/2017.
 */
var mongoose = require('mongoose');


var bookTitleSchema = new mongoose.Schema({
    bookTitle: {type:String, required:true}
});

var authorSchema = new mongoose.Schema({
    authorName: {type: String, require: true},
    books: [bookTitleSchema]
});


mongoose.model('Author', authorSchema);
