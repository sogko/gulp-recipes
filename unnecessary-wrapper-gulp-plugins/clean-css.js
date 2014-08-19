'use strict';

var gulp = require('gulp');
var CleanCSS = require('clean-css');
var map = require('vinyl-map');

gulp.task('clean-css' , function minifyCSSTask() {
  // this snippet basically replaces `gulp-clean-css` and `gulp-minify-css`
  var minify = map(function (buff, filename) {
    return new CleanCSS({
      // specify your `clean-css` options here
    }).minify(buff.toString());
  });

  return gulp.src('src/**/*.css')
    .pipe(minify)
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean-css']);
