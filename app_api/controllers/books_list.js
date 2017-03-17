/**
 * Created by aman1 on 06/03/2017.
 */

var mongoose = require('mongoose');
var Book = mongoose.model('Book');

var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.listBooks = function (req, res) {
    sendJasonResponse(res, 200, {"status" : "success"});

};

// module.exports.booksCreate = function (req, res) {
//     Book.create({
//         name: req.query.name,
//         description: req.query.description
//     }, function(err, book){
//         if(err){
//             sendJasonResponse(res, 400, err);
//         }else{
//             sendJasonResponse(res, 201, book);
//         }
//     });
// };

module.exports.booksCreate = function (req, res) {
    var author = req.params.authorid;
    if(author){
        Book.findById(author).select('books')
            .exec(
                function(err, author){
                    if (err){
                        sendJasonResponse(res, 400, err);
                    }else{
                        addBook(req, res, author);
                    }
                }
            );
    }else{
        sendJasonResponse(res, 404, {"message" : "The author was not found."});
    }
};

var addBook = function(req, res, author){
    if (!author){
        sendJasonResponse(res, 404, {"message" : "authorid not found"});
    }else{
        author.books.push({
            name: req.query.name,
            description: req.query.description
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

