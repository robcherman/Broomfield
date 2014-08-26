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

// ftp task
gulp.task('ftp', ['sass-to-css'], function() {
	return gulp.src('public/css/*.css')
		.pipe(ftp({
			host: '66.241.194.6',
			user: 'zackp',
			pass: 'aazackp',
			remotePath: 'Broomfield/css'
		}));
});

// watch
gulp.task('watch-sass', function() {
	// what to watch
	gulp.watch('build/sass/*.scss', function() {
		// what to run
		gulp.run('ftp');
	});
});