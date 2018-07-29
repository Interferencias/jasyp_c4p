"use strict";

require("dotenv").config();

var models = require(__dirname + "/../lib/models");
var transporter = require(__dirname + "/../lib/messenger");

var express = require("express");
var json2csv = require("json2csv");

var multer = require('multer')
var fs = require('fs-extra');

var router = express.Router();

var config = require(__dirname + "/../config/sequelize");

var upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            var path = "public/uploads/"
            fs.mkdirsSync(path);
            callback(null, path);
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        }
    }),
    limits: {
        fileSize: config.max_size //20971520 // 20 MB
    }
});

router.get("/download", function(req, res, next) {
    models.Paper.findAll({
        attributes: ["id", "name", "email", "title", "type", "length", "abstract"],
        raw: true
    }).then(function(papers) {
        let fields = ["id", "name", "email", "title", "type", "length", "abstract"];
        let fieldNames = ["ID", "NOMBRE", "EMAIL", "TÍTULO", "TIPO", "DURACIÓN", "RESUMEN"];
        let data = json2csv({
            data: papers,
            fields: fields,
            fieldNames: fieldNames,
            withBOM: true
        });

        res.attachment("participaciones.csv");
        res.status(200).send(data);
    });
});

router.get("/create", function(req, res, next) {
    res.render("pages/create", {
        app_name: config.app_name,
        max_size: config.max_size,
        title: config.event_name + " - Crear participaciones"
    });
});

router.get("/list", function(req, res) {
    models.Paper.findAll({
        attributes: ["id", "name", "email", "title", "type", "length"],
    }).then(function(papers) {
        res.render("pages/list", {
            app_name: config.app_name,
            title: config.event_name + " - Listar participaciones",
            papers: papers
        });
    });
});

router.get("/:paper_id", function(req, res) {
    models.Paper.find({
        attributes: ["id", "name", "email", "title", "type", "length", "abstract"],
        where: {
            id: req.params.paper_id
        }
    }).then(function(paper) {
        res.render("pages/edit", {
            app_name: config.app_name,
            max_size: config.max_size,
            title: config.event_name + " - Editar participaciones",
            paper: paper
        });
    });
});

router.post("/create", upload.single('paper'), function(req, res) {
    models.Paper.create({
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        type: req.body.type,
        length: req.body.length,
        abstract: req.body.abstract,
        file: "req.file",
        url: "req.body.url",
        state: "R"
    }).then(function() {
        transporter.getTransporter(req.body.name, req.body.email, req.body.title, req.body.type, req.body.length, req.body.abstract).sendMail({}, function(error, info) {
            if (error) {
                res.render("error", {
                    app_name: config.app_name,
                    title: config.event_name + " - Error",
                    message: "Ha ocurrido un error, no se ha podido mandar el mensaje de confirmación.",
                    error: error
                });
            } else {
                res.redirect("/" + config.app_name + "/admin/papers/list");
            }
        });
    });
});

router.post("/:paper_id/update", function(req, res) {
    models.Paper.update({
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        type: req.body.type,
        length: req.body.length,
        abstract: req.body.abstract
    }, {
        where: {
            id: req.params.paper_id
        }
    }).then(function() {
        res.redirect("/" + config.app_name + "/admin/papers/list");
    });
});

router.post("/:paper_id/delete", function(req, res) {
    models.Paper.destroy({
        where: {
            id: req.params.paper_id
        }
    }).then(function() {
        res.redirect("/" + config.app_name + "/admin/papers/list");
    });
});

module.exports = router;
