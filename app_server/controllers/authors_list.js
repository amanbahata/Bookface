/**
 * Created by aman1 on 06/03/2017.
 */
var request = require('request');
var whoIsUser = require('./display_user');

/*
    Setting up the api options
 */
var apiOptions = {
    server : "http://localhost:3000"
};



/**
 *Get the authors list
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

/**
 * Setting up the main rendering function
 */


var homepageRenderer = function(req, res, responseBody) {

    var message;
    var loggedIn = false;

    if (req.session && req.session.token){
        loggedIn = true;
        var screenName = whoIsUser.screenNameDecoder(req);
    }

    if (!(responseBody instanceof Array)){
        message = "API lookup error";
    }else{
        if (!responseBody.length > 0){
            message = "No authors found";
        }
    }
    res.render('authors_list', {
            title: 'Bookface',
            pageHeader: {
                title: 'List of Authors'
            },
            loggedIn: loggedIn,
            scrName: screenName,
            authors: responseBody,
            message : message
        });
};

/**
 * Get books list of an author
 * @param req
 * @param res
 */

module.exports.authorBooks = function (req, res) {
    var requestOptions, path;
    path = '/api/authors/' + req.params.authorName;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json: {}
    };
    request (requestOptions,
        function(err, response, body){
            authorBooksRenderer(req, res, body);
        }
    );
};

/**
 * Render response from authorBooks
 * @param req
 * @param res
 * @param responseBody
 */
var authorBooksRenderer = function (req, res, responseBody) {
    var message;
    var loggedIn = false;

    if (req.session && req.session.token){
        loggedIn = true;
        var screenName = whoIsUser.screenNameDecoder(req);
    }

    if (!(responseBody instanceof Array)){
        message = "API lookup error";
    }else{
        if (!responseBody.length > 0){
            message = "No Books found";
        }
    }
    res.render('books_list', {
        title: req.params.authorName,
        pageHeader: {
            title: 'List of Books by: ' + req.params.authorName
        },
        loggedIn: loggedIn,
        scrName: screenName,
        books: responseBody,
        message : message
    });
};

/**
 * Renders author_add_form page
 * @param req
 * @param res
 */

module.exports.addAuthor = function (req, res) {
    res.render('author_add_form', {
        title: 'New Author',
        pageHeader: {title: 'add new author to the list'},
        scrName: whoIsUser.screenNameDecoder(req)

    });
};


/**
 * This function preforms the addition of a new author by the user
 * @param req
 * @param res
 */


module.exports.doAddAuthor = function(req, res){
    var requestOptions, path, postData;
    var screenName = whoIsUser.screenNameDecoder(req);
    path = '/api/books';
    postData = {
        addedBy: screenName,
        author: req.body.author,
        title: req.body.title,
        description: req.body.description
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
        function(err, response){
            if (response.statusCode === 201){
                res.redirect('/');
            }else{
                res.redirect('/');
            }
        }
    );
};