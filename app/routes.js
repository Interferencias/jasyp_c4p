var form = require("./form");

module.exports = function(app) {
	app.get("/", form.index);

	app.use(function(req, res, next) {
		var err = new Error("Error: página no encontrada.");
		err.status = 404;
		next(err);
	});

	app.use(function(err, req, res, next) {
		res.status(err.status);
		res.render("error", {
			message: err.message,
		});
	});
};
