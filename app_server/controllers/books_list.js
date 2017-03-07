/**
 * Created by aman1 on 06/03/2017.
 */
/*Get books list*/
module.exports.homeList = function (req, res) {
    res.render('books_list', {
        title: 'Bookface',
        pageHeader: {
            title: 'Books list',
        },
        books: [{
            name: 'The Escape',
            author: 'David Baldacci',
            rating: 3
        },{
            name: 'The great gasby',
            author: 'F. Scott Fitzgerald',
            rating: 2
        },{
            name: 'The Grapes of Wrath',
            author: 'John Steinbeck',
            rating: 1
        }]

    });
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