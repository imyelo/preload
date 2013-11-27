module.exports = function (grunt) {
  var config = grunt.file.readJSON('config.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: ['test/index.html']
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('_dev', ['test']);
  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('dev', ['watch']);
};
