var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/create', function(req, res) {
	models.Paper.create({
		title: req.body.title,
		name: req.body.name,
		email: req.body.email,
		abstract: req.body.abstract
	}).then(function() {
		res.redirect('/');
	});
});

module.exports = router;