module.exports = function(grunt){
  // Configuration
  grunt.initConfig({
    // pass in options to plugins, references to files etc
    concat:{
      js:{
        src:['app/js/*.js'],
        dest: 'dist/app/js/scripts.js'
      },
      css:{
        src:['app/css/reset.css','app/css/bootstrap.css','app/css/style.css'],
        dest: 'dist/app/style/style.css'
      }
    },
    sass: {
      build:{
          files: [{
            src: 'app/css/sass/styles.scss',
            dest: 'app/css/style.css'
          }]
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['app/*'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['app/components/**'], dest: 'dist/'},
        ]
      }
    },
    connect: {
      local: {
         options: {
           port: 9000,
           base: 'dist/app',
           livereload: true,
           open:{
             target: 'http://localhost:9000', // target url to open
             appName: 'local' // name of the app that opens, ie: open, start, xdg-open
           },
           options: {
              index: 'index.html'
            }
         }
      }
    },
    watch: {
      options: {
        livereload:true
      },
      js: {
        files: 'app/js/*.js',
        tasks: ['concat:js']
      },
      scss: {
        files: 'app/css/sass/*.scss',
        tasks: ['sass','concat:css']
      },
      css: {
        files: 'app/css/*.css',
        tasks: ['concat:css']
      },
      index: {
        files: 'app/*.*',
        tasks: ['copy']
      },
      allother: {
        files: 'app/components/*',
        tasks: ['copy']
      }
    },
    wiredep: {
      app: {
        src: 'app/index.html',
        ignorePath:  /\.\.\//
      },
      task: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'app/*.html',   // .html support...
          'app/js/*.js',   // .js support...
          'app/css/main.scss'  // .scss & .sass support...
        ],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration
        }
      }
    }
  });


  //load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');


  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  grunt.registerTask('serve', ['sass','concat', 'wiredep','copy','connect:local','watch']);

};
