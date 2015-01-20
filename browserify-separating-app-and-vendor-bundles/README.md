#  Using browserify to bundle separate app and vendor files

A fairly simple-to-intermediate recipe of using [```browserify```](https://github.com/substack/node-browserify) to create separate bundles for you client-side app code and vendor libraries.

The goal is to organize our application build that helps with reducing build time. Continuous integration, app loading time, and all that jazz too.

## Running the example

1. Run ```bower install``` to download all bower dependencies (vendor code) into ```public/src/vendor/```
2. Run ```gulp``` to run our build
3. Run ```node app.js``` to start the server


## Example details

1. Running ```bower install``` will download ```angular``` and ```angular-ui-router``` libraries into ```public/src/vendor```.
    * The libraries will be used by the angular app [```public/src/app/app.js```](public/src/app/app.js).
    
2. Running ```gulp``` will run two tasks asynchronously:
    * ```build-vendor```: build a ```public/dist/vendor.js``` bundle containing all vendor files defined in [```bower.json```](bower.json)
    * ```build-app```: build a ```public/dist/app.js``` bundle containing code from [```public/src/app/app.js```](public/src/app/app.js) and all its dependencies, **except** for vendor libraries already bundled in ```vendor.js```.
 
3. Running ```node app.js``` will start the ExpressJS server and serve the application at http://localhost:3000
    * The app loads both ```vendor.js``` and ```app.js``` bundles. 

4. The sample Angular app (```MyApp```) is a fairly simple standalone app with enough complexity to showcase different ```require()``` dependencies
    * Requiring an external libraries managed by [```bower```](http://bower.io) as defined in ```bower.json```, for example: ```require('angular');```
    * Requiring a vanilla npm-managed module, for example: ```var _ = require('lodash');```
    * Requiring a relative file that has exported a module, for example: ```require('./controllers');```
    

## Notes

### Recipe dependencies

This recipe depends on a number of modules to wire this all up together:

* [```browserify```](https://github.com/substack/node-browserify): yes, the original library
* [```vinyl-source-stream```](https://github.com/hughsk/vinyl-source-stream): to allow the use of the vanilla browserify (see: [browserify-vanilla](../browserify-vanilla) example)
* [```bower-resolve```](https://github.com/eugeneware/bower-resolve): to resolve bower package ids to its full path (for eg: from ```'angular'``` to ```'public/src/vendor/angular/angular.js'```) which we need to bundle into ```vendor.js```
* [```resolve```](https://github.com/substack/node-resolve): to resolve npm-managed modulesids to its full path (for eg: from ```'lodash'``` to ```'node_modules/lodash/lodash.js'```) which we need to bundle into ```vendor.js```
* [```lodash```](http://github.com/lodash/lodash): just so we can bundle an npm module
* ```angular``` and ```angular-ui-router```: just so we can bundle bower-managed modules
* ```fs```: to read ```bower.json```


### Background: Code organization and build strategies

Why have separate bundles? One word: sanity levels.

Let's say we have the following Angular web application, with complex dependencies 
on a number of libraries managed using Bower (angular, angular-resource, angular-ui-router etc).

```
public/
    '- src/
    '   '- app/
    '   '   '- ...      // our client-side angular app code goes here
    '   '- vendor/
    '       '- ...      // bower-managed libraries goes here
    '- index.html       // our angular app root page
node_modules/           // npm-managed libraries here
    '- ...      
```


#### The most obvious and naive strategy

A fairly naive way of bundling our client-side code would be to bundle it all up in one big ```app.js``` file with
all of its dependencies.

This would work out fine for a fairly small to medium-sized project. Building the bundle would maybe take a second, 2 seconds, tops.

Once the project gets larger and have more dependencies, that adds to the build time everytime there is a change to the codebase.

Every second it takes to build the bundle affects your sanity as a developer.


#### A better strategy

A different strategy would be to decompose our codebase into smaller modular pieces.

In this case, we can start off by separating our client-side codebase into application code and vendor code.

**Application code:**
* has frequent changes which requires a re-build for every change.
* uses common shared dependencies that are separate from application code.

**Vendor code:**
* are maintained separately by its vendor.
* no reason to be changed frequently once added as a dependency, except to update it to a later version, at which point we can re-build on-demand.
* is a common library used by possibly multiple applications.
* eg: lodash, jQuery, Angular, reactjs etc

With the above strategy, within a project's lifetime, we'd be changing and re-building the application code much, much
more frequently than we'd need to rebuild the vendor code.

Our build time would be reduced since the application codebase is typically smaller than vendor code.

We get to keep our sanity within healthy levels.

#### An even more extreme strategy

But what happens when the application codebase gets larger, and even just building the application code is taking a second too long?

Thats when you need to re-look into how your codebase are organized and start pulling out shared modules and make them a separate bundle:
* a separate bundle for each application code module that is shared by other application code.
* a separate bundle for each vendor code for scenarios where some application module only need one of the vendor libraries

It's basically the same principles, except taken towards the extreme end. This would require implementing a more fine grain build strategy.

## Why not use ```watchify```?
(Feel free to correct me if I'm wrong or if there is a better way to look at this)

I haven't been using [```watchify```](https://github.com/substack/watchify) as much since it seems to be more suited for optimization use-cases where you have single huge bundle that you can't decompose into separate modules anymore. 

And you still want to have small incremental builds instead of building the entire bundle that takes a considerable amount of time to build each time.

We can still use ```watchify``` for the other two strategies (multiple bundles) where we have one ```watchify``` task for each bundle we want to create. 

For example, if we were to update our recipe and use ```watchify```:
* one ```watchify``` task for building ```vendor.js``` where it watches changes in ```bower.json``` or the ```public/src/vendor/**/*.js```
* one ```watchify``` task for building ```app.js``` where it watches changes in ```public/src/app/app.js```

The result of this is that we can have an even smaller build times since watchify helps us to only build the changes that are needed.


### Reducing app loading time

* Single bundle `app.js`: 

Everytime you redeploy your app in production, the `app.js` file has normally changed. Thus all clients must redownload that whole big file.

* Two bundle `vendor.js` and `app.js`: 

Everytime you redeploy your app in production, the `vendor.js` file has may not changed (unless you updated your app dependencies). Browser caching can kicks in thanks to ETags.`app.js` will however always be reloaded.


If you want better app loading times after a new production deployment of your app, and optimise the browser caching abilities, use this bundle splitting strategy. It can have an impact on user experience if your app is big and you redeploy it often.


