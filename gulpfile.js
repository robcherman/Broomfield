// ============ broomfield ==============

// Include gulp
var gulp = require('gulp');

// Include Plugins
var ftp = require('gulp-ftp');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

// Compile Sass
gulp.task('sass', function() {
  return gulp.src('build/sass/main.scss')
    .pipe(rename({suffix: '.min'}))
    .pipe(sass({style: 'compressed'}))
    .pipe(gulp.dest('css'));
});

// Dev FTP: CSS
gulp.task('ftp-dev-css', function() {
  return gulp.src('css/*')
    .pipe(ftp({
      host: '66.241.194.6',
      user: 'chrisd',
      pass: 'aachrisd',
      remotePath: 'broomfield/css'
    }));
});

// Dev FTP: Sass
gulp.task('ftp-dev-scss', function() {
  return gulp.src('scss/*')
    .pipe(ftp({
      host: '66.241.194.6',
      user: 'chrisd',
      pass: 'aachrisd',
      remotePath: 'broomfield/scss'
    }));
});

// Prod FTP: CSS
gulp.task('ftp-css', function() {
  return gulp.src('css/*')
    .pipe(ftp({
      host: '66.241.194.5',
      user: 'chrisd',
      pass: 'G00berz',
      remotePath: '/Atlas/Sites/KenticoCMS 7.0.103/broomfield/css'
    }));
});

// Prod FTP: Sass
gulp.task('ftp-scss', function() {
  return gulp.src('scss/*')
    .pipe(ftp({
      host: '66.241.194.5',
      user: 'chrisd',
      pass: 'G00berz',
      remotePath: '/Atlas/Sites/KenticoCMS 7.0.103/broomfield/scss'
    }));
});

// FTP Everything to Dev and Prod
gulp.task('ftp-all', ['ftp-dev-css', 'ftp-dev-scss', 'ftp-dev-scripts', 'ftp-css', 'ftp-scss', 'ftp-scripts']);

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('build/sass/*.scss', ['sass']);
  gulp.watch('css/*.css', ['ftp-dev-css', 'ftp-css']);
  // gulp.watch('scripts/*.js', ['scripts']);
  // gulp.watch('js/*.js', ['ftp-dev-sripts'])
});

// Default Task
gulp.task('default', ['watch']);