"use strict";

var fs = require("fs-extra");
var multer = require("multer");

var config = require(__dirname + "/../config/sequelize");

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            var path = "public/uploads/";
            fs.mkdirsSync(path);
            callback(null, path);
        }
    }),
    limits: {
        fileSize: config.max_size
    },
    fileFilter: function(req, file, callback) {
        if (file.mimetype !== "application/pdf") {
            callback(null, false);
        } else {
            callback(null, true);
        }
    }
});