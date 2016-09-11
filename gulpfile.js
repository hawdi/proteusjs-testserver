'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const lab = require('gulp-lab');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');//during build minify files.
const process = require("process");

//check default
gulp.task('default', function() {
  console.log('gulp default is woring...');
});

//integrating gulp-nodemon to run server in dev env.
gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

//adding watcher for file change.
gulp.watch([
  'lib/**/*.json'
  ],
  function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  }
);

//setting eslint
gulp.task('lint', function() {
  return gulp.src(['lib/**/*.js',
    'test/**/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  // Brick on failure to be super strict
  .pipe(eslint.failOnError());
});

//setting test as well check lint of test files.
gulp.task('test', function () {
  return gulp.src('./test/**/*.js')
  .pipe(lab({
    args: '-v -C -c',
    opts: {
      emitLabError: true
    }
  }));
});

//minify files
gulp.task('minify', function () {
   gulp.src('./lib/config.js')
   .pipe(uglify())
   .pipe(gulp.dest('build'));
});
