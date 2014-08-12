'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function (cb) {

  // create an instance of browserify
  // in this example, we are telling it to look at src/main.js and have it walk through our require() dependencies
  // and bundle those in one file
  // for more browserify options, https://github.com/substack/node-browserify#var-b--browserifyfiles-or-opts
  var b = browserify('./src/main.js', {});

  // instead of specifying the file(s) we want to bundle in the constructor,
  // we can use b.add(filename) instead.

  // bundle() returns a readable stream that we can use to start piping
  var bundle = b.bundle();

  // create a new file stream with the output filename of our bundled .js
  var stream = bundle.pipe(source('bundle.js'));

  // add more to the stream pipeline here if needed
  // minify, uglify, transform etc

  // destination folder that we will write bundle.js to
  stream.pipe(gulp.dest('./dist'));

  // return stream if we want to make is an asynchronous task
  return stream;

});

gulp.task('default', ['browserify']);


