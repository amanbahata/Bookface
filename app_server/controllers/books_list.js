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


module.exports.addAuthor = function (req, res) {
    res.render('author_add_form', {
        title: 'New Author',
        pageHeader: {title: 'add new author to the list'}
    });
};

module.exports.doAddAuthor = function(req, res){
    var requestOptions, path, postData;
    path = '/api/authors';

    console.log(req.body);

    postData = {
        name: req.body.name,
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json: postData
    };
    request (requestOptions,
        function(err, response, body){
            if (response.statusCode === 201){
                res.redirect('/');
            }else{
                console.log("Something went wrong");
                res.redirect('/');
            }
        }
    );
};


module.exports.addBook = function (req, res) {
    var requestOptions, path;
    path = '/api/authors/' + req.params.authorid + '/books/';
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