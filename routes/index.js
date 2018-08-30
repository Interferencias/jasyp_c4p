"use strict";

var express = require("express");

var config = require(__dirname + "/../config/sequelize");

var router = express.Router();

router.get("/", function(req, res, next) {
    res.render("pages/index", {
        app_name: config.app_name,
        title: config.event_name
    });
});

module.exports = router;