/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrlBooks = require('../controllers/books_list');
var ctrlReviews = require('../controllers/reviews');


//Books

router.get('/books', ctrlBooks.listByAuthor);
router.post('/books', ctrlBooks.booksCreate);
router.get('/books/:bookid', ctrlBooks.booksReadOne);
// router.put('/books/:bookid', ctrlBooks.booksUpdateOne);
// router.delete('/books/:bookid/', ctrlBooks.bookDeleteOne);

//Reviews

router.post('/books/:bookid/reviews', ctrlReviews.reviewsCreate);
router.get('/books/:bookid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/books/:bookid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('books/:bookid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);




module.exports = router;