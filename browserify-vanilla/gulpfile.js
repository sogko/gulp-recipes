'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {

  // create an instance of browserify
  // in this example, we are telling it to look at src/main.js and have it walk through our require() dependencies
  // and bundle those in one file
  // for more browserify options, https://github.com/substack/node-browserify#var-b--browserifyfiles-or-opts
  var b = browserify('./src/*.js', {});

  // instead of specifying the file(s) we want to bundle in the constructor,
  // we can use b.add(filename) instead.

  // bundle() returns a regular NodeJS Readable stream that we can use to start piping
  var stream =  b.bundle()

    // since gulp itself and its plugins work on vinyl file objects instead of regular streams,
    // we will use vinyl-source-stream to convert the regular stream from b.bundle()
    // to a streaming vinyl file object
    .pipe(source('bundle.js'))

    // add more transformation tasks to the pipeline here if needed,
    // for eg: minify, uglify, transform etc.
    // by default, most gulp plugins (especially for transformation tasks)
    // works on buffered vinyl file object (for eg: uglify).
    // if needed, you may use vinyl-buffer to convert the streaming vinyl file object
    // to a buffered vinyl file object

    // an example transformation
    .pipe(buffer())
    .pipe(uglify())

    // destination folder that we will write bundle.js to
    .pipe(gulp.dest('./dist'));

  // return stream if we want to make this an asynchronous task
  return stream;

});


gulp.task('default', ['browserify']);


