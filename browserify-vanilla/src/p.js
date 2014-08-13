'use strict';

// require another module relative to current module
var foo = require('./foo.js');

// require a vanilla node module managed by npm
var _ = require('lodash');

_.forEach(foo(), function (f) {
  // create a <p> tag for each f and add to html body
  var p = document.createElement('p');
  p.innerHTML = f;
  if (document.body != null) {
    document.body.appendChild(p);
  }

});
