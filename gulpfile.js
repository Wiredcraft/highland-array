require('should');

var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

// Compile coffee scripts.
gulp.task('coffee', function() {
    return gulp.src('./src/*.coffee')
        .pipe(coffee({
            bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

// Run tests.
gulp.task('mocha', ['coffee'], function() {
    return gulp.src('./test/*.mocha.js')
        .pipe(mocha({
            reporter: 'spec'
        }));
});

// Run jshint.
gulp.task('jshint', function() {
    return gulp.src('./test/*.mocha.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default', ['coffee', 'mocha', 'jshint']);
