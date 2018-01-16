"use strict";

var nodemailer = require("nodemailer");

module.exports = {
	getTransporter: function(title, name, email, abstract) {
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
			text: "Hola:\n\nGracias por registrarte en las JASyP '18. Esperamos poder dar cabida a todas las solicitudes que nos lleguen. En cuanto cerremos el periodo de registro el día X, no más tarde del día Y confirmaremos el programa y lo publicaremos en nuestra página web; de igual forma que haremos con el horario definitivo.\n\nHemos recibido la siguiente participación:\n\n\t· Título: ".concat(title, "\n\t· Nombre: ", name, "\n\t· Email: ", email, "\n\t· Resumen: ", abstract, "\n\nSi alguno de estos datos es erróneo, quieres cambiar algo o tienes cualquier duda, puedes escribirnos a jasyp@interferencias.tech.\n\nMuchas gracias por tu interés, te animamos a que les hables sobre esta aventura a todos tus amigos y conocidos, ya que este evento es mucho más grande gracias a tu aportación. =)\n\nSaludos,\n\nInterferencias\n\nPuedes encontranos en:\n\t· Correo: info@interferencias.tech\n\t· Telegram: t.me/inter_ferencias\n\t· Twitter: twitter.com/Inter_ferencias\n\t· Mastodon: mastodon.technology/@interferencias\n\t· Vimeo: vimeo.com/interferencias\n\t· GitHub: github.com/interferencias"),
			html: "<!DOCTYPE html><html lang='es'><head><meta charset='utf-8'></head><body><h2>Hola</h2>Gracias por registrarte en las <strong>JASyP '18</strong>. Esperamos poder dar cabida a todas las solicitudes que nos lleguen. En cuanto cerremos el periodo de registro el día X, <u><strong>no más tarde del día Y confirmaremos el programa definitivo</strong></u> y lo publicaremos en <a href='https://interferencias.tech/'>nuestra página web</a>; de igual forma que haremos con el horario definitivo.<br><br>Hemos recibido la siguiente participación:<br><br>&nbsp&nbsp&nbsp&nbsp· <strong>Título</strong>: req.body.title<br>&nbsp&nbsp&nbsp&nbsp· <strong>Nombre</strong>: req.body.name<br>&nbsp&nbsp&nbsp&nbsp· <strong>Email</strong>: req.body.email<br>&nbsp&nbsp&nbsp&nbsp· <strong>Resumen</strong>: req.body.abstract<br><br>Si alguno de estos datos es erroneo, quieres cambiar algo o tienes cualquier duda, puedes escribirnos a <a href='mailto:jasyp@interferencias.tech'>jasyp@interferencias.tech</a>.<br><br>Muchas gracias por tu interés, <u>te animamos a que les hables sobre esta aventura a todos tus amigos y conocidos</u>, ya que <strong>este evento es mucho más grande gracias a tu aportación. =)</strong><br><br><h3>Saludos,</h3><div style='width:1000px; margin:0 auto 0 auto; text-align:left; display:inline-block;'><img src='https://interferencias.tech/assets/images/social/tags/margin.png' alt='Margen izquierdo para banner'><a href='https://interferencias.tech'><img src='https://interferencias.tech/assets/images/social/tags/logo_tarjeta.png' alt='Logo de Interferencias en formato tarjeta'></a><img src='https://interferencias.tech/assets/images/social/tags/margin.png' alt='Margen derecho para banner'></div><div style='width:1000px; margin:0 auto 0 auto; text-align:left; display:inline-block;'><a href='mailto:info@interferencias.tech'><img src='https://interferencias.tech/assets/images/social/tags/email.png' alt='Logo Email'></a><a href='https://t.me/inter_ferencias'><img src='https://interferencias.tech/assets/images/social/tags/telegram.png' alt='Logo Telegram'></a><a href='https://twitter.com/Inter_ferencias'><img src='https://interferencias.tech/assets/images/social/tags/twitter.png' alt='Logo Twitter'></a><a href='https://mastodon.technology/@interferencias'><img src='https://interferencias.tech/assets/images/social/tags/mastodon.png' alt='Logo Mastodon'></a><a href='https://vimeo.com/interferencias'><img src='https://interferencias.tech/assets/images/social/tags/vimeo.png' alt='Logo Vimeo'></a><a href='https://github.com/interferencias'><img src='https://interferencias.tech/assets/images/social/tags/github.png' alt='Logo GitHub'></a></div></body>"
		});
	}
};
