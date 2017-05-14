/**
 * Created by aman1 on 17/03/2017.
 */

// Import modules
var mongoose = require('mongoose');
var Book = mongoose.model('Book');


/**
 * Named function that prepares the response object
 * @param res - response object that holds data aboit where to send the response
 * @param status - response status
 * @param data - information to send back
 */
var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/**
 *
 * @param req
 * @param res
 */

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

