require('should');

var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var mocha = require('gulp-mocha');

// Compile coffee.
gulp.task('coffee', function() {
    return gulp.src('./src/*.coffee')
        .pipe(coffee({
            bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

// Run tests.
gulp.task('mocha', ['coffee'], function() {
    return gulp.src('./test/*.mocha.js').pipe(mocha({
        reporter: 'spec'
    }));
});

gulp.task('default', ['coffee', 'mocha']);
