var gulp = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');

gulp.task('minify-js', function() {
  return gulp.src('build.js')
    .pipe(uglify({
      compress:false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('concat', function() {
  return gulp.src(['module.js', 'index.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('replace', function() {
  return gulp.src('./dist/build.min.js', {read: false})
  .pipe(shell([
    'sed -e \'s/^module.exports=/var\\ track=/\' <%= file.path %> > ./dist/tracker.min.js'
  ]));
});

gulp.task('clean-build', function () {
  return gulp.src('./build.js', {read: false})
    .pipe(clean());
});

gulp.task('clean-build-min', function() {
  return gulp.src('./dist/build.min.js', {read: false})
    .pipe(clean());
});

gulp.task('build', function(cb) {
  runSequence('concat', 'minify-js', 'replace', 'clean-build', 'clean-build-min', cb);
});
