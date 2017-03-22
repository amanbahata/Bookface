/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/authors_list');
var ctrlSecond = require('../controllers/books_list');



router.get('/', ctrlMain.homeList);
router.get('/authors/:authorid', ctrlMain.booksList);
router.get('/authors/:authorid/books/:bookid/reviews', ctrlMain.reviewsList);
router.get('/authors/:authorid/books/:bookid/reviews/new', ctrlMain.addReview);
router.post('/authors/:authorid/books/:bookid/reviews/new', ctrlMain.doAddReview);


router.get('/new', ctrlSecond.addAuthor);
router.post('/new', ctrlSecond.doAddAuthor);

router.get('/authors/:authorid/new', ctrlSecond.addBook);
//router.post('/authors/:authorid/new', ctrlSecond.doAddAuthor);






module.exports = router;