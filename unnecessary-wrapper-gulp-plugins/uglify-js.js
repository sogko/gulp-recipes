'use strict';

var gulp = require('gulp');
var UglifyJS = require('uglify-js');
var map = require('vinyl-map');
var concat = require('gulp-concat');

gulp.task('uglify' , function uglifyTask() {

  var uglify = map(function (buff, filename) {
    var u = UglifyJS.minify(filename, {
      // specify `UglifyJS` options here
    });
    return u.code;
  });

  return gulp.src('src/**/*.js')
    .pipe(uglify)
    .pipe(concat('uglified.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['uglify']);
