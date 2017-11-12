var path = require('path');
var config = require('../config');
var sourcemaps = require('gulp-sourcemaps');

module.exports.task = function(gulp, plugins, paths) {

	gulp.src(paths.app.styles)
		.pipe(plugins.concat('app.scss'))
		.pipe(sourcemaps.init())
		.pipe(
			plugins.sass({
				includePaths: [
					path.resolve( config.srcDir ),
					path.resolve( config.npmDir ),
					path.resolve( config.bowerDir ),
				]
			})
				.on('error', plugins.sass.logError)
		)
		.pipe(plugins.autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.destDir + '/css'))
		.pipe(plugins.connect.reload()).on( 'error', plugins.sass.logError );
};
