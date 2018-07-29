"use strict";

var fs = require("fs");
var nodemailer = require("nodemailer");

var config = require(__dirname + "/../config/credentials");

module.exports = {
    getTransporter: function(name, email, title, type, length, abstract) {
        let text = fs.readFileSync(__dirname + "/../config/text.txt", "utf8");
        let html = fs.readFileSync(__dirname + "/../config/text.html", "utf8");

        let replaces = {
            _name: name,
            _email: email,
            _title: title,
            _abstract: abstract
        };

        text = text.replace(/_name|_email|_title|_abstract/gi, function(matched) {
            return replaces[matched];
        });

        html = html.replace(/_name|_email|_title|_abstract/gi, function(matched) {
            return replaces[matched];
        });

        if (type == "T") {
            text = text.replace(/_type/gi, "Charla");
            html = html.replace(/_type/gi, "Charla");
        } else {
            text = text.replace(/_type/gi, "Taller");
            html = html.replace(/_type/gi, "Taller");
        }

        if (length == "S") {
            text = text.replace(/_length/gi, "Corta");
            html = html.replace(/_length/gi, "Corta");
        } else {
            text = text.replace(/_length/gi, "Larga");
            html = html.replace(/_length/gi, "Larga");
        }

        return nodemailer.createTransport({
            host: config.email.server,
            port: 25,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.email.user + "@" + config.email.server,
                pass: config.email.password
            }
        }, {
            from: config.email.name + " <" + config.email.user + "@" + config.email.server + ">",
            bcc: "Interferencias (Info) <info@interferencias.tech>, Interferencias <interferencias@protonmail.com>",
            to: name.concat(" <", email, ">"),
            organization: "Interferencias",
            subject: "Confirmación de participación registrada en JASyP '18",
            text: text,
            html: html
        });
    }
};