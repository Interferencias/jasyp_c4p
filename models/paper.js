'use strict';

module.exports = (sequelize, DataTypes) => {
	var Paper = sequelize.define('Paper', {
		title: DataTypes.STRING(255),
		name: DataTypes.STRING(255),
		email: DataTypes.STRING(255),
		abstract: DataTypes.STRING(2000)
	});

	return Paper;
};