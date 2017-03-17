/**
 * Created by aman1 on 17/03/2017.
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

module.exports.authorCreate = function (req, res) {
    Book.create({
        name: req.body.name,
    }, function(err, author){
        if(err){
            sendJasonResponse(res, 400, err);
        }else{
            sendJasonResponse(res, 201, author);
        }
    });
};

module.exports.authorReadOne = function (req, res) {
    if (req.params && req.params.authorid){
        Book.findById(req.params.authorid)
            .exec(function(err, author){
                if(!author){
                    sendJasonResponse(res, 404, {
                        "message" : "authorid not found"
                    });
                    return;
                }else if (err){
                    sendJasonResponse(res, 404, err);
                    return;
                }
                sendJasonResponse(res, 200, author);
            });
    } else {
        sendJasonResponse(res, 404, {
            "message" : "No authorid in request"
        });
    }
};

module.exports.authorUpdateOne = function (req, res) {
    sendJasonResponse(res, 200, {"status" : "success"});

};


module.exports.authorDeleteOne = function (req, res) {
    sendJasonResponse(res, 200, {"status" : "success"});

};
