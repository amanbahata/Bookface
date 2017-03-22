/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/authors_list');


router.get('/', ctrlMain.homeList);
router.get('/authors/:authorid', ctrlMain.booksList);
//router.get('/authors/:authorid/books', ctrlMain.reviewsList);
router.get('/authors/:authorid/books/:bookid', ctrlMain.reviewsList);
//router.get('/authors/:authorid/books/:bookid/review/new', ctrlMain.addReview);

module.exports = router;