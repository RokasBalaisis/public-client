var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var config = {
	js: 'js/**/*.js'
}


gulp.task('vet', function(){
  return gulp.src([
    config.js
  ])
  .pipe(jshint())
  .pipe(jscs())
  .pipe(jshint.reporter('jshint-stylish'), {verbose: true})
  .pipe(jshint.reporter('fail'));
});