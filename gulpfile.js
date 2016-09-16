'use strict';

var gulp      = require('gulp'),
 browserify   = require('browserify'),
 uglify       = require('gulp-uglify'),
 rename       = require('gulp-rename'),
 sass         = require('gulp-sass'),
 maps         = require('gulp-sourcemaps'),
 source       = require('vinyl-source-stream');

var packageJSON = require('./package.json'),
  dependencies  = Object.keys(packageJSON && packageJSON.dependencies || {});


var project = {
  scripts: {
    inputFile: 'src/scripts/app.js',
    outputFolder: __dirname + '/public/scripts',
    vendorScript: 'vendor.bundle.js',
    appScript: 'app.bundle.js'
  },
  styles: {
    inputFile: 'src/styles/app.scss',
    outputFolder: __dirname + '/public/styles'
  },
  watch: {
    scripts: 'src/scripts/**',
    styles: 'src/styles/*.scss'
  }
};

gulp.task('vendors', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source(project.scripts.vendorScript))
    .pipe(gulp.dest(project.scripts.outputFolder));
});

gulp.task('app', function() {
  return browserify({
    debug: true,
    entries: project.scripts.inputFile
    })
    .external(dependencies)
    .bundle()
    .pipe(source(project.scripts.appScript))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(project.scripts.outputFolder));
});

gulp.task('compileSass', function() {
  return gulp.src(project.styles.inputFile)
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(project.styles.outputFolder));
});

gulp.task('watch', function() {
  gulp.watch(project.watch.scripts, ['app']);
  gulp.watch(project.watch.styles, ['compileSass']);
});

gulp.task('serve', ['vendors', 'app', 'compileSass', 'watch']);
