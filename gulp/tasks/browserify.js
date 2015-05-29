'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var buffer       = require('vinyl-buffer');
var streamify    = require('gulp-streamify');
var watchify     = require('watchify');
var browserify   = require('browserify');
var babelify     = require('babelify');
var uglify       = require('gulp-uglify');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var debowerify   = require('debowerify');
//var browserifyShim   = require('browserify-shim');

var ngAnnotate   = require('browserify-ngannotate');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

    var bundler = browserify({
        entries: config.browserify.entries,
        insertGlobals: true,
        debug: !global.isProd,
        cache: {},
        packageCache: {},
        fullPaths: true
    }, watchify.args);

    if ( !global.isProd ) {
        bundler = watchify(bundler);
        bundler.on('update', function() {
            rebundle();
        });
    }

    // with babel you get ES2015 syntax without having to wait for browser support.
    // But there is no need to transform the bower components options from: https://github.com/babel/babelify
    bundler.transform(babelify.configure({
        ignore: /(bower_components)|(non_bower_components)|(node_modules)/
    }));

    var transforms = [
        debowerify,
        //browserifyShim,
        ngAnnotate,
        'brfs',
        'bulkify'
    ];

    transforms.forEach(function(transform) {
        bundler.transform(transform);
    });

    function rebundle() {
        var stream = bundler.bundle();
        var createSourcemap = global.isProd && config.browserify.sourcemap;

        gutil.log('Rebundle...');
        gutil.log('createSourcemap...' + createSourcemap);

        return stream.on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulpif(createSourcemap, buffer()))
            .pipe(gulpif(createSourcemap, sourcemaps.init()))
            .pipe(gulpif(global.isProd, streamify(uglify({
                compress: { drop_console: true }
            }))))
            .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
            .pipe(gulp.dest(config.scripts.dest))
            .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
    }

    return rebundle();

}

gulp.task('browserify', function() {

    return buildScript('main.js');

});
