'use strict';

module.exports = {

    'serverport': 3000,

    'styles': {
        'src' : 'app/assets/styles/**/*.scss',
        'dest': 'build/assets/css'
    },

    'scripts': {
        'src' : 'app/**/*.js',
        'dest': 'build/js'
    },

    'images': {
        'src' : 'app/assets/images/**/*',
        'dest': 'build/assets/images'
    },

    'fonts': {
        'src' : ['app/fonts/**/*', 'bower_components/bootstrap-sass/assets/fonts/**'],
        'dest': 'build/assets/fonts'
    },

    'views': {
        'watch': [
            //'app/index.html',
            //'app/views/**/*.html'
            'app/**/*.html'
        ],
        'src': 'app/**/!(index).html',
        //'src': 'app/views/**/*.html',
        'dest': 'app'
    },

    'gzip': {
        'src': 'build/**/*.{html,xml,json,css,js,js.map}',
        'dest': 'build/',
        'options': {}
    },

    'dist': {
        'root'  : 'build'
    },

    'browserify': {
        //'entries'   : ['./app/js/main.js'],
        'entries'   : ['./app/main.js'],
        'bundleName': 'main.js',
        'sourcemap' : false
    },

    'test': {
        'karma': 'test/karma.conf.js',
        'protractor': 'test/protractor.conf.js'
    },

    //'server':{
    //    'forwardOn':'/api',
    //    'forwardToHost' : 'localhost:8080',
    //    'forwardToHostPath': ''
    //}
	 
	 'server':{
        'forwardOn':'/api',
        'forwardToHost' : 'star-force.se',
        'forwardToHostPath': '/api'
    }
	
};
