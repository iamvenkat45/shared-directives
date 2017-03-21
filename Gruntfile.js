/*jslint node: true */
'use strict';

var pkg = require('./package.json');
var path = require('path');
var glob = require('glob');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function(fileTypePatterns) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
    var ignore = ['node_modules', 'bower_components', 'dist', 'temp'];
    var fs = require('fs');
    return fs.readdirSync(process.cwd())
        .map(function(file) {
            if (ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 || !fs.lstatSync(file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function(pattern) {
                    return file + '/**/' + pattern;
                });
            }
        })
        .filter(function(patterns) {
            return patterns;
        })
        .concat(fileTypePatterns);
};

module.exports = function(grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var bowerJSON = require('./bower.json'),
        packageJSON = require('./package.json'),
        env = process.env,
        gruntOptionType = grunt.option('type'),
        meta = {
            name: packageJSON.name,
            version: packageJSON.version,
            time: '<%= grunt.template.today("UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'") %>',
            buildBy: env.USERNAME,
            repository: packageJSON.repository.url
        },
        appConfig = {
            app: bowerJSON.appPath || 'app',
            moduleName: bowerJSON.moduleName,
            packageJSON: packageJSON,
            bowerJSON: bowerJSON,
            meta: meta,
            dist: 'dist',
        };

    // Project configuration.
    grunt.initConfig({

        //Project Settings
        appConfig: appConfig,

        connect: {
            main: {
                options: {
                    port: 9001
                }
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true,
                    livereloadOnError: false,
                    spawn: false
                },
                files: [createFolderGlobs(['*.js', '*.less', '*.html']), '!_SpecRunner.html', '!.grunt'],
                tasks: [] //all the tasks are run dynamically during the watch event handler
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                src: [createFolderGlobs('*.js'), '!src/_templates/**.*']
            }
        },
        clean: {
            before: {
                src: ['dist', 'temp']
            },
            after: {
                src: ['temp', '.tmp']
            }
        },
        less: {
            production: {
                options: {},
                files: {
                    'temp/app.css': 'app.less'
                }
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: pkg.name,
                    htmlmin: '<%= htmlmin.main.options %>'
                },
                src: [createFolderGlobs('*.html'), '!index.html', '!_SpecRunner.html'],
                dest: 'temp/templates.js'
            }
        },
        copy: {
            main: {
                files: [{
                        src: ['images/**'],
                        dest: 'dist/'
                    }, {
                        src: ['Bootstrap/**', 'fonts/**','rms-help/**'],
                        dest: 'dist/'
                    }, {
                        src: ['bower_components/font-awesome/fonts/**'],
                        dest: 'dist/',
                        filter: 'isFile',
                        expand: true
                    }, {
                        src: ['bower_components/bootstrap/fonts/**'],
                        dest: 'dist/',
                        filter: 'isFile',
                        expand: true
                    }, {
                        src: ['env.js', 'logout.html', 'event-agreement.html', 'reset.json'],
                        dest: 'dist/',
                        filter: 'isFile',
                        expand: true
                    }, {
                        expand: true,
                        cwd: '.tmp',
                        src: "build.json",
                        dest: 'dist/'
                    }
                    //{src: ['bower_components/angular-ui-utils/ui-utils-ieshiv.min.js'], dest: 'dist/'},
                    //{src: ['bower_components/select2/*.png','bower_components/select2/*.gif'], dest:'dist/css/',flatten:true,expand:true},
                    //{src: ['bower_components/angular-mocks/angular-mocks.js'], dest: 'dist/'}
                ]
            }
        },
        dom_munger: {
            read: {
                options: {
                    read: [{
                        selector: 'script[data-concat!="false"]',
                        attribute: 'src',
                        writeto: 'appsjs'
                    }, {
                        selector: 'link[rel="stylesheet"][data-concat!="false"]',
                        attribute: 'href',
                        writeto: 'appcss'
                    }]
                },
                src: 'index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append: [{
                        selector: 'head',
                        html: '<script src="env.js"></script>'
                    }, {
                        selector: 'head',
                        html: '<link rel="stylesheet" href="app.full.min.css">'
                    }, {
                        selector: 'body',
                        html: '<script src="app.full.min.js"></script>'
                    }]
                },
                src: 'index.html',
                dest: 'dist/index.html'
            }
        },
        cssmin: {
            main: {
                src: ['temp/app.css', '<%= dom_munger.data.appcss %>'],
                dest: 'dist/app.full.min.css'
            }
        },
        concat: {
            main: {
                src: ['<%= dom_munger.data.appsjs %>', '<%= ngtemplates.main.dest %>'],
                dest: 'temp/app.full.js'
            }
        },
        ngAnnotate: {
            main: {
                src: 'temp/app.full.js',
                dest: 'temp/app.full.js'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',
                dest: 'dist/app.full.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        //Imagemin has issues on Windows.
        //To enable imagemin:
        // - "npm install grunt-contrib-imagemin"
        // - Comment in this section
        // - Add the "imagemin" task after the "htmlmin" task in the build task alias
        // imagemin: {
        //   main:{
        //     files: [{
        //       expand: true, cwd:'dist/',
        //       src:['**/{*.png,*.jpg}'],
        //       dest: 'dist/'
        //     }]
        //   }
        // },
        karma: {
            options: {
                frameworks: ['jasmine'],
                preprocessors: {
                    '**/*.html': 'ng-html2js'
                },
                ngHtml2JsPreprocessor: {
                    moduleName: 'templates'
                },
                files: [ //this files data is also updated in the watch handler, if updated change there too
                    '<%= dom_munger.data.appjs %>',
                    'bower_components/angular-mocks/angular-mocks.js',
                    createFolderGlobs(['*-spec.js', '*.html'])
                ],
                logLevel: 'ERROR',
                reporters: ['mocha'],
                autoWatch: false, //watching is handled by grunt-contrib-watch
                singleRun: true
            },
            all_tests: {
                browsers: ['Chrome']
            },
            during_watch: {
                browsers: ['PhantomJS']
            }
        },
        /* jshint camelcase: false*/
        json_generator: {
            /* jshint camelcase: true*/
            target: {
                dest: '.tmp/build.json',
                options: {
                    appName: '<%= appConfig.meta.name %>',
                    version: '<%= appConfig.meta.version %>',
                    repository: '<%= appConfig.meta.repository %>',
                    buildTime: '<%= appConfig.meta.time %>',
                    buildBy: '<%= appConfig.meta.buildBy %>',
                    dependencies: '<%= appConfig.bowerJSON.dependencies %>'
                }
            }
        },
        homePath: process.env,

        // Make sure code styles are up to par
        jscs: {
            options: {
                config: '.jscsrc',
                // fix: true,
                force: false
            },
            all: {
                src: ['app.js', 'env.js', './src/pages/**/*.js', './src/services/**/*.js', './src/common/**/*.js']
            }
        }
    });

    grunt.registerTask('build', [
        'jshint',
        'clean:before',
        'less',
        'dom_munger',
        'ngtemplates',
        'cssmin',
        'concat',
        'ngAnnotate',
        'uglify',
        'json_generator',
        'copy',
        'htmlmin',
        'clean:after'
    ]);

    grunt.registerTask('serve', [
        'dom_munger:read',
        'jshint',
        'connect',
        'watch'
    ]);

    grunt.registerTask('test', [
        'dom_munger:read',
        'karma:all_tests'
    ]);

    grunt.registerTask('getInfo', 'write', function() {
        var val = grunt.config('homePath');
        console.log(val);
    });

    grunt.event.on('watch', function(action, filepath) {
        //https://github.com/gruntjs/grunt-contrib-watch/issues/156

        var tasksToRun = [];

        if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

            //lint the changed js file
            grunt.config('jshint.main.src', filepath);
            tasksToRun.push('jshint');

            //find the appropriate unit test and html file for the changed file
            var spec, html;
            if (filepath.lastIndexOf('-spec.js') === -1 || filepath.lastIndexOf('-spec.js') !== filepath.length - 8) {
                spec = filepath.substring(0, filepath.length - 3) + '-spec.js';
                // html = filepath.substring(0, filepath.length - 3) + '.html';
            } else {
                spec = filepath;
                // html = filepath.substring(0, filepath.length - 8) + '.html';
            }

            //if the spec exists then lets run it
            if (grunt.file.exists(spec)) {
                var files = ['env.js'].concat(grunt.config('dom_munger.data.appjs'));
                files.push('bower_components/angular-mocks/angular-mocks.js');
                files.push(spec);

                // add all html files in the same dir
                var htmlGlob = path.join(path.dirname(spec), '**', '*.html');
                glob.sync(htmlGlob).forEach(function(file) {
                    files.push(file);
                });

                grunt.config('karma.options.files', files);
                tasksToRun.push('karma:during_watch');
            }
        }

        //if index.html changed, we need to reread the <script> tags so our next run of karma
        //will have the correct environment
        if (filepath === 'index.html') {
            tasksToRun.push('dom_munger:read');
        }

        grunt.config('watch.main.tasks', tasksToRun);

    });
};
