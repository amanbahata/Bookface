/**
 * Created by aman1 on 22/03/2017.
 */

var request = require('request');

/*
 Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};


module.exports.addBook = function (req, res) {
    var requestOptions, path;
    path = '/api/authors/' + req.params.authorid + '/books';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json: {}
    };
    request (requestOptions,
        function(err, response, body){
            var data = body;
            renderBookAddForm(req, res, data);
        }
    );
};

var renderBookAddForm = function (req, res, data) {
    res.render('book_add_form', {
        title: 'Add book by ',
        pageHeader: {title: 'Add book by ' },
        data: data
    });

};

module.exports.doAddBook = function(req, res){
    var requestOptions, path, authorid, postData;
    authorid = req.params.authorid;
    path = '/api/authors/' + authorid + '/books';
    postData = {
        name: req.body.name,
        description: req.body.description
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json: postData
    };
    request (requestOptions,
        function(err, response, body){
            if (response.statusCode === 201){
                res.redirect('/authors/' + authorid);
            }else{
                console.log("Something went wrong");
                res.redirect('/authors/' + authorid);
            }
        }
    );
};



// module.exports.doDeleteBook = function(req, res){
//     var requestOptions, path, authorid, bookid;
//     authorid = req.params.authorid;
//     bookid = req.params.bookid;
//     path = '/api/authors/' + authorid + '/books/' + bookid;
//     requestOptions = {
//         url : apiOptions.server + path,
//         method : "DELETE",
//         json: {}
//     };
//     request (requestOptions,
//         function(err, response){
//             if (response.statusCode === 200){
//                 res.redirect('/authors/' + authorid);
//             }else{
//                 console.log("Something went wrong");
//                 res.redirect('/authors/' + authorid);
//             }
//         }
//     );
// };


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
    }else {
        if (!authorDetail.books.length) {
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
        message: message
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
                console.log("Something went wrong");
                res.redirect('/authors/' + authorid + '/books/' + bookid + '/reviews');
            }
        }
    );
};