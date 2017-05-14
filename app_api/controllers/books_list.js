/**
 * Created by aman1 on 06/03/2017.
 */

// Import modules
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var check = require('./check_status');


/**
 * Named function that prepares the response object
 * @param res - response object that holds data about where to send the response
 * @param status - response status code
 * @param content - information to send back
 */
var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/**
 * listBooks - performs database query for the list of books stored
 * @param req - request object
 * @param res - response object
 */

module.exports.listBooks = function (req, res){
    Book.find()
        .select('bookRating addedBy author title')
        .exec(
            function (err, books) {
                var response;
                if (books && books.length > 0) {
                    if (!books) {
                        sendJasonResponse(res, 404, {
                            "message": "books not found"
                        });
                    } else {
                        response = {
                            allBooks: books
                        };
                        sendJasonResponse(res, 200, response);
                    }
                } else {
                    sendJasonResponse(res, 404, {
                        "message": "No books found."
                    });
                }
            }
        );
};


/**
 * create a new book entry with the book author, book title and description
 * to insert it to database.
 * @param req - request object
 * @param res - response object
 */

module.exports.booksCreate = function (req, res) {
    if (check.checkState(req)) {
        if (!req.body.addedBy || !req.body.author || !req.body.title || !req.body.description) {
            sendJasonResponse(res, 404, {
                "message": "Please try again with all the required fields."
            });
        } else {
            Book.create({
                addedBy: req.body.addedBy,
                author: req.body.author,
                title: req.body.title,
                description: req.body.description
            }, function (err, book) {
                if (err) {
                    sendJasonResponse(res, 400, err);
                } else {
                    sendJasonResponse(res, 201, book);
                }
            });
        }
    }else{
        sendJasonResponse(res, 404, {"message" : "Unauthorized."});
    }
};

/**
 * Given a bookid read a book from database and send response of book
 * with its details.
 * details.
 * @param req - request object
 * @param res - response object
 */

module.exports.booksReadOne = function (req, res) {
    if (req.params.bookid){
        var singleBook = req.params.bookid;
        Book.findById(singleBook).exec(function (err, book) {
           if (!book){
               sendJasonResponse(res, 404, {"message" : "bookid not found"});
               return;
           }else if (err){
               sendJasonResponse(res, 404, err);
               return;
           }
            sendJasonResponse(res, 200, book);
        });
    }else{
        sendJasonResponse(res, 404, {"message" : "Please send your request again with bookid."});
    }
};


/**
 * Delete a book given a bookid from the database
 * @param req - request object
 * @param res - response object
 */

module.exports.bookDeleteOne = function (req, res){
    if (check.checkState(req)) {
        if (req.params.bookid) {
            var bookid = req.params.bookid;
            Book.findByIdAndRemove(bookid).exec(function (err, book) {
                if (err) {
                    sendJasonResponse(res, 400, {"message": err});
                    return;
                }
                sendJasonResponse(res, 200, {"message": "Book removal successful"});
            });
        } else {
            sendJasonResponse(res, 400, {"message": "No bookid found"});
        }
    }else{
        sendJasonResponse(res, 404, {"message" : "Unauthorized."});
    }
};



