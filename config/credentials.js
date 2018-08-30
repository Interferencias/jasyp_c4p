"use strict";

module.exports = {
    auth: {
        enabled: true,
        user: process.env.LOGIN_USER,
        password: process.env.LOGIN_PASSWORD
    },
    email: {
        name: "MedInBio",
        user: "medinbio",
        server: "interferencias.tech",
        password: process.env.MAIL_PASSWORD
    }
};
