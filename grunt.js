module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        lint: {
            all: [
                "grunt.js",
                "lib/**/*.js"
            ]
        },
        jshint: {
            options: {
                node: true,
                es5: true
            }
        }
    });

    grunt.registerTask("default", "lint");

};