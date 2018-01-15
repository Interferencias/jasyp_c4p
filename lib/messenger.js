"use strict";

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
	host: "interferencias.tech",
	port: 25,
	secure: false,
	requireTLS: true,
	auth: {
		user: "info@interferencias.tech",
		pass: process.env.MAIL_PASS
	}
}, {
	from: 'Interferencias (Info) <info@interferencias.tech>',
	bcc: 'Interferencias (JASYP) <jasyp@interferencias.tech>, Interferencias <interferencias@protonmail.com>',
	organization: 'Interferencias',
	subject: 'Confirmación de participación registrada',
	text: 'Hola, gracias por registrar tu participación en las JASYP. En cuanto tomemos alguna decisión te informaremos. Saludos.',
	html: '<p>Hola,<br> gracias por registrar tu participación en las JASYP. En cuanto tomemos alguna decisión te informaremos.<br><br>Saludos.</p>'
});

module.exports = transporter;
