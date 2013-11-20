/**
 * This file is using javascript testing for a PHP transformation to prepare for a node.js future.
 */

/*jshint node:true*/
"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        php: {
            server: {
                options: {
                    port: 8111
                }
            },
            test: {
                options: {
                    port: 8000,
                    hostname: '127.0.0.0',
                    bin: 'php'
                }
            }
        },
        jasmine: {
            test: {
                src: 'src/js/**/*.js',
                options: {
                    specs: 'test/spec/*.js',
                    helpers: ['test/util/*.js', 'test/lib/*.js'],
                    host: 'http://127.0.0.1:8000/',
                    keepRunner: true
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('server', ['php:server:keepalive']);
    grunt.registerTask('test', ['php:test', 'jasmine']);
    grunt.registerTask('default', ['test']);
};
