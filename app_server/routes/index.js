/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/authors_list');
var ctrlSecond = require('../controllers/books_list');
var ctrlLogin = require('../controllers/login');
var ctrlRegister = require('../controllers/register');
var ctrlVerify = require('../controllers/verification');
var ctrlLogout = require('../controllers/logout');




router.get('/', ctrlMain.homeList);
router.get('/author/:authorName', ctrlMain.authorBooks);
router.get('/books/:bookid', ctrlSecond.bookDetail);
router.get('/books/:authorName/new', ctrlSecond.addBook);
router.post('/books/:authorName/new', ctrlSecond.doAddBook);


// router.get('/authors/:authorid/books/:bookid/reviews', ctrlSecond.reviewsList);
// router.get('/authors/:authorid/books/:bookid/reviews/new', ctrlSecond.addReview);
// router.post('/authors/:authorid/books/:bookid/reviews/new', ctrlSecond.doAddReview);


router.get('/newauthor', ctrlMain.addAuthor);
router.post('/newauthor', ctrlMain.doAddAuthor);

// router.post('/authors/:authorid/new', ctrlSecond.doAddBook);
//router.delete('/authors/:authorid/books/:bookid', ctrlSecond.doDeleteBook);


router.get('/login', ctrlLogin.login);
router.get('/register', ctrlRegister.register);


router.post('/login' , ctrlLogin.doLogin);
router.post('/register', ctrlRegister.doRegister);
router.get('/verify/:tokenid', ctrlVerify.doVerification);
router.get('/logout', ctrlLogout.doLogout);



module.exports = router;