var config = require('../config');

module.exports.task = function(gulp, plugins, paths) {
	gulp.src(paths.vendor.assets)
		.pipe(gulp.dest(config.destDir + "/assets")) 
		.pipe(plugins.connect.reload());

	gulp.src(paths.vendor.fonts)
		.pipe(gulp.dest(config.destDir + "/fonts"))
		.pipe(plugins.connect.reload());

	gulp.src(paths.vendor.fonte)
		.pipe(gulp.dest(config.destDir + "/fonts"))
		.pipe(plugins.connect.reload());

	gulp.src(paths.vendor.imagen)
		.pipe(gulp.dest(config.destDir + "/images"))
		.pipe(plugins.connect.reload());

	gulp.src(paths.vendor.themp)
		.pipe(gulp.dest(config.destDir + "/temp"))
		.pipe(plugins.connect.reload());
};