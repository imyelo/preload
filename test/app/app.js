define(function (require, exports, module) {
  var preload = require('../../libs/preload');

  require('./case/base/index')(preload);


  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});