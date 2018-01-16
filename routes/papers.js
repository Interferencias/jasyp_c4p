"use strict";

require("dotenv").config();

var models = require(__dirname + "/../lib/models");
var transporter = require(__dirname + "/../lib/messenger");

var express = require("express");

var router = express.Router();

router.get("/create", function(req, res, next) {
	res.render("pages/create", {
		title: "JASYP C4P - Crear comunicaciones"
	});
});

router.post("/create", function(req, res) {
	models.Paper.create({
		title: req.body.title,
		name: req.body.name,
		email: req.body.email,
		abstract: req.body.abstract
	}).then(function() {
		transporter.getTransporter(req.body.title, req.body.name, req.body.email, req.body.abstract).sendMail({}, function(error, info) {
			if (error) {
				res.render("error", {
					message: "Error occured, message not sent.",
					error: error
				});
			} else {
				res.redirect("/papers/list");
			}
		});
	});
});

router.get("/list", function(req, res) {
	models.Paper.findAll({
		attributes: ["id", "title", "name", "email", "abstract"]
	}).then(function(papers) {
		res.render("pages/list", {
			title: "JASYP C4P - Listar comunicaciones",
			papers: papers
		});
	});
});

router.get("/:paper_id", function(req, res) {
	models.Paper.find({
		attributes: ["id", "title", "name", "email", "abstract"],
		where: {
			id: req.params.paper_id
		}
	}).then(function(paper) {
		res.render("pages/edit", {
			title: "JASYP C4P - Editar comunicaciones",
			paper: paper
		});
	});
});

router.post("/:paper_id/update", function(req, res) {
	models.Paper.update({
		title: req.body.title,
		name: req.body.name,
		email: req.body.email,
		abstract: req.body.abstract
	}, {
		where: {
			id: req.params.paper_id
		}
	}).then(function() {
		res.redirect("/papers/list");
	});
});

router.post("/:paper_id/delete", function(req, res) {
	models.Paper.destroy({
		where: {
			id: req.params.paper_id
		}
	}).then(function() {
		res.redirect("/papers/list");
	});
});

module.exports = router;
