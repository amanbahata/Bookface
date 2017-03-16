/**
 * Created by aman1 on 06/03/2017.
 */

var mongoose = require('mongoose');
var Book = mongoose.model('Book');

var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.listByAuthor = function (req, res) {
    sendJasonResponse(res, 200, {"status" : "success"});

};

module.exports.booksCreate = function (req, res) {
    Book.create({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description
    }, function(err, book){
        if(err){
            sendJasonResponse(res, 400, err);
        }else{
            sendJasonResponse(res, 201, book);
        }
    });
};

module.exports.booksReadOne = function (req, res) {
    if (req.params && req.params.bookid){
        Book.findById(req.params.bookid)
            .exec(function(err, book){
                if(!book){
                    sendJasonResponse(res, 404, {
                        "message" : "bookid not found"
                    });
                    return;
                }else if (err){
                    sendJasonResponse(res, 404, err);
                    return;
                }
                sendJasonResponse(res, 200, book);
            });
    } else {
        sendJasonResponse(res, 404, {
            "message" : "No bookid in request"
        });
    }
};
