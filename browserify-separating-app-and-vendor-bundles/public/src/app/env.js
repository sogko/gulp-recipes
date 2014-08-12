/**
 * Angular app environment settings
 */
'use strict';

module.exports = {

  // root application name; all ng-modules for this app will be put underneath this namespace
  appName: 'MyApp',

  // set base template/partials dir
  baseTemplateDir: '/src/app/partials/',

  // helper function to get full template path
  templatePath: function (view) { return [this.baseTemplateDir, view].join(''); }

};
