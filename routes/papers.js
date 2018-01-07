var models  = require('../models');
var express = require('express');
var router = express.Router();
var debug = require('debug')('jasyp-c4p:route:papers')

router.post('/create', function(req, res) {
  models.User.create({
    username: req.body.username
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
