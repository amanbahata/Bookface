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
    sendJasonResponse(res, 200, {"status" : "success"});
};

