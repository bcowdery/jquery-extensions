/*
* jQuery Extensions

* https://github.com/bcowdery/jquery-extensions
*
* Copyright (c) 2012 Brian Cowdery
* Dual licensed under the MIT & GPL v2 licenses.
*/

/*global module:false*/
module.exports = function(grunt) {
    
    // project configuration
    grunt.initConfig({ 
        pkg: '<json:package.json>',
        
        meta: {
            banner: '/*! \n' +
                    ' * <%= pkg.title %> - v<%= pkg.version %> \n' +
                    ' * \n' +
                    '<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
                    ' * \n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n' +
                    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n' +
                    ' * \n' +
                    ' * Date: <%= grunt.template.today("dddd mmmm dS, yyyy") %> \n' +
                    ' */'
        },
        
        concat: {
            dist: {
                src: [ '<banner:meta.banner>', 'src/intro.js', 'src/base.js', 'src/array.js', 'src/string.js', 'src/date.js', 'src/input.js', 'src/color.js', 'src/outro.js' ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
                
        min: {
            dist: {
                src: [ '<banner:meta.banner>', '<config:concat.dist.dest>' ],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
                                
        qunit: {
            all: [ 'test/**/*.html' ]
        },
        
        lint: {
            beforeconcat: [ 'grunt.js', 'src/base.js', 'src/array.js', 'src/string.js', 'src/date.js', 'src/input.js', 'src.color.js', 'test/**/*.js' ],
            afterconcat: [ '<config:concat.dist.dest>' ]            
        },
        
        watch: {
            files: '<config:lint.all>',
            tasks: 'lint:beforeconcat qunit'
        },        
        
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: false,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true
            }
        },
        
        uglify: { 
        }
    });
        
    // default task
    grunt.registerTask('default', 'lint:beforeconcat qunit concat lint:afterconcat min');
};