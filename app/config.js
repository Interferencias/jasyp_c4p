var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var express = require("express");

module.exports = function(app) {
	app.set("port", process.env.PORT || 3000);
	app.set("ip", process.env.IP || "0.0.0.0");

	app.set("views", "views");
	app.set("view engine", "ejs");

	if (process.env.NODE_ENV !== "test") {
		app.use(logger("dev"));
	}

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(cookieParser());

	app.use(express.static("./public"));
};
