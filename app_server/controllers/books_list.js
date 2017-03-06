/**
 * Created by aman1 on 06/03/2017.
 */
/*Get books list*/
module.exports.homeList = function (req, res) {
    res.render('index', {title: 'Bookface'});
}

/*Get book info page*/
 module.exports.bookInfo = function (req, res) {
     res.render('index', {title: 'Book Info'});
 }

 /*Get add review page*/

module.exports.addReview = function (req, res) {
    res.render('index', {title: 'Add Review'});
}