# ```browserify vanilla flavored

This recipe shows you how to use vanilla [```browserify```](https://github.com/substack/node-browserify) (with some help from [```vinyl-transform```](https://github.com/hughsk/vinyl-transform)) and move away from using [```gulp-browserify```](https://github.com/deepak1556/gulp-browserify).

This recipe would be more familiar to current ```gulp-browserify``` who are used to using the following recipe

```javascript
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {

  return gulp.src(['./src/*.js'])
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('./dist-g'));
});
```

And here's the recipe replacing ```gulp-browserify``` with ```browswerify``` + ```vinyl-transform```

```javascript
var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  
  return gulp.src(['./src/*.js'])
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
```
Easy-peezy, lemon-squeezy.

We simply use ```vinyl-transform``` to wrap around the regular [```ReadableStream```](http://nodejs.org/api/stream.html) 
returned by ```b.bundle();```, so that we can use it down the pipeline as a vinyl file object.
```vinyl-transform``` takes care of creating both streaming and buffered vinyl file objects.

## Running the example

1. Run ```gulp```
2. Open ```index.html``` and ```index-2.html``` in a browser (Tested on Safari / Chrome).
3. Profit!

## Example details

1. There are 3 scripts in ```src``` folder
    1. ```foo.js```: a simple module that returns an array of string
    2. ```h3.js```: a script that ```require('./foo');``` and append ```<h3>``` for each string from ```foo`` to the browser document
    3. ```p.js```: a script that ```require('./foo');``` and append ```<p>``` for each string from ```foo`` to the browser document
2. Running ```gulp``` will ```browserify``` files with ```./src/*.js``` glob pattern.
    * It will create a separate bundle for each file in the ```src``` folder and write it to the ```dist``` folder.
3. ```index.html``` loads the bundled ```p.js``` script
4. ```index-2.html``` loads the bundled ```h3.js``` script

## Notes


### 61 reasons not to use ```gulp-browserify``` (or most gulp-* wrappers) and counting

The main ```browserify``` library has enough [open issues](https://github.com/substack/node-browserify/issues) at the moment (61 open issues as of 14 Aug 2014)
that it makes hard to guarantee that ```gulp-browserify``` will always be up-to-date.

In fact, since 13 March 2014, the maintainer of ```gulp-browserify``` has [stopped updating the codebase](https://github.com/deepak1556/gulp-browserify/commits/master) after being blacklisted by gulpjs.

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

### How about the pre- and post-bundle events emitted by ```gulp-browserify```? Those were really useful!
You can still achieve the same with the orginal ```browserify``` APIs:

```javascript

...

gulp.task('browserify', function () {

  var browserified = transform(function(filename) {
    var b = browserify(filename);
    
    // pre-bundle actions here
    // for eg: transform()
    b.transform(reactify)
    ...
    
    return b.bundle();
  });

  return gulp.src('./src/main.js')  // or you can try './src/*.js' to browserify every file in ./src/* as a separate bundle, it'd still work!
    .pipe(browserified)
    .pipe(uglify()) // post-bundle actions here
    .pipe(gulp.dest('./dist'));
});
```

With this, we maintain the both gulp-way and browserify-way. We can still use the idioms for browserify here for other non-gulp projects. Excellent.

### ```browserify``` excellent API documentation
One great benefit that comes with using the original ```browserify``` is the [excellent API documentation](https://github.com/substack/node-browserify).


### What kind of voodoo magickery is this ```vinyl-transform```?

A little bit of background: despite all the hype around [```gulpjs```](http://gulpjs.com) about it being a **streaming** build,
the ```streams``` in a gulp pipeline aren't just pure regular [NodeJS Stream class](nodejs.org/api/stream.html).

Instead, gulp pipes takes in and outputs ```vinyl``` file objects which essentially wraps around regular Stream with some more useful stuff.

So, if we want to pipe a regular Stream, for example, from [browserify.bundle()](https://github.com/substack/node-browserify#bbundlecb), into a gulp pipe, we simply need to convert the regular Stream to a ```vinyl``` file object.

And that's exactly what ```vinyl-transform``` is for; it wraps around a regular Stream and gives you a ```vinyl``` file object
that you can push into a gulp pipe. Easy-peezy, lemon-squeezy, Dean.

You can apply the same principles to other existing npm modules that supports regular Stream.
 


