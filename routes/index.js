var models  = require('../models');
var express = require('express');
var router = express.Router();
var debug = require('debug')('jasyp-c4p:route:index')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'JASYP C4P' });
});

module.exports = router;
