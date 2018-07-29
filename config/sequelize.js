"use strict";

module.exports = {
    app_name: "bioinf_app",
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