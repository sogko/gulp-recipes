# ```browserify```, vanilla flavored

This recipe shows you how to use vanilla [```browserify```](https://github.com/substack/node-browserify) (with some help from [```vinyl-source-stream```](https://github.com/hughsk/vinyl-source-stream))
and move away from using [```gulp-browserify```](https://github.com/deepak1556/gulp-browserify).


## Running the example

1. Bundle our ```src/main.js``` program by running ```gulp```.
2. Open ```index.html``` in a browser (Tested on Safari / Chrome).
3. Profit!

## Example details

1. The example [```src/main.js```](src/main.js) script requires two modules:
    1. A relative file that has an exported module
    2. A plain npm-managed node module ([```lodash```](https://github.com/lodash/lodash))
2. The default ```gulp``` task will bundle ```src/main.js``` into ```dist/bundle.js```, which is loaded into [```index.html```](index.html)

## Notes

### 56 reasons not to use ```gulp-browserify``` (or most gulp-* wrappers) and counting

The main ```browserify``` library has enough [open issues](https://github.com/substack/node-browserify/issues) at the moment
that it makes hard to guarantee that ```gulp-browserify``` will always be up-to-date.

In fact, since 13 March 2014, the maintainer of ```gulp-browserify``` has [stopped updating the codebase](https://github.com/deepak1556/gulp-browserify/commits/master).

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
