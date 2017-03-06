/**
 * Created by aman1 on 06/03/2017.
 */
/*Get books list*/
module.exports.homeList = function (req, res) {
    res.render('books_list', {
        title: 'Bookface',
        pageHeader: {
            title: 'Bookface',
        }

    });
}

/*Get book info page*/
 module.exports.bookInfo = function (req, res) {
     res.render('book_info', {title: 'Book Info'});
 }

 /*Get add review page*/

module.exports.addReview = function (req, res) {
    res.render('book_review_form', {title: 'Add Review'});
}