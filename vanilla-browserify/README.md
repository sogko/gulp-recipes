# Vanilla ```browserify```

This recipe shows you how to use vanilla [```browserify```] (with some help from ```vinyl-source-stream```)
and move away from using ```gulp-browserify```.


## Quick start

bundle our ```src/main.js``` program
```bash
gulp
```

Open ```index.html``` in a browser (Tested on Safari / Chrome)

## Notes
### 56 reasons not to use ```gulp-browserify``` and counting (or most gulp-* wrappers)

The main ```browserify``` library has enough [open issues](https://github.com/substack/node-browserify/issues) at the moment
that it makes hard to guarantee that ```gulp-browserify``` will always be up-to-date.

In fact, since 13 March 2014, the maintainer of ```gulp-browserify``` has [stopped updating the codebase](https://github.com/deepak1556/gulp-browserify/commits/master)

### How different are the usage between ```browserify``` and ```gulp-browserify```?
Not much, really. We only need ```vinyl-source-stream``` to make this all work, which you can still use for your other gulp needs.

Using ```gulp-browserify```
```javascript

var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
    gulp.src('src/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('./dist'))
});
```

Using ```browserify``` + ```vinyl-source-stream```

```javascript

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    var bundleStream = browserify('./src/main.js').bundle();
    bundleStream
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});
```

Easy-peezy, lemon-squeezy.