/**
 * Created by aman1 on 17/03/2017.
 */
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var check = require('./check_status');

var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.listByAuthor = function (req, res) {
        Book.find()
            .select('name')
            .exec(
                function (err, authors) {
                    var response, author;
                    if (authors && authors.length > 0) {
                        author = authors;
                        if (!author) {
                            sendJasonResponse(res, 404, {
                                "message": "authors not found"
                            });
                        } else {
                            response = {
                                author: author
                            };
                            sendJasonResponse(res, 200, response);
                        }
                    } else {
                        sendJasonResponse(res, 404, {
                            "message": "No authors found"
                        });
                    }
                }
            );
};

module.exports.authorCreate = function (req, res) {
<<<<<<< HEAD
      Book.create({
          writer: "Mara"
      }, function (err, writer) {
          if (err) {
              sendJasonResponse(res, 400, err);
          }else{
              sendJasonResponse(res, 201, writer);
          }
      });
=======

    console.log(req.query.name);

  //  if (req.query.user) {

        if (req.query.name) {
            Book.create({
                name: req.query.name
            }, function (err, author) {
                if (err) {
                    sendJasonResponse(res, 400, err);
                } else {
                    sendJasonResponse(res, 201, author);
                }
            });
        }else{
            sendJasonResponse(res, 404, {
                "message" : "Author name is required"
            })
        }
   //  }else {
   //      sendJasonResponse(res, 404, {
   //          "message" : "Unauthorized access."
   //      });
   // // }
>>>>>>> authorAdder
};


module.exports.authorReadOne = function (req, res) {
    if (req.params && req.params.authorid){
        Book
            .findById(req.params.authorid)
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


module.exports.authorDeleteOne = function (req, res) {
    var authorid = req.params.authorid;
    if(authorid){
        Book.findByIdAndRemove(authorid)
            .exec(function(err, author){
                  if(err){
                      sendJasonResponse(res, 404, err);
                      return;
                  }
                  sendJasonResponse(res, 204, null);
              }
            );
    }else{
        sendJasonResponse(res, 404, {
            "message" : "No authorid"
        });
    }
};


