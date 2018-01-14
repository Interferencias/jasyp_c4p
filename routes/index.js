"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	res.render("index", {
		title: "JASYP C4P"
	});
});

router.get("/create", function(req, res, next) {
	res.render("create", {
		title: "JASYP C4P - Crear comunicaciones"
	});
});

router.get("/list", function(req, res) {
	models.Paper.findAll({}).then(function(papers) {
		res.render("list", {
			title: "JASYP C4P - Listar comunicaciones",
			papers: papers
		});
	});
});

module.exports = router;
