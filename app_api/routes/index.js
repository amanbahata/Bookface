/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrAuthors = require('../controllers/authors_list');
var ctrlBooks = require('../controllers/books_list');
var ctrlReviews = require('../controllers/reviews');


//Authors

router.get('/authors', ctrAuthors.listByAuthor);
router.post('/authors', ctrAuthors.authorCreate);
router.get('/authors/:authorid', ctrAuthors.authorReadOne);
router.put('/authors/:authorid', ctrAuthors.authorUpdateOne);
router.delete('/authors/:authorid/', ctrAuthors.authorDeleteOne);


//Books

router.get('/authors/:authorid/books', ctrlBooks.listBooks);
router.post('/authors/:authorid/books', ctrlBooks.booksCreate);
router.get('/authors/:authorid/books/:bookid', ctrlBooks.booksReadOne);
// router.put('/books/:bookid', ctrlBooks.booksUpdateOne);
// router.delete('/books/:bookid/', ctrlBooks.bookDeleteOne);

//Reviews

router.post('/authors/:authorid/books/:bookid/reviews', ctrlReviews.reviewsCreate);
router.get('/authors/:authorid/books/:bookid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/authors/:authorid/books/:bookid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/authors/:authorid/books/:bookid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);




module.exports = router;