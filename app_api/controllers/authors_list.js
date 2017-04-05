/**
 * Created by aman1 on 17/03/2017.
 */
var mongoose = require('mongoose');
var Book = mongoose.model('Book');

var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.listByAuthors = function (req, res) {
        Book.distinct("author",function (err, authors) {
           if (err){
               sendJasonResponse(res, 404, err);
           }else{
                sendJasonResponse(res, 200, authors);
           }
        });
};


module.exports.listBooksByAuthor = function (req, res) {
  if (req.params.authorName){
        var authorName = req.params.authorName;
        Book.find({author: authorName}, function (err, books) {
            if (err) {
                sendJasonResponse(res, 404, err);
                return;
            }
            if (!books.length > 0){
                sendJasonResponse(res, 404, {"message" : "Could not find books by author."});
            }else{
                sendJasonResponse(res, 200, books);
            }
        })
    }else{
        sendJasonResponse(res, 404, {"message" : "Author name not found"});
    }
};

