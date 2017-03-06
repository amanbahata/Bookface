/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/books_list');


router.get('/', ctrlMain.homeList);
router.get('/book', ctrlMain.bookInfo);
router.get('/book/review/new', ctrlMain.addReview);

module.exports = router;