'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    jimp: {
      placeholders: {
        options: {
          suffix: 'placeholder',
          actions: {
            blur: 30,
            quality: 20,
          }
        },
        files: [{
            expand: true,
            cwd: './',
            src: ['*.jpg'],
            dest: './dist/'
        }]
      },
    },
    bump: {
        options: {
            push: true,
            pushTo: "origin",
            files: [
                "package.json",
            ],
            commitFiles: [
                "package.json",
            ]
        }
    },
    clean: {
      files: ['./dist/*.{jpg,jpeg}']
    },
    copy: {
      images: {
        files: [
          { expand: true, src: ['./*.{jpg,jpeg}'], dest: 'dist/' },
        ]
      }
    },
    surge: {
      'lazyload': {
        options: {
          project: 'dist/',
          domain: 'lazyload.demo.mxbry.com'
        }
      }
    }
  });

  grunt.registerTask('dist', ['clean', 'copy', 'jimp']);
  grunt.registerTask('deploy', ['dist', 'surge',]);

};
