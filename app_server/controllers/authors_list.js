/**
 * Created by aman1 on 06/03/2017.
 */
var request = require('request');

/*
    Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};

/*
    Setting up the main rendering function
 */

var homepageRenderer = function(req, res, responseBody){
    var message;
    if (!(responseBody.author instanceof Array)){
        message = "API lookup error";
        responseBody = [];
    }else{
        if (!responseBody.author.length){
            message = "No authors found";
        }
    }
    res.render('authors_list', {
            title: 'Bookface',
            pageHeader: {
                title: 'List of Authors'
            },
            authors: responseBody.author,
            message : message
        });
};



/*
    Get the authors list
 */
module.exports.homeList = function (req, res) {
    var requestOptions, path;
    path = '/api/authors';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json: {}
    };
    request (requestOptions,
        function(err, response, body){
            homepageRenderer(req, res, body);
        }
    );
};



/*
    Get books list of a single author
 */

 module.exports.booksList = function (req, res) {
     var requestOptions, path;
     path = '/api/authors/' + req.params.authorid;
     requestOptions = {
         url : apiOptions.server + path,
         method : "GET",
         json: {}
     };
     request (requestOptions,
         function(err, response, body){
            var data = body;
             bookListRenderer(req, res, data);
         }
     );
 };


/*
 Rendering the single author page
 */

var bookListRenderer = function(req, res, authorDetail){
    var message;
    if (!(authorDetail.books instanceof Array)){
        message = "API lookup error";
        authorDetail = [];
    }else{
        if (!authorDetail.books.length){
            message = "No books found for " + authorDetail.name;
        }
    }
    res.render('books_list', {
        title: authorDetail.name,
        pageHeader: {
            title: authorDetail.name
        },
        author: authorDetail,
        books: authorDetail.books,
        message : message
    });
};



module.exports.reviewsList = function (req, res) {
    var requestOptions, path;
    path = '/api/authors/' + req.params.authorid + '/books/' + req.params.bookid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json: {}
    };
    request (requestOptions,
        function(err, response, body){
            var data = body;
            reviewsRenderer(req, res, data);
        }
    );
};




var reviewsRenderer = function(req, res, data){
    var message;
    if (!(data.book.reviews instanceof Array)){
        message = "API lookup error";
        data = [];
    }else{
        if (!data.book.reviews.length){
            message = "No reviews found for " + data.name;
        }
    }
    res.render('book_info', {
        title: data.book.name,
        pageHeader: {
            title: data.book.name
        },
        rating: data.book.rating,
        description: data.book.description,
        reviews: data.book.reviews,
        message : message
    });
};

/*Get add review page*/


module.exports.addReview = function (req, res) {
    res.render('book_review_form', {
        title: 'Review The escape',
        pageHeader: {title: 'Review The escape'}
    });
};