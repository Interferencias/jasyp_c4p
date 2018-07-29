"use strict";

require("dotenv").config();

var express = require("express");
var router = express.Router();

var models = require(__dirname + "/../lib/models");
var transporter = require(__dirname + "/../lib/messenger");

router.get("/", function(req, res, next) {
    res.send({
        somos: "ruido"
    });
});

router.post("/", function(req, res, next) {
    let validIP = process.env.VALID_IP;
    let currentIp = req.connection.remoteAddress;
    currentIp = currentIp.substring(currentIp.lastIndexOf(":") + 1, currentIp.length);

    if (validIP.localeCompare(currentIp) === 0) {
        models.Paper.create({
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            type: req.body.type,
            length: req.body.length,
            abstract: req.body.abstract,
            state: "R"
        }).then(function() {
            transporter.getTransporter(req.body.name, req.body.email, req.body.title, req.body.type, req.body.length, req.body.abstract).sendMail({}, function(error, info) {
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