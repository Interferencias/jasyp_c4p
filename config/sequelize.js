"use strict";

module.exports = {
    app_name: "medinbio",
    event_name: "MedInBio C4P",
    max_size: 19892827,
    development: {
        dialect: "sqlite",
        storage: "./db.development.sqlite"
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:"
    },
    production: {
        dialect: "mysql",
        host: "localhost",
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
};
