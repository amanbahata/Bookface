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
        author : data.author.id,
        book: data.book._id,
        rating: data.book.rating,
        description: data.book.description,
        reviews: data.book.reviews,
        message : message
    });
};

/*Get add review page*/


module.exports.addReview = function (req, res) {
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
            renderReviewForm(req, res, data);
        }
    );
};

var renderReviewForm = function (req, res, data) {
    res.render('book_review_form', {
        title: 'Review ' + data.book.name,
        pageHeader: {title: 'Review ' + data.book.name},
        data: data
    });

};

module.exports.doAddReview = function(req, res){
    var requestOptions, path, authorid, bookid, postData;
    authorid = req.params.authorid;
    bookid = req.params.bookid;
    path = '/api/authors/' + authorid + '/books/' + bookid + '/reviews';
    postData = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json: postData
    };
    request (requestOptions,
        function(err, response, body){
            if (response.statusCode === 201){
                res.redirect('/authors/' + authorid + '/books/' + bookid + '/reviews');
            }else{
               // _showError(req, res, response.statusCode);
            }
        }
    );
};





//
// module.exports.addAuthor = function (req, res) {
//     // var requestOptions, path;
//     // path = '/api/authors';
//     // requestOptions = {
//     //     url : apiOptions.server + path,
//     //     method : "GET",
//     //     json: {}
//     // };
//     request (requestOptions,
//         function(err, response, body){
//             var data = body;
//             renderAuthorForm(req, res);
//         }
//     );
// };

module.exports.addAuthor = function (req, res) {
    res.render('author_add_form', {
        title: 'New Author',
        pageHeader: {title: 'Add a new author to the list'}
    });

};