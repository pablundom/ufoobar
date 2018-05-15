module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n'
            },
            dist1: {
                src: [
                    'src/app.js',
                    'src/bootstrap/**',
                    'src/services/**',
                    'src/controllers/**',
                    'src/directives/**'
                ],
                dest: 'dist/app.js'
            }
        },
        "concat-json":
            {
                dist2: {
                    src: [
                        'src/data/**.json'
                    ],
                    dest: 'data.json'
                }
            },
        watch: {
            scripts: {
                files: ['src/**'],
                tasks: ['default'],
                options: {
                    spawn: false,
                    interval: 50
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-json');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat:dist1','concat-json:dist2']);

};