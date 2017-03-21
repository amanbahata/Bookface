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
    res.render('authors_list', {
            title: 'Bookface',
            pageHeader: {
                title: 'List of Authors'
            },
            authors: responseBody
        });
};



/*Get books list*/
module.exports.homeList = function (req, res) {
    var requestOptions, path;
    path = '/api/authors';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json: {}
    };
    request (requestOptions, function(err, response, body){
                homepageRenderer(req, res, body);
        }
    );
};

/*Get book info page*/
 module.exports.bookInfo = function (req, res) {
     res.render('book_info', {
         title: 'The escape',
         pageHeader: {title: 'The escape'},
         book: {
             name: 'The escape',
             author: 'David Baldacci',
             rating: 3,
             reviews: [{
                 author: 'Aman Enghida',
                 rating: 3,
                 timestamp: '05/03/17',
                 reviewText: 'I had spent a good time reading this book.'
             },{
                 author: 'Joh Doe',
                 rating: 3,
                 timestamp: '04/03/17',
                 reviewText: 'I did not like this book.'
             }]
         }
     });
 };

 /*Get add review page*/

module.exports.addReview = function (req, res) {
    res.render('book_review_form', {
        title: 'Review The escape',
        pageHeader: {title: 'Review The escape'}
    });
};