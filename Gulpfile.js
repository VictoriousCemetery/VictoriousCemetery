'use strict';

var gulp      = require('gulp'),
    nodemon   = require('gulp-nodemon'),
    bs        = require('browser-sync'),
    reload    = bs.reload,
    when      = require('gulp-if'),
    shell     = require('gulp-shell');


// the paths to our app files
var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  server: ['server/**/*.js'],
  test: ['specs/**/*.js']
};

// any changes made to your
// client side code will automagically refresh your page
// with the new changes
gulp.task('start', ['serve'],function () {
  bs({
    notify: true,
    // address for server,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:5000'
  });
});

gulp.task('karma', shell.task([
  'karma start'
]));

// start our node server using foreman
gulp.task('serve', shell.task([
  'foreman run local'
]));

gulp.task('default', ['start']);