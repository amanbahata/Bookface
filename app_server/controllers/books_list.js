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