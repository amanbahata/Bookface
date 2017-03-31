/**
 * Created by aman1 on 17/03/2017.
 */
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var check = require('./check_status');

var sendJasonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.listByAuthor = function (req, res) {
        Book.distinct("author",function (err, authors) {
           if (err){
               sendJasonResponse(res, 404, {"message" : "Problem retrieving authors. Distinct()"});
           }else{
                sendJasonResponse(res, 200, authors);
           }
        });
};





// module.exports.authorCreate = function (req, res) {
//     if (check.checkStatus(req)) {
//         if (req.body.name) {
//             Book.create({
//                 name: req.body.name
//             }, function (err, author) {
//                 if (err) {
//                     sendJasonResponse(res, 400, err);
//                 } else {
//                     sendJasonResponse(res, 201, author);
//                 }
//             });
//         }else{
//             sendJasonResponse(res, 404, {
//                 "message" : "Author name is required"
//             })
//         }
//     }else {
//         sendJasonResponse(res, 404, {
//             "message" : "Unauthorized access."
//         });
//     }
// };
//
//
// module.exports.authorReadOne = function (req, res) {
//     if (req.params && req.params.authorid){
//         Book
//             .findById(req.params.authorid)
//             .exec(function(err, author){
//                 if(!author){
//                     sendJasonResponse(res, 404, {
//                         "message" : "authorid not found"
//                     });
//                     return;
//                 }else if (err){
//                     sendJasonResponse(res, 404, err);
//                     return;
//                 }
//                 sendJasonResponse(res, 200, author);
//             });
//     } else {
//         sendJasonResponse(res, 404, {
//             "message" : "No authorid in request"
//         });
//     }
// };
//
//
// module.exports.authorDeleteOne = function (req, res) {
//     var authorid = req.params.authorid;
//     if(authorid){
//         Book.findByIdAndRemove(authorid)
//             .exec(function(err, author){
//                   if(err){
//                       sendJasonResponse(res, 404, err);
//                       return;
//                   }
//                   sendJasonResponse(res, 204, null);
//               }
//             );
//     }else{
//         sendJasonResponse(res, 404, {
//             "message" : "No authorid"
//         });
//     }
// };


