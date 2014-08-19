# browserify, vanilla flavored

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
    .pipe(gulp.dest('./dist'));
});
```

And here's the recipe replacing ```gulp-browserify``` with ```browserify``` + ```vinyl-transform```

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
    2. ```h3.js```: a script that ```require('./foo');``` and append ```<h3>``` for each string from ``foo`` to the browser document
    3. ```p.js```: a script that ```require('./foo');``` and append ```<p>``` for each string from ``foo`` to the browser document
2. Running ```gulp``` will ```browserify``` files with ```./src/*.js``` glob pattern.
    * It will create a separate bundle for each file in the ```src``` folder and write it to the ```dist``` folder.
3. ```index.html``` loads the bundled ```p.js``` script
4. ```index-2.html``` loads the bundled ```h3.js``` script

## Notes


### 61 reasons not to use ```gulp-browserify``` and counting

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

That wasn't so bad, eh?

### How about the pre- and post-bundle events emitted by ```gulp-browserify```? Those were really useful!
You can still achieve the same with the original ```browserify``` APIs:

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

With this, we maintain the both gulp-way and browserify-way.

We can still use the idioms for browserify here for other non-gulp projects. Excellent.

### ```browserify``` excellent API documentation

One great benefit that comes with using the original ```browserify``` is the [excellent API documentation](https://github.com/substack/node-browserify).

 
### How about ```vinyl-source-stream``` and ```vinyl-buffer```?

If you've been shopping around for gulp recipes for ```browserify```, you'd probably would have stumbled upon recipes using 
```vinyl-source-stream```, like so:

```javascript
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

...

gulp.task('browserify', function () {

  return browserify('./src/main.js')
    .bundle().
    .pipe(source('output.js'))
    .pipe(gulp.dest('./dist-g'));
});
```

This works perfectly as it is and its works for most cases, except when:
* you want to specify a glob pattern and ```browserify``` multiple files instead of one file at a time, for eg: ```./src/**/*.js```
* you want to apply more transformation post-bundle (after ```source()```)

#### So what can you do?

For the first case, you might be able to get away with processing multiple files by doing the following

```
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('node-glob');
var _ = require('lodash');

gulp.task('browserify', function (cb) {
  
  glob('./src/**/*.js, {}, function (err, files) {
  
    var b = browserify();
    _.forEach(files, function (file) {
        b.add(file);
    });
    
    b.bundle().
      .pipe(source('output.js'))
      .pipe(gulp.dest('./dist'));
    
    cb();
  })  
});
```
This is okay, but not quite gulp-y.

Secondly, you might have tried to uglify the resulting bundle with ```gulp-uglify```, for example.

Except this does not work as well as expected when you try to run it.

```
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('node-glob');
var _ = require('lodash');
var uglify = require('gulp-uglify');

gulp.task('browserify', function (cb) {
  
  glob('./src/**/*.js, {}, function (err, files) {
  
    var b = browserify();
    _.forEach(files, function (file) {
        b.add(file);
    });
    
    b.bundle().
      .pipe(source('output.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
    
    cb();
  })  
});
```

Running ```gulp``` will spit the following error


```bash
Error in plugin 'gulp-uglify'
Streaming not supported
```

#### So what's happening here? 

Some gulp-* plugins works by taking in **buffered** vinyl files objects as input. But ```vinyl-source-stream``` emits
a **streaming** vinyl file object.
 
That's where ```vinyl-buffer``` comes in. So we simply need to convert that to a buffered vinyl by using ```vinyl-buffer```, like so

```
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var glob = require('node-glob');
var _ = require('lodash');
var uglify = require('gulp-uglify');

gulp.task('browserify', function (cb) {
  
  glob('./src/**/*.js, {}, function (err, files) {
  
    var b = browserify();
    _.forEach(files, function (file) {
        b.add(file);
    });
    
    b.bundle().
      .pipe(source('output.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
    
    cb();
  })  
});
```

Okay, so now we have a working recipe, but having to use ```glob``` and ```lodash``` module seems clunky and not very gulp-y. 

We already missed not having ```gulp.src()``` around with its glob patterns for specifying file inputs. 

Let's see what we can do about that.

#### Replacing ```vinyl-source-stream``` + ```vinyl-buffer``` with ```vinyl-transform``` and get rewarded something extra!

[```vinyl-transform```](https://github.com/hughsk/vinyl-transform) is another excellent library written by the [same
 guy](https://github.com/hughsk) who wrote ```vinyl-source-stream``` and ```vinyl-buffer```
 
Here is the recipe to achieve the same result with ```vinyl-transform```:

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
  
  return gulp.src(['./src/**/*.js']) // hello `gulp.src()` my old friend
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
```

Now ain't that purdy?

We managed to removed dependencies on ```vinyl-source-stream``` and ```vinyl-buffer```, together with ```glob``` and ```lodash```.

We now have something concise and we got our old friend, ```gulp.src()``` back in action.


#### What kind of voodoo magickery is this ```vinyl-transform```?

A little bit of background: despite all the hype around [```gulpjs```](http://gulpjs.com) about it being a **streaming** build,
the ```streams``` in a gulp pipeline aren't just regular [NodeJS Stream class](nodejs.org/api/stream.html) which normally operate on Strings and Buffers exclusivly.

Instead, gulp streams operates in [```object-mode```](http://nodejs.org/api/stream.html#stream_object_mode) which emits [```vinyl```](https://github.com/wearefractal/vinyl) file objects.

So, if we want to pipe a regular Stream, for example, from [browserify.bundle()](https://github.com/substack/node-browserify#bbundlecb), into a gulp pipe, we simply need to convert the regular text/buffer Stream to a ```vinyl``` file object

And that's exactly what ```vinyl-transform``` is for; it wraps around a regular text Stream and gives you a ```vinyl``` file object
that you can push into a gulp pipe.

You can apply the same principles to other existing npm modules that supports regular Stream to make them compatible with gulp.

#### So, what exactly are ```vinyl``` file objects?

Currently, there isn't much to the [documentation on ```vinyl```](https://github.com/wearefractal/vinyl) and gulpjs' design decision in using those over regular Stream.

Hopefully, as the ecosystem mature, we get better documentation on it (sooner than later).

For now, here are some references on ```vinyl```:
* [```vinyl``` API](https://github.com/wearefractal/vinyl)
* [```vinyl``` file objects' content works on three (3) forms: Streams, Buffers & Empty](https://github.com/gulpjs/gulp/tree/master/docs/writing-a-plugin#modifying-file-content)
* [Dealing with ```vinyl``` file streams](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md)
* [Using ```vinyl``` file buffers](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/using-buffers.md)

