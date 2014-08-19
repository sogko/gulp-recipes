# Unnecessary wrapper gulp-* plugins

We will do something different here and have a recipe for each ```gulp-*```  plugin that simply wraps around an existing NodeJS library.

There are ```gulp-*`` plugins that are 
* well-written
* well-maintained
* fills up a void in the gulp ecosystem
* actually add something of value

Meanwhile, there are some that can simply be replaced with a gulp recipe, with the help of some utility libraries to glue them together.

Unfortunately, these plugins come with additional overhead: an extra GitHub repository, npm module, maintainer, tests, semantics, etc.
It's much simpler in this case to use the original module directly where you can, which is what vinyl-source-stream handles for you.

## Why should we embrace existing NodeJS libraries?

(wip)

Sometimes this boil downs to a matter perspective, personal preference and what you are willing (or unwilling) to sacrifice


For reasons why existing NodeJS libraries should be embraced over thin wrapper plugins, read the following articles for some insight:
* [Why you shouldn’t create a gulp plugin (or, how to stop worrying and learn to love existing node packages)](http://blog.overzealous.com/post/74121048393/why-you-shouldnt-create-a-gulp-plugin-or-how-to-stop)
* [gulp + browserify, the gulp-y way](http://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623)

Of course, this is just an opinion on the subject.

## Error handling

(wip)

## List of useful utility libraries (gulp glues)

Sometimes, what you need is just a little utility or two to cook up your perfect gulp recipe.

* [vinyl-transform](https://github.com/hughsk/vinyl-transform): Great for libraries that work on a ```filename``` and returns a ReadableStream (e.g: ```browserify```) 
* [vinyl-map](https://github.com/hughsk/vinyl-map):  Perfect for libraries that work on a ```filename``` and/or its ```buffer``` content and returns a string output (e.g: ```clean-css```)
* [vinyl-source-stream](https://github.com/hughsk/vinyl-source-stream): Just the thing you need to convert [a regular NodeJS ReadableStream](http://nodejs.org/api/stream.html) to a gulp stream that emits streaming [```vinyl```](https://github.com/wearefractal/vinyl) file objects
* [vinyl-buffer](https://github.com/hughsk/vinyl-buffer): Usually paired with ```vinyl-source-stream```, this library converts your **streaming** vinyl file objects (which you get from ```vinyl-source-stream```) to a **buffered** form (which most gulp pipes usually work on)
* [gulp-concat](https://github.com/wearefractal/gulp-concat): Need to concatenate a bunch of input files into a single output file? This is the tool for you. 

## List of gulp-y recipes for each wrapper plugins 

| Wrapper plugin      | Original library        | Gulp recipe       | Glue(s)     | Note(s)     |
| :------------------ | :---------------------- | :---------------- | :---------- | :------------ |
| [gulp-browserify](https://github.com/deepak1556/gulp-browserify) | [browserify](https://github.com/substack/node-browserify) | [browserify.js](browserify.js) | [vinyl-transform](https://github.com/hughsk/vinyl-transform)| \- |
| [gulp-minify-css](https://github.com/jonathanepollack/gulp-minify-css) | [clean-css](https://github.com/GoalSmashers/clean-css) | [clean-css.js](clean-css.js) | [vinyl-map](https://github.com/hughsk/vinyl-map)| \- |
| [gulp-clean-css](https://github.com/radmen/gulp-clean-css) | [clean-css](https://github.com/GoalSmashers/clean-css) | [clean-css.js](clean-css.js) | [vinyl-map](https://github.com/hughsk/vinyl-map)| \- |
| [gulp-cleancss](https://github.com/mgcrea/gulp-cleancss) | [clean-css](https://github.com/GoalSmashers/clean-css) | [clean-css.js](clean-css.js) | [vinyl-map](https://github.com/hughsk/vinyl-map)| \- |
| [gulp-cssmin](https://github.com/chilijung/gulp-cssmin) | [clean-css](https://github.com/GoalSmashers/clean-css) | [clean-css.js](clean-css.js) | [vinyl-map](https://github.com/hughsk/vinyl-map)| \- |
| [gulp-uglify](https://github.com/terinjokes/gulp-uglify) | [uglify-js](https://github.com/mishoo/UglifyJS2) | [uglify-js.js](uglify-js.js) | [vinyl-map](https://github.com/hughsk/vinyl-map) & [gulp-concat](https://github.com/wearefractal/gulp-concat)| \- |
| [gulp-rimraf](https://github.com/robrich/gulp-rimraf) | [rimraf](https://github.com/isaacs/rimraf) | [del.js](del.js) | *none* | ```rimraf``` does not support glob patterns; use ```del``` instead. <br/> Credits: [delete-files-folder](https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md) |
| [gulp-clean](https://github.com/peter-vilja/gulp-clean) | [rimraf](https://github.com/isaacs/rimraf) | [del.js](del.js) | *none* | ```rimraf``` does not support glob patterns; use [```del```](https://github.com/sindresorhus/del) instead. <br/> Credits: [delete-files-folder](https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md)<br/> |