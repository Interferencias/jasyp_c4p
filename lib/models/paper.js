"use strict";

module.exports = (sequelize, DataTypes) => {
	var Paper = sequelize.define("Paper", {
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		type: {
			// T = Talk, W = Workshop
			type: DataTypes.CHAR(1),
			allowNull: false
		},
		length: {
			// S = Short, L = Large
			type: DataTypes.CHAR(1),
			allowNull: false
		},
		abstract: {
			type: DataTypes.STRING(2000),
			allowNull: false
		},
		state: {
			// R = Received, A = Accepted, D = Denied
			type: DataTypes.CHAR(1),
			allowNull: false
		},
	});

	return Paper;
};
