# ```browserify```, vanilla flavored

This recipe shows you how to use vanilla [```browserify```](https://github.com/substack/node-browserify) (with some help from [```vinyl-transform```](https://github.com/hughsk/vinyl-transform))
and move away from using [```gulp-browserify```](https://github.com/deepak1556/gulp-browserify).


## Running the example

1. Bundle our ```src/main.js``` program by running ```gulp```.
2. Open ```index.html``` in a browser (Tested on Safari / Chrome).
3. Profit!

## Example details

1. The example [```src/main.js```](src/main.js) script requires two modules:
    1. A relative file that has an exported module
    2. A plain npm-managed node module ([```lodash```](https://github.com/lodash/lodash))
2. The default ```gulp``` task will bundle ```src/main.js``` into ```dist/main.js```, which is loaded into [```index.html```](index.html)

## Notes

### 56 reasons not to use ```gulp-browserify``` (or most gulp-* wrappers) and counting

The main ```browserify``` library has enough [open issues](https://github.com/substack/node-browserify/issues) at the moment
that it makes hard to guarantee that ```gulp-browserify``` will always be up-to-date.

In fact, since 13 March 2014, the maintainer of ```gulp-browserify``` has [stopped updating the codebase](https://github.com/deepak1556/gulp-browserify/commits/master).

### How different are the usage between ```browserify``` and ```gulp-browserify```?
Not much, really. We only need ```vinyl-transform``` to make this all work, which you can still use it for your other gulp needs.

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

Using ```browserify``` + ```vinyl-transform```

```javascript

var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');

gulp.task('browserify', function () {

  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src('./src/main.js')  // or you can try './src/*.js' to browserify every file in ./src/* as a separate bundle, it'd still work!
    .pipe(browserified)
    .pipe(gulp.dest('./dist'));
});
```

Easy-peezy, lemon-squeezy.

### What kind of voodoo magickery is this ```vinyl-transform```?

A little bit of background: despite all the hype around [```gulpjs```](http://gulpjs.com) about it being a **streaming** build,
the ```streams``` in a gulp pipeline aren't just pure regular [NodeJS Stream class](nodejs.org/api/stream.html).

Instead, gulp pipes takes in and outputs ```vinyl``` file objects which essentially wraps around regular Stream with some more useful stuff.

So, if we want to pipe a regular Stream, for example, from [browserify.bundle()](https://github.com/substack/node-browserify#bbundlecb), into a gulp pipe, we simply need to convert the regular Stream to a ```vinyl``` file object.

And that's exactly what ```vinyl-transform``` is for; it wraps around a regular Stream and gives you a ```vinyl``` file object
that you can push into a gulp pipe. Easy-peezy, lemon-squeezy, Dean.

You can apply the same principles to other existing npm modules that supports regular Stream.
