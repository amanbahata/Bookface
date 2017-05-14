/**
 * Created by aman1 on 17/03/2017.
 */

// Import modules
var mongoose = require('mongoose');
var Book = mongoose.model('Book');


/**
 * Named function that prepares the response object
 * @param res - response object that holds data aboit where to send the response
 * @param status - response status code
 * @param content - information to send back
 */
var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/**
 *listByAuthors - controller that preforms database query for the list of authors
 * held in the database. It returns the authors present in the database with a response.
 * It sends a status code 200 in case of success, code 404 with the error description otherwise
 *
 * @param req - request object
 * @param res - response object
 */

module.exports.listByAuthors = function (req, res) {
        Book.distinct("author",function (err, authors) {  //preform database query
           if (err){
               sendJasonResponse(res, 404, err);
           }else{
                sendJasonResponse(res, 200, authors);
           }
        });
};


/**
 * listBooksByAuthor - controller that preforms database query for the list of books
 * written by an author. It returns an error object with a 404 status code if query fails,
 * returns an information message if author doesn't have books, the list of books in case of success.
 *
 * @param req - request object
 * @param res - response object
 */
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

