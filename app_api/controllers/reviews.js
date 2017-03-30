/**
 * Created by aman1 on 06/03/2017.
 */

var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var User = mongoose.model('User');
var check = require('./check_status');


var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.listReviews = function (req, res) {
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

                                book : {
                                    name : book.name,
                                    description : book.description,
                                    reviews: book.reviews
                                }
                            };
                            sendJasonResponse(res, 200, response);
                        }
                    }else{
                        sendJasonResponse(res, 404, {
                            "message" : "No book found"
                        });
                    }
                }
            );
    }else{
        sendJasonResponse(res, 404, {
            "message" : "Not found, authorid and book are both required"
        });
    }
};

module.exports.reviewsCreate = function (req, res) {
    if (check.checkStatus(req)) {
        var userName = check.getReviewerScreenName(req);
        var authorid = req.params.authorid;
        var bookid = req.params.bookid;
        if (authorid) {
            Book.findById(authorid)
                .select('books')
                .exec(
                    function (err, bookid) {
                        if (err) {
                            sendJasonResponse(res, 400, err);
                        } else {
                            addReview(req, res, bookid, userName);
                        }
                    }
                );
        } else {
            sendJasonResponse(res, 404, {"message": "The author was not found."});
        }
    }else{
        sendJasonResponse(res, 404, {"message": "Unauthorised access"});
    }
};


var addReview = function(req, res, author, userName){
  if (!author){
      sendJasonResponse(res, 404, {"message" : "bookid not found"});
  }else{
      var singleBook = author.books.id(req.params.bookid);
      singleBook.reviews.push({
          author: userName,
          rating: req.body.rating,
          reviewText: req.body.reviewText


      });

     author.save(function(err, book){
          if (err){
              sendJasonResponse(res, 404, err);
          }else{
              var bookid = req.params.bookid;
              //updateAverageRating(bookid);
              var  thisReview = author.books.id(req.params.bookid).reviews[author.books.id(req.params.bookid).reviews.length - 1];
              sendJasonResponse(res, 201, thisReview);
          }
      });
  }
};

var updateAverageRating = function(singleBook){
    Book
        .findById(singleBook)
        .select('rating')
        .exec(
            function(err, singleBook){
                if (!err){
                    setAverageRating(singleBook);
                }
            });
   // setAverageRating(singleBook);
};
//
// var setAverageRating = function(singleBook){
//     var averageRating;
//     var i;
//     var totalValueOfRatings = 0;
//
//
//     if(singleBook.reviews && singleBook.reviews.length > 0){
//         var countNumberOfReviews = singleBook.reviews.length;
//         for( i = 0; i < countNumberOfReviews; i ++){
//             totalValueOfRatings = totalValueOfRatings + singleBook.reviews[i].rating;
//         }
//         averageRating = parseInt(totalValueOfRatings/countNumberOfReviews, 10);
//         book.rating = averageRating;
//         singleBook.save(function(err){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("Updated average rating is ", averageRating);
//             }
//         });
//     }
// };

