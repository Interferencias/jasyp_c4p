"use strict";

require("dotenv").config();

var express = require("express");
var fs = require("fs");

var config = require(__dirname + "/../config/sequelize");

var models = require(__dirname + "/../lib/models");
var transporter = require(__dirname + "/../lib/messenger");
var upload = require(__dirname + "/../lib/files");

var router = express.Router();
const Json2csvParser = require("json2csv").Parser;

router.get("/create", function(req, res, next) {
    res.render("pages/create", {
        app_name: config.app_name,
        max_size: config.max_size,
        title: config.event_name + " - Crear participaciones"
    });
});

router.get("/list", function(req, res) {
    models.Paper.findAll({
        attributes: ["id", "name", "email", "title", "type", "file"],
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
        attributes: ["id", "name", "email", "title", "type", "file"],
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

router.get("/download", function(req, res, next) {
    models.Paper.findAll({
        attributes: ["id", "name", "email", "title", "type"],
        raw: true
    }).then(function(papers) {
        const fields = ["id", "name", "email", "title", "type"];
        const json2csvParser = new Json2csvParser({
            fields
        });
        const csv = json2csvParser.parse(papers);

        res.attachment("papers.csv");
        res.status(200).send(csv);
    });
});

router.post("/create", upload.single("paper"), function(req, res) {
    models.Paper.create({
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        type: req.body.type,
        //length: req.body.length,
        //abstract: req.body.abstract,
        file: req.file.filename + ".pdf",
        // url: "URL",
        state: "R"
    }).then(function() {
        fs.rename("public/uploads/" + req.file.filename, "public/uploads/" + req.file.filename + ".pdf", function(err) {
            if (err) console.log("Error: " + err);
        });

        transporter.getTransporter(req.body.name, req.body.email, req.body.title, req.body.type, req.file.filename).sendMail({}, function(error, info) {
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

router.post("/:paper_id/update", upload.single("paper"), function(req, res) {
    if (req.body.edited === "true") {
        models.Paper.find({
            attributes: ["file"],
            where: {
                id: req.params.paper_id
            }
        }).then(function(paper) {
            fs.unlinkSync(__dirname + "/../public/uploads/" + paper.file);

            models.Paper.update({
                name: req.body.name,
                email: req.body.email,
                title: req.body.title,
                type: req.body.type,
                //length: req.body.length,
                //abstract: req.body.abstract,
                file: req.file.filename + ".pdf",
            }, {
                where: {
                    id: req.params.paper_id
                }
            }).then(function() {
                fs.rename("public/uploads/" + req.file.filename, "public/uploads/" + req.file.filename + ".pdf", function(err) {
                    if (err) console.log("Error: " + err);
                });

                res.redirect("/" + config.app_name + "/admin/papers/list");
            });
        });
    } else {
        models.Paper.update({
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            type: req.body.type,
            //length: req.body.length,
            //abstract: req.body.abstract,
        }, {
            where: {
                id: req.params.paper_id
            }
        }).then(function() {
            res.redirect("/" + config.app_name + "/admin/papers/list");
        });
    }
});

router.post("/:paper_id/delete", function(req, res) {
    models.Paper.find({
        attributes: ["file"],
        where: {
            id: req.params.paper_id
        }
    }).then(function(paper) {
        fs.unlinkSync(__dirname + "/../public/uploads/" + paper.file);

        models.Paper.destroy({
            where: {
                id: req.params.paper_id
            }
        }).then(function() {
            res.redirect("/" + config.app_name + "/admin/papers/list");
        });
    });
});

module.exports = router;