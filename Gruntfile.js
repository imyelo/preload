module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: ['test/index.html']
    },
    command: {
      test: {
        cmd: 'node ./test/server/app'
      }
    },
    wait_server: {
      test: {
        options: {
          url: 'http://localhost:3000'
        }
      }
    },
    watch: {
      libs: {
        files: 'libs/**/**',
        tasks: ['_dev']
      },
      tests: {
        files: 'test/**/**',
        tasks: ['_dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-wait-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-commands');

  grunt.registerTask('_dev', ['mocha']);
  grunt.registerTask('test', ['command:test', 'wait_server:test', 'mocha']);
  grunt.registerTask('dev', ['command:test', 'wait_server:test', 'watch']);
};
