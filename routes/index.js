var express = require('express');
var router = express.Router();

var pets = require('./pets')

router.use('/pets',pets)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is the index');
});

module.exports = router;
