"use strict";

var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	let validIP = process.env.VALID_IP;
	let currentIp = req.connection.remoteAddress;
	currentIp = currentIp.substring(currentIp.lastIndexOf(":") + 1, currentIp.length);

	if (validIP.localeCompare(currentIp) === 0) {
		res.sendStatus(200);
	} else {
		res.send({
			somos: "ruido"
		});
	}
});

module.exports = router;
