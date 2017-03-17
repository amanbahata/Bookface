/**
 * Created by aman1 on 06/03/2017.
 */

var mongoose = require('mongoose');
var Book = mongoose.model('Book');

var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
    var bookId = req.params.bookid;
    if(bookId){
        Book.findById(bookId).select('reviews')
            .exec(
              function(err, book){
                  if (err){
                      sendJasonResponse(res, 400, err);
                  }else{
                      addReview(req, res, book);
                  }
              }
            );
    }else{
        sendJasonResponse(res, 404, {"message" : "The book was not found."});
    }
};


module.exports.reviewsReadOne = function (req, res){
    if (req.params && req.params.bookid && req.params.reviewid) {
        Book.findById(req.params.bookid)
            .select('name reviews')
            .exec(
                function (err, book){
                    var response, review;
                    if (!book) {
                        sendJasonResponse(res, 404, {
                            "message" : "bookid not found"
                        });
                        return;
                    }else if(err){
                        sendJasonResponse(res, 400, err);
                        return;
                    }
                    if (book.reviews && book.reviews.length > 0){
                        review = book.reviews.id(req.params.reviewid);
                        if (!review){
                            sendJasonResponse(res, 404, {
                                "message" : "reviewid not found"
                            });
                        }else {
                            response = {
                                book : {
                                    name : book.name,
                                    id: req.params.bookid
                                },
                                review : review
                            };
                            sendJasonResponse(res, 200, response);
                        }
                    }else{
                        sendJasonResponse(res, 404, {
                           "message" : "No reviews found"
                        });
                    }
                }
            );
    }else{
        sendJasonResponse(res, 404, {
            "message" : "Not found, bookid and reviews are both required"
        });
    }
};

module.exports.reviewsUpdateOne = function (req, res) {
    sendJasonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne = function (req, res) {
    sendJasonResponse(res, 200, {"status" : "success"});
};


var addReview = function(req, res, book){
  if (!book){
      sendJasonResponse(res, 404, {"message" : "bookid not found"});
  }else{
      book.reviews.push({
          author: req.body.author,
          rating: req.book.rating,
          reviewText: req.book.reviewText
      });
      book.save(function(err, book){
          var thisReiew;
          if (err){
              sendJasonResponse(res, 404, err);
          }else{
              updateAvarageRating(book._id);
              thisReview = book.reviews[book.reviews.length - 1];
              sendJasonResponse(res, 201, thisReview);
          }
      });
  }
};

var updateAvarageRating = function(bookId){
    Book
        .findById(bookId)
        .select('rating reviews')
        .exec(
            function(err, book){
                if (!err){
                    setAvarageRating(book);
                }
            });
};

var setAvarageRating = funvtion(book){
    var averageRating;
    var i;
    var totalValueOfRatings = 0;
    if(book.reviews && book.reviews.length > 0){
        var countNumberOfReviews = book.reviews.length;
        for( i = 0; i < countNumberOfReviews; i ++){
            totalValueOfRatings = totalValueOfRatings + book.reviews[i].rating;
        }
        averageRating = parseInt(totalValueOfRatings/countNumberOfReviews, 10);
        book.rating = averageRating;
        book.save(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Updated average rating is ", averageRating);
            }
        });
    }
};

