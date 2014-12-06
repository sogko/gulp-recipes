#  browser-sync + nodemon + expressjs

A gulp recipe using vanilla [```browser-sync```](https://github.com/shakyShane/browser-sync) and [```gulp-nodemon```](https://github.com/JacksonGariety/gulp-nodemon) to run an ExpressJS server app with live-reloading.

With the combination of these two, we can achieve the following use-cases:
* Inject changes into loaded page, when CSS or images are modified, without reloading the whole page.
* Reload page when affected files are modified (HTML, partials, client-side JavaScript code).
* Restart server when core server files are modified.

## Running the example

Run ```gulp``` to start

## Example details

1. Running ```gulp``` will start two server applications:
    * Our vanilla ExpressJS server at http://localhost:3000
    * A proxied version of our ExpressJS server at http://localhost:4000 (This will be connected to ```browser-sync```)
2. To see ```browser-sync``` + ```nodemon``` working together:
    * Edit ```public/style.css``` to see ```browser-sync``` injecting changed css into page without reloading page
    * Edit ```public/index.html``` to see ```browser-sync``` reloading browser upon change
    * Edit ```public/main.js``` to see ```browser-sync``` reloading browser upon change
    * Edit ```app.js``` to see ```nodemon``` restarting server and ```browser-sync``` reloading page upon page

## Notes

### [BS] [ERROR] Proxy address not reachable. Is your server running?

Running an older version of ```gulp``` may show the following output

```
[03:06:27] Using gulpfile ~/sogko/gulp-recipes/expressjs-browser-sync-nodemon/gulpfile.js
[03:06:27] Starting 'nodemon'...
[gulp] [nodemon] v1.2.1
[gulp] [nodemon] to restart at any time, enter `rs`
[gulp] [nodemon] watching: app.js
[gulp] [nodemon] starting `node app.js`
[03:06:27] Finished 'nodemon' after 19 ms
[03:06:27] Starting 'browser-sync'...
[03:06:27] Finished 'browser-sync' after 7.96 ms
[03:06:27] Starting 'default'...
[03:06:27] Finished 'default' after 7.63 μs
[BS] Proxying: http://localhost:3000
[BS] Now you can access your site through the following addresses:
[BS] Local: >>> http://localhost:4000
[BS] External: >>> http://192.168.1.1:4000

[BS] [ERROR] Proxy address not reachable. Is your server running?
Express server started on port 3000 at 127.0.0.1

...

```

The output shows a ```[BS] [ERROR] Proxy address not reachable. Is your server running?``` error but 
other than that, everything else seems to work (both injection and reload).

Nonetheless, I've raised an issue at https://github.com/shakyShane/gulp-browser-sync/issues/25

