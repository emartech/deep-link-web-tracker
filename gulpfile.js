var gulp = require('gulp');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

gulp.task('minify-js', function() {
  return gulp.src('build.js')
    .pipe(uglify())
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

gulp.task('build', function(cb) {
  runSequence(['concat', 'minify-js'], cb);
});
