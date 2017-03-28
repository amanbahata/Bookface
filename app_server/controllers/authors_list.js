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
        responseBody.author = [];
    }else{
        if (!responseBody.author.length){
            responseBody.author = [];
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


module.exports.addAuthor = function (req, res) {
    if (req.session && req.session.token) {
        res.render('author_add_form', {
            title: 'New Author',
            pageHeader: {title: 'add new author to the list'}
        });
    }else{
        res.render('author_add_form', {
            title: 'New Author',
            pageHeader: {title: 'add new author to the list'},
            message : 'You must be logged in to add a new author'
        });

    }
};

module.exports.doAddAuthor = function(req, res){
    var requestOptions, path, postData;
    path = '/api/authors';
    postData = {
        name: req.body.name
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
            if (response.statusCode === 201){
                res.redirect('/');
            }else{
                res.redirect('/');
            }
        }
    );
};