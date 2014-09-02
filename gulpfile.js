var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	prefix = require('gulp-autoprefixer'),
	ftp = require('gulp-ftp');

// defines path to sass
var sassRoot = 'build/sass/';

// gulp task
gulp.task('sass-to-css', function() {
	return gulp.src(sassRoot + 'main.scss')
		.pipe(sass({sourcemap: true}))
		.pipe(prefix("last 3 versions"))
		.pipe(gulp.dest('public/css'));
});

// CSS ftp task
gulp.task('ftp-css', ['sass-to-css'], function() {
	return gulp.src('public/css/*.css')
		.pipe(ftp({
			host: '66.241.194.6',
			user: 'zackp',
			pass: 'aazackp',
			remotePath: 'Broomfield/css'
		}));
});

// CSS ftp task
gulp.task('ftp-js', function() {
	return gulp.src('public/js/main.js')
		.pipe(ftp({
			host: '66.241.194.6',
			user: 'zackp',
			pass: 'aazackp',
			remotePath: 'Broomfield/js'
		}));
});

// watch
gulp.task('watch', function() {
	// what to watch
	gulp.watch('build/sass/*.scss', function() {
		// what to run
		gulp.run('ftp-css');
	});
	gulp.watch('public/js/main.js', function() {
		gulp.run('ftp-js');
	})
});