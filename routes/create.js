"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	res.render("create", {
		title: "JASYP C4P"
	});
});

module.exports = router;
