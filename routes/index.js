"use strict";

var express = require("express");
var router = express.Router();

var config = require(__dirname + "/../config/sequelize");

router.get("/", function(req, res, next) {
    res.render("pages/index", {
        app_name: config.app_name,
        title: "JASYP C4P"
    });
});

module.exports = router;