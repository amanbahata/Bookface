/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrlAuthors = require('../controllers/authors_list');
var ctrlBooks = require('../controllers/books_list');
var ctrlReviews = require('../controllers/reviews');


//Authors

router.get('/authors', ctrlAuthors.listByAuthor);
router.post('/authors', ctrlAuthors.authorCreate);
router.get('/authors/:authorid', ctrlAuthors.authorReadOne);
// router.put('/authors/:authorid', ctrAuthors.authorUpdateOne);
router.delete('/authors/:authorid', ctrlAuthors.authorDeleteOne);


//Books

router.get('/authors/:authorid/books', ctrlBooks.listBooks);
router.post('/authors/:authorid/books', ctrlBooks.booksCreate);
router.get('/authors/:authorid/books/:bookid', ctrlBooks.booksReadOne);
// router.put('/books/:bookid', ctrlBooks.booksUpdateOne);
router.delete('/authors/:authorid/books/:bookid', ctrlBooks.bookDeleteOne);

//Reviews

router.get('/authors/:authorid/books/:bookid/reviews', ctrlReviews.listReviews);
router.post('/authors/:authorid/books/:bookid/reviews', ctrlReviews.reviewsCreate);
// router.get('/authors/:authorid/books/:bookid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
//router.delete('/authors/:authorid/books/:bookid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);




module.exports = router;