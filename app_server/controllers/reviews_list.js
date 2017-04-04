/**
 * Created by aman1 on 03/04/2017.
 */

var request = require('request');
var whoIsUser = require('./display_user');


/*
 Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};


module.exports.addReview = function (req, res) {
    res.render('book_review_form', {
        title: 'Review book',
        pageHeader: {title: 'Add book'}
    });
};

module.exports.doAddReview = function(req, res){
    var requestOptions, path, bookid, postData;
    bookid = req.params.bookid;
    path = '/api/books/' + bookid + '/reviews/new';
    postData = {
        rating: req.body.rating,
        screenName: 'Jonny',
        reviewText: req.body.reviewText
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json: postData
        // headers: {
        //     "token" : req.session.token
        // }
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

module.exports.doDeleteReview = function (req, res) {
    var requestOptions, path, bookid, reviewid;
    bookid = req.params.bookid;
    reviewid = req.params.reviewid;
    path = '/api/books/' + bookid + '/reviews/' + reviewid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "DELETE",
        json: {}
        // headers: {
        //     "token" : req.session.token
        // }
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