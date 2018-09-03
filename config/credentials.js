"use strict";

module.exports = {
    auth: {
        enabled: true,
        user: process.env.LOGIN_USER,
        password: process.env.LOGIN_PASSWORD
    },
    email: {
        name: "MedInBio",
        user: "cfp",
        smtp: "mail",
        server: "medinbio.es",
        password: process.env.MAIL_PASSWORD
    }
};
