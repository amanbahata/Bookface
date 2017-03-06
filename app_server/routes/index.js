/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/books');


router.get('/', ctrlMain.index);

module.exports = router;