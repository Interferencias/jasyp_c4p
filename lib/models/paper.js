"use strict";

module.exports = (sequelize, DataTypes) => {
	var Paper = sequelize.define("Paper", {
		name: DataTypes.STRING(255),
		email: DataTypes.STRING(255),
		title: DataTypes.STRING(255),
		type: DataTypes.CHAR(1),    // T = Talk, W = Workshop
		length: DataTypes.CHAR(1),  // S = Short, L = Large
		abstract: DataTypes.STRING(2000),
		state: DataTypes.CHAR(1),   // R = Received, A = Accepted, D = Denied
	});

	return Paper;
};
