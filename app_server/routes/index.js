/**
 * Created by aman1 on 06/03/2017.
 */

var express = require('express');
var router = express();

router.get('/', function(req, res){
    res.send('<h1>Hello</h1>');
});


module.exports = router;