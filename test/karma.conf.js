'use strict';

var istanbul = require('browserify-istanbul');
var isparta  = require('isparta');
var debowerify = require('debowerify');

module.exports = function(config) {

    config.set({

        basePath: '../',
        frameworks: ['jasmine', 'browserify'],
        preprocessors: {
            'app/**/*.js': ['babel', 'browserify', 'coverage']
        },
        browsers: ['Chrome'],
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'text',
            dir: 'coverage/',
            file: 'coverage.txt'
        },

        browserDisconnectTimeout: 30000,

        autoWatch: true,

        browserify: {
            debug: true,
            transform: [
                'bulkify',
                debowerify,
                istanbul({
                    instrumenter: isparta,
                    ignore: ['**/non_bower_components/**',
                            '**/bower_components/**',
                            '**/node_modules/**',
                            '**/test/**'
                    ]
                })
            ]
        },

        proxies: {
            '/': 'http://localhost:9876/'
        },

        urlRoot: '/__karma__/',

        files: [
            // app-specific code
            'app/main.js',

            // 3rd-party resources not included in main already
            './bower_components/angular-mocks/angular-mocks.js',

            // test files
            'test/unit/**/*.js'
        ]
    });
};
