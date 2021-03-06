// Karma configuration
// Generated on 2016-02-24

module.exports = function (config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'mocha', 'chai'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      'app/js/**/!(*spec|*mock).js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },

    reporters: ['progress', 'coverage'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'app/lib/angular/angular.js',
      'app/lib/angular-resource/angular-resource.js',
      'app/lib/angular-cookies/angular-cookies.js',
      'app/lib/ngCordova/dist/ng-cordova.js',
      'app/lib/ng-cordova-oauth/dist/ng-cordova-oauth.js',
      'app/lib/ng-cordova-oauth/dist/ng-cordova-oauth.min.js',
      'app/lib/angular-animate/angular-animate.js',
      'app/lib/angular-sanitize/angular-sanitize.js',
      'app/lib/angular-ui-router/release/angular-ui-router.js',
      'app/lib/ionic/js/ionic.js',
      'app/lib/ionic/js/ionic-angular.js',
      'app/lib/angular-mocks/angular-mocks.js',
      // endbower
      'app/js/*.js',
      'app/js/mocks/*.js',
      'app/js/{app,components}/**/*.module.js',
      'app/js/{app,components}/*.js',
      'app/js/{app,components}/**/*.js',
      'app/templates/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-ng-html2js-preprocessor',
      'karma-coverage'
    ],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};