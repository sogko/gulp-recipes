'use strict';

var gulp = require('gulp');
var del = require('del');

require('./browserify');
gulp.task('del', function rimrafTask(cb) {
  del([
    // delete all .js
    './dist/**/*.js',

    // delete folder
    './dist/'
  ], cb);
});

gulp.task('default', ['del']);
