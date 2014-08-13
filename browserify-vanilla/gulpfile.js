'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {

  // use `vinyl-transform` to wrap the regular ReadableStream returned by `b.bundle();` with vinyl-fs file object
  // so that we can use it down a vinyl pipeline
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src('./src/main.js')  // or you can try './src/*.js' to browserify every file in ./src/* as a separate bundle,
    .pipe(browserified)             // it'd still work!

    // add more transformation tasks to the pipeline here if needed,
    // for eg: minify, uglify, transform etc.
    .pipe(uglify())

    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['browserify']);
