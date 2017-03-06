/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrlBooks = require('../controllers/books_list');
var ctrlReviews = require('../controllers/reviews');


//Books

router.get('/books', ctrlBooks.listByAuthor);
// router.post('/books', ctrlBooks.booksCreate);
// router.get('/books/:bookid', ctrlBooks.booksReadOne);
// router.put('/books/:bookid', ctrlBooks.booksUpdateOne);
// router.delete('/books/:bookid/', ctrlBooks.bookDeleteOne);




module.exports = router;