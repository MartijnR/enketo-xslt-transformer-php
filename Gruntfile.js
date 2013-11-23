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
                    port: 8000
                }
            }
        },
        jasmine: {
            test: {
                src: 'src/js/**/*.js',
                options: {
                    specs: 'test/spec/**/*.js',
                    helpers: ['test/util/**/*.js', 'test/lib/jquery-xpath/jquery.xpath.js'],
                    host: 'http://127.0.0.1:8000/',
                    keepRunner: true,
                    vendor: ['http://codeorigin.jquery.com/jquery-2.0.3.min.js']
                }
            }
        },
        prep: {
            xforms: {
                src: 'test/form/*.xml',
                dest: 'test/util/xforms.util.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerMultiTask('prep', 'Preparing stuff', function() {
        var dest, forms = [],
            content = "// Dynamically created by grunt prep:xforms\r\n\r\nvar xforms = [\r\n\t\"";

        this.files.forEach(function(xform) {
            xform.src.filter(function(filePath) {
                grunt.log.writeln('adding: ' + filePath);
                forms.push(filePath);
                //xformArrayStr += "\t\"" + filePath + "\",\r\n";
            });
            dest = xform.dest;
        });

        content += forms.join("\",\r\n\t\"") + "\"\r\n];\r\n";
        grunt.file.write(dest, content);
        grunt.log.writeln("created " + dest + " with " + forms.length + " XForms");
    });

    grunt.registerTask('server', ['php:server:keepalive']);
    grunt.registerTask('test', ['prep:xforms', 'php:test', 'jasmine']);
    grunt.registerTask('default', ['test']);
};
