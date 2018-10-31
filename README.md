# gulp-recipes

## Notes:
__Updates as of 20 March 2016__: I had originally created this so that those in the Gulp community would be able help each other find solutions to common use cases. I have since moved away from Gulp to Webpack for most of my work, and have not been actively participating in Gulp's latest activities _(I'm not knocking on Gulp; it is still a useful tool. Webpack just works well for my case)._

Some (most? or all?) of the recipes in this repo have not been updated for a while, and may not work as expected.
But I do hope that those in the Gulp community still help each other grow, and I'd be very happy to accept PRs for any existing or new recipes. Or even a new maintainer =)

---

<p align="center">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
</p>

Not your typical collection of [gulp](http://gulpjs.com) recipes for your streaming build.

Rather than having a big ol' ```gulpfile.js``` with a ton of ```gulp.task()```s each recipe:
* is a standalone folder
* has its own ```gulpfile.js``` and minimal set of ```gulp.task()```s
* has a healthy pinch of comments
* comes along with real examples that you can ```gulp``` to see it in action
* has a big serving of ```README.md``` included!

Simply ```cd``` to a recipe folder, ```gulp``` and slurp away.

## Motivations

* Enough with the plugins wrapping over an existing library, created just for convenience's sake.
* Vanilla node modules over wrappers.
* If an existing library can be `vinyl`ed, `tap`ped, `plumber`ed, transformed from/to buffers and/or streams, let there be a recipe for it.
* A lot of recipe snippets laying around the web; most are working off the bat. Some need a little bit more pizzazz. And pizzas.


## Recipes

* [```browser-sync-nodemon-expressjs```](browser-sync-nodemon-expressjs)
<br/>How to use ```browser-sync``` + ```gulp-nodemon``` to serve an ExpressJS app for live-reloaded development.

* [```browserify-vanilla```](browserify-vanilla)
<br/>How to use vanilla ```browserify``` and stop using ```gulp-browserify```.

* [```browserify-separating-app-and-vendor-bundles```](browserify-separating-app-and-vendor-bundles)
<br/>How to use vanilla ```browserify``` (and its friends) to separate codebase into multiple bundles for better build times.

* [```unnecessary-wrapper-gulp-plugins```](unnecessary-wrapper-gulp-plugins)
<br/>A list of gulp-y recipes for unnecessary wrapper `gulp-*` plugins 

## Quick Start

**Prerequisites**

```bash
npm install -g gulp
```

**Install**

```bash
git clone https://github.com/sogko/gulp-recipes
cd gulp-recipes
[sudo] npm install # some modules require sudo to install on some machines
```

**Running a recipe example**

For eg: [```browser-sync-nodemon-expressjs```](browser-sync-nodemon-expressjs)

```bash
cd browser-sync-nodemon-expressjs
gulp
```

## Other recipe collections / recipes

* [A collection of recipes maintained by ```gulpjs```](https://github.com/gulpjs/gulp/tree/master/docs/recipes)
* [A couple of excellent recipes in CoffeeScript maintained by ```Kagami```](https://github.com/Kagami/gulp-recipes)

## Contribution
All are most welcome! Pull requests, issues, contributors and snacks, bring 'em to the party!

## Credits
You

## License
MIT
