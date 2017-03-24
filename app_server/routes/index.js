/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/authors_list');
var ctrlSecond = require('../controllers/books_list');
var ctrlLogin = require('../controllers/login');
var ctrlRegister = require('../controllers/register');




router.get('/', ctrlMain.homeList);
router.get('/authors/:authorid', ctrlMain.booksList);
router.get('/authors/:authorid/books/:bookid/reviews', ctrlMain.reviewsList);
router.get('/authors/:authorid/books/:bookid/reviews/new', ctrlMain.addReview);
router.post('/authors/:authorid/books/:bookid/reviews/new', ctrlMain.doAddReview);


router.get('/new', ctrlSecond.addAuthor);
router.post('/new', ctrlSecond.doAddAuthor);

router.get('/authors/:authorid/new', ctrlSecond.addBook);
router.post('/authors/:authorid/new', ctrlSecond.doAddBook);
//router.delete('/authors/:authorid/books/:bookid', ctrlSecond.doDeleteBook);


router.get('/login', ctrlLogin.login);
router.get('/register', ctrlRegister.register);

//router.get('/login', ctrlLogin.login);
router.post('/register', ctrlRegister.doRegister);





module.exports = router;