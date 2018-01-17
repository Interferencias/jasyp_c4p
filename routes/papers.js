"use strict";

require("dotenv").config();

var models = require(__dirname + "/../lib/models");
var transporter = require(__dirname + "/../lib/messenger");

var express = require("express");
var json2csv = require('json2csv');

var router = express.Router();

router.get("/download", function(req, res, next) {
	models.Paper.findAll({
		attributes: ["id", "title", "name", "email", "abstract"],
		raw: true
	}).then(function(papers) {
		let fields = ['id', 'title', 'name', 'email', 'abstract'];
		let fieldNames = ['ID', 'TÍTULO', 'NOMBRE', 'EMAIL', 'RESUMEN'];
		let data = json2csv({
			data: papers,
			fields: fields,
			fieldNames: fieldNames,
			withBOM: true
		});

		res.attachment('solicitudes.csv');
		res.status(200).send(data);
	});
});

router.get("/create", function(req, res, next) {
	res.render("pages/create", {
		title: "JASYP C4P - Crear comunicaciones"
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
					title: "JASYP C4P - Error",
					message: "Error occured, message not sent.",
					error: error
				});
			} else {
				res.redirect("/papers/list");
			}
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
