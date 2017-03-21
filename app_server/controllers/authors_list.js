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
        books: authorDetail.books,
        message : message
    });
};




var reviewsRenderer = function(req, res, authorDetail){
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
        books: authorDetail.books,
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