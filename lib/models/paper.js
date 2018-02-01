"use strict";

module.exports = (sequelize, DataTypes) => {
	var Paper = sequelize.define("Paper", {
    name: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
		title: DataTypes.STRING(255),
    type: DataTypes.CHAR(1),
    length: DataTypes.CHAR(1),
		abstract: DataTypes.STRING(2000),
		accepted: DataTypes.BOOLEAN,
	});

	return Paper;
};
