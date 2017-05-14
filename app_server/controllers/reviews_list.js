/**
 * Created by aman1 on 03/04/2017.
 */

var request = require('request');
var whoIsUser = require('./display_user');


/**
 *Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};

/**
 * Renders the book_review_form page on the screen
 * @param req
 * @param res
 */
module.exports.addReview = function (req, res) {
    res.render('book_review_form', {
        title: 'Review book',
        pageHeader: {title: 'Add book'}
    });
};

/**
 * Sends a POST request that holds the book review of a user
 * @param req
 * @param res
 */

module.exports.doAddReview = function(req, res){
    var requestOptions, path, bookid, postData;
    bookid = req.params.bookid;
    var screenName = whoIsUser.screenNameDecoder(req);
    path = '/api/books/' + bookid + '/reviews/new';
    postData = {
        rating: req.body.rating,
        screenName: screenName,
        reviewText: req.body.reviewText
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json: postData,
        headers: {
            "token" : req.session.token
        }
    };
    request (requestOptions,
        function(err, response, body){
            if (response.statusCode === 200){
                res.redirect('/books/' + bookid);
            }else{
                console.log("Something went wrong");
                res.redirect('/');
            }
        }
    );
};


/**
 * Sends a DELETe request of a single review that a user has made
 * @param req
 * @param res
 */
module.exports.doDeleteReview = function (req, res) {
    var requestOptions, path, bookid, reviewid;
    bookid = req.params.bookid;
    reviewid = req.params.reviewid;
    path = '/api/books/' + bookid + '/reviews/' + reviewid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "DELETE",
        json: {},
        headers: {
            "token" : req.session.token
        }
    };
    request (requestOptions,
        function(err, response, body){
            if (response.statusCode === 204){
                res.redirect('/books/' + bookid);
            }else{
                console.log("Something went wrong");
                res.redirect('/');
            }
        }
    );
};