/**
 * Created by aman1 on 06/03/2017.
 */

var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var check = require('./check_status');


var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.listBooks = function (req, res) {
    if (req.params && req.params.authorid ) {
        Book.findById(req.params.authorid)
            .select('name books')
            .exec(
                function (err, author){
                    var response, book;
                    if (!author) {
                        sendJasonResponse(res, 404, {
                            "message" : "authorid not found"
                        });
                        return;
                    }else if(err){
                        sendJasonResponse(res, 400, err);
                        return;
                    }
                    if (author.books && author.books.length > 0){
                        book = author.books;
                        if (!book){
                            sendJasonResponse(res, 404, {
                                "message" : "books not found"
                            });
                        }else {
                            response = {
                                author : {
                                    name : author.name,
                                    id: req.params.authorid
                                },
                                book : book
                            };
                            sendJasonResponse(res, 200, response);
                        }
                    }else{
                        sendJasonResponse(res, 404, {
                            "message" : "No books found"
                        });
                    }
                }
            );
    }else {
        sendJasonResponse(res, 404, {
            "message": "Not found, authorid and books are both required"
        });
    }
};

module.exports.booksCreate = function (req, res) {
    if (check.checkStatus(req)) {
        var author = req.params.authorid;
        if (author) {
            Book.findById(author).select('books')
                .exec(
                    function (err, author) {
                        if (err) {
                            sendJasonResponse(res, 400, err);
                        } else {
                            addBook(req, res, author);
                        }
                    }
                );
        } else {
            sendJasonResponse(res, 404, {"message": "The author was not found."});
        }
    }else{
        sendJasonResponse(res, 404, {
            "message" : "Unauthorized access."
        });
    }
};

var addBook = function(req, res, author){
    if (!author){
        sendJasonResponse(res, 404, {"message" : "authorid not found"});
    }else{
        author.books.push({
            name: req.body.name,
            description: req.body.description
        });
        author.save(function(err, author){
            if (err){
                sendJasonResponse(res, 404, err);
            }else{
                sendJasonResponse(res, 201, author);
            }
        });
    }
};

module.exports.booksReadOne = function (req, res){
    if (req.params && req.params.authorid && req.params.bookid ) {
        Book.findById(req.params.authorid)
            .select('name books')
            .exec(
                function (err, author){
                    var response, book;
                    if (!author) {
                        sendJasonResponse(res, 404, {
                            "message" : "authorid not found"
                        });
                        return;
                    }else if(err){
                        sendJasonResponse(res, 400, err);
                        return;
                    }
                    if (author.books && author.books.length > 0){
                        book = author.books.id(req.params.bookid);
                        if (!book){
                            sendJasonResponse(res, 404, {
                                "message" : "bookid not found"
                            });
                        }else {
                            response = {
                                author : {
                                    name : author.name,
                                    id: req.params.authorid
                                },
                                book : book
                            };
                            sendJasonResponse(res, 200, response);
                        }
                    }else{
                        sendJasonResponse(res, 404, {
                            "message" : "No books found"
                        });
                    }
                }
            );
    }else{
        sendJasonResponse(res, 404, {
            "message" : "Not found, authorid and books are both required"
        });
    }
};

module.exports.bookDeleteOne = function (req, res){
    if(!req.params.authorid || !req.params.bookid){
            sendJasonResponse(res, 404, {
            "message" : "Not found, authorid and bookid both needed"
            });
        return;
    }
    Book.findById(req.params.authorid)
        .select('name books')
        .exec(
            function(err, author){
                if(!author){
                    sendJasonResponse(res, 404, {
                        "message" : "authorid not found"
                    });
                    return;
                }else if (err){
                    sendJasonResponse(res, 400, err);
                    return;
                }
                if (author.books && author.books.length > 0){
                    if(!author.books.id(req.params.bookid)){
                        sendJasonResponse(res, 404, {
                            "message" : "bookid not found"
                        });
                    }else{
                        author.books.id(req.params.bookid).remove();
                        author.save(function(err){
                           if (err){
                               sendJasonResponse(res, 404, err);
                           }else{
                               sendJasonResponse(res, 204, null);
                           }
                        });
                    }

                }else{
                    sendJasonResponse(res, 404, {
                        "message" : "No book to delete"
                    });
                }
            }
        );

};


