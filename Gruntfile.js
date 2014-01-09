module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: ['test/index.html']
    },
    command: {
      testBat: {
        type: 'bat',
        cmd: 'testServer.bat'
      },
      testSh: {
        type: 'shell',
        cmd: './testServer.sh'
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
  grunt.registerTask('test', ['command:testBat', 'command:testSh', 'wait_server:test', 'mocha']);
  grunt.registerTask('dev', ['command:testBat', 'command:testSh', 'wait_server:test', 'watch']);
};
