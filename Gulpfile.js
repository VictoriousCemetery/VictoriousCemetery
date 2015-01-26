'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;
var shell = require('gulp-shell');
var sh = require('shelljs');
var when = require('gulp-if');


// the paths to our app files
var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  server: ['server/**/*.js'],
  test: ['specs/**/*.js'],
  sass: ['client/scss/**/*.scss']
};

// Compile sass
gulp.task('sass', function(done) {
  gulp.src('./client/scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./client/www/css/'))
    .pipe(sass({sourcemap: true}))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./client/www/css/'))
    .pipe(reload({stream:true}));
});

// any changes made to your
// client side code will automagically refresh your page
// with the new changes
gulp.task('browser-sync', ['serve'],function () {
  browserSync({
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

gulp.task('install', shell.task([
  'npm install',
  'bower install'
]));

gulp.task('default', ['sass', 'browser-sync'], function () {
  gulp.watch("client/scss/*.scss", ['sass']);
  gulp.watch("*.html", ['bs-reload']);
});

gulp.task('deploy', ['start']);
