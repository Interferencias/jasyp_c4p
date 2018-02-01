"use strict";

module.exports = {
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
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE
	}
};