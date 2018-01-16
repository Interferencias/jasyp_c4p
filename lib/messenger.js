"use strict";

var fs = require("fs");
var nodemailer = require("nodemailer");

module.exports = {
	getTransporter: function(title, name, email, abstract) {
		let text = fs.readFileSync(__dirname + "/../config/text.txt", "utf8");
		let html = fs.readFileSync(__dirname + "/../config/text.html", "utf8");

		let replaces = {
			_title: title,
			_name: name,
			_email: email,
			_abstract: abstract
		};

		html = html.replace(/_title|_name|_email|_abstract/gi, function(matched) {
			return replaces[matched];
		});

		return nodemailer.createTransport({
			host: "interferencias.tech",
			port: 25,
			secure: false,
			requireTLS: true,
			auth: {
				user: "info@interferencias.tech",
				pass: process.env.MAIL_PASS
			}
		}, {
			from: "Interferencias (Info) <info@interferencias.tech>",
			bcc: "Interferencias (JASYP) <jasyp@interferencias.tech>, Interferencias <interferencias@protonmail.com>",
			to: name.concat(" <", email, ">"),
			organization: "Interferencias",
			subject: "Confirmación de participación registrada en JASyP '18",
			text: text,
			html: html
		});
	}
};
