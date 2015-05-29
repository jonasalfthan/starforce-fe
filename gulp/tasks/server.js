'use strict';

var config  = require('../config');
var http    = require('http');
var express = require('express');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var morgan  = require('morgan');
var proxy = require('express-http-proxy');

gulp.task('server', function() {

    var server = express();

    // log all requests to the console
    server.use(morgan('dev'));
    server.use(express.static(config.dist.root));
    server.use(config.server.forwardOn, proxy(config.server.forwardToHost, {
        forwardPath: function(req, res) {
            return require('url').parse(config.server.forwardToHostPath +  req.url).path;
        }
    }));


    // Serve index.html for all routes to leave routing up to Angular
    server.all('/*', function(req, res) {
        res.sendFile('index.html', { root: 'build' });
    });

    // Start webserver if not already running
    var s = http.createServer(server);
    s.on('error', function(err){
        if(err.code === 'EADDRINUSE'){
            gutil.log('Development server is already started at port ' + config.serverport);
        }
        else {
            throw err;
        }
    });

    s.listen(config.serverport);

});