"use strict";

require("dotenv").config();

var express = require("express");
var fs = require("fs-extra");

var models = require(__dirname + "/../lib/models");
var transporter = require(__dirname + "/../lib/messenger");
var upload = require(__dirname + "/../lib/files");

var router = express.Router();

router.get("/", function(req, res, next) {
    res.send({
        somos: "ruido"
    });
});

router.post("/", upload.single("paper"), function(req, res, next) {
    let validIP = process.env.VALID_IP.split(",");
    let currentIp = req.connection.remoteAddress;
    currentIp = currentIp.substring(currentIp.lastIndexOf(":") + 1, currentIp.length);

    if (validIP.includes(currentIp)) {
        models.Paper.create({
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            type: req.body.type,
            file: req.file.filename + ".pdf",
            //length: req.body.length,
            //abstract: req.body.abstract,
            state: "R"
        }).then(function() {
            fs.rename("public/uploads/" + req.file.filename, "public/uploads/" + req.file.filename + ".pdf", function(err) {
                if (err) console.log("Error: " + err);
            });

            transporter.getTransporter(req.body.name, req.body.email, req.body.title, req.body.type, req.file.filename).sendMail({}, function(error, info) {
                if (error) {
                    res.redirect(req.body.bad);
                } else {
                    res.redirect(req.body.good);
                }
            });
        });
    } else {
        res.send({
            somos: "ruido"
        });
    }
});

module.exports = router;