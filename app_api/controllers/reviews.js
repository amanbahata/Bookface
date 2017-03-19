/**
 * Created by aman1 on 06/03/2017.
 */

var mongoose = require('mongoose');
var Book = mongoose.model('Book');

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

// module.exports.reviewsCreate = function (req, res) {
//     var authorid = req.params.authorid;
//     var bookid = req.params.bookid;
//     if(authorid){
//         var author = Book.findById(authorid);
//         for (var i =0; i < author.books.length ; i++){
//             if(author.book[i]._id == bookid ){
//                 author.book[i]._id.select('reviews')
//                     .exec(
//                         function(err, book){
//                             if (err){
//                                 sendJasonResponse(res, 400, err);
//                             }else{
//                                 addReview(req, res, book);
//                             }
//                         }
//                     );
//             }
//         }
//
//
//     }else{
//         sendJasonResponse(res, 404, {"message" : "The author was not found."});
//     }
// };

module.exports.reviewsCreate = function (req, res) {
    var authorId = req.params.authorid;
    var bookId = req.params.bookid;
    console.log(authorId);
    console.log(bookId);
    console.log(Book.findById(authorId));
}


module.exports.reviewsReadOne = function (req, res){
    if (req.params && req.params.authorid && req.params.bookid && req.params.reviewid) {
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


module.exports.reviewsDeleteOne = function (req, res) {
    if (!req.params.authorid || !req.params.bookid || !req.reviewid){
        sendJasonResponse(res, 404, {
            "message" : "Not found, authorid, bookid and reviewid are all required"
        });
        return;
    }
    Book
        .findById(req.params.authorid)
        .select('books reviews')
        .exec(
            function(err, author){
                if(!author){
                    sendJasonResponse(res, 404, {
                        "message" : "authorid not found"
                    });
                    return;
                }else if(err){
                    sendJasonResponse(res, 404,err);
                    return;
                }
                if (author.books.reviews && author.books.reviews.lenght > 0){
                    if (!author.books.reviews.id(req.params.reviewid)){
                        sendJasonResponse(res, 404, {
                            "message" : "reviewid not found"
                        });
                    }else{
                        author.books.reviews.id(req.params.reviewid).remove();
                        author.books.save(function(err){
                            if(err){
                                sendJasonResponse(res, 404, err);
                            }else{
                                updateAverageRating(author.book._id);
                                sendJasonResponse(res, 204, null);
                            }
                        });
                    }
                }else{
                    sendJasonResponse(res, 404, {
                        "message" : "No review to delete"
                    });
                }
            }
        );
};


var addReview = function(req, res, book){
  if (!book){
      sendJasonResponse(res, 404, {"message" : "bookid not found"});
  }else{
      book.reviews.push({
          author: req.query.author,
          rating: req.query.rating,
          reviewText: req.query.reviewText
      });
      book.save(function(err, book){
          if (err){
              sendJasonResponse(res, 404, err);
          }else{
              updateAverageRating(book._id);
            var  thisReview = book.reviews[books.reviews.length - 1];
              sendJasonResponse(res, 201, thisReview);
          }
      });
  }
};

var updateAverageRating = function(bookid){
    Book
        .findById(bookid)
        .select('rating')
        .exec(
            function(err, bookid){
                if (!err){
                    setAverageRating(bookid);
                }
            });
};

var setAverageRating = function(book){
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

