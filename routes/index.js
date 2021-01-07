var express = require('express');
var router = express.Router();

var database=require('../module/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getAllProduct', function(req, res, next) {
  database.product.find(function(err,data){
    res.send(data);
  }).sort({date: -1}).limit(4);
});



module.exports = router;
