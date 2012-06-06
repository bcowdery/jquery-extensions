/*global module:false*/
module.exports = function(grunt) {
    
    // project configuration
    grunt.initConfig({ 
        pkg: '<json:package.json>',
        
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'            
        },
        
        concat: {
            dist: {
                src: [ '<banner:meta.banner>', 'src/base.js', 'src/string.js', 'src/array.js', 'src/date.js', 'src/input.js', 'src.color.js' ],
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
            all: [ 'grunt.js', 'src/**/*.js', 'test/**/*.js' ]
        },
        
        watch: {
            files: '<config:lint.all>',
            tasks: 'lint qunit'
        },        
        
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
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
            mangle: { 
                except: [ 'jQuery' ] 
            }
        }
    });
        
    // default task
    grunt.registerTask('default', 'lint qunit concat min');
};