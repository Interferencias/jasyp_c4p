"use strict";

var basicAuth = require("basic-auth");

var config = require(__dirname + "/../config/credentials").auth;

module.exports = function() {
    return function(req, res, next) {
        if (!config.enabled) {
            return next();
        }

        var user = basicAuth(req);
        if (!user || user.name !== config.user || user.pass !== config.password) {
            res.set("WWW-Authenticate", "Basic realm=Authorization Required");
            return res.sendStatus(401);
        }
        next();
    };
};