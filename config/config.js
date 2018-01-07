module.exports = {
	development: {
		dialect: "sqlite",
		storage: "./db.development.sqlite",
		logging: true,
		native: true,
		define: {
			underscored: false
			freezeTableName: false,
			charset: 'utf8',
			dialectOptions: {
				collate: 'utf8_general_ci'
			},
			timestamps: true
		}
	},
	test: {
		dialect: "sqlite",
		storage: ":memory:"
	},
	production: {
		dialect: 'mysql',
		host: 'localhost',
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: 'jasyp',
		logging: true,
		native: true,
		define: {
			underscored: false
			freezeTableName: false,
			charset: 'utf8',
			dialectOptions: {
				collate: 'utf8_general_ci'
			},
			timestamps: true
		}
	}
};
