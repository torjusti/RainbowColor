var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
  gulp.src('src/rainbow.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify({preserveComments: 'some'}))
  .pipe(gulp.dest('lib'))
  .pipe(gulp.src('src/standalone_functions.js'))
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});