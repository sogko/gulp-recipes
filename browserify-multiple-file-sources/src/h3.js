'use strict';

// require another module relative to current module
var foo = require('./foo.js');

// require a vanilla node module managed by npm
var _ = require('lodash');

_.forEach(foo(), function (f) {
  // create a <h3> tag for each f and add to html body
  var h3 = document.createElement('h3');
  h3.innerHTML = f;
  if (document.body != null) {
    document.body.appendChild(h3);
  }

});
