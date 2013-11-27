define(function (require, exports, module) {
  return function (preload) {
    describe('base', function () {
      require('./preload')(preload);
    });
  };
});