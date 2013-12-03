;(function (name, definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) {
    // Node.js Module
    module.exports = definition('preload-image');
  } else {
    // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('preload-image', function () {
  var _helper = {};
  _helper.noop = function () {};
  var _register = function (selector, onload) {
    return function () {
      var imgs = [];
      $(selector).each(function () {
        var self = this;
        var $self = $(self);
        var src;
        var img;
        if ((src = $self.data('preload'))) {
          img = new Image();
          img.src = src;
          img.onload = function () {
            onload.call(self, src, img);
          };
        }
      });
    };
  };

  var img = function (after) {
    after = typeof after === 'undefined' ? _helper.noop : after;
    _register('.preload-img', function (src, img) {
      $(this).attr('src', src);
      after.call(this, src, img);
    })();
  };

  var background = function (after) {
    after = typeof after === 'undefined' ? _helper.noop : after;
    _register('.preload-background', function (src, img) {
      $(this).css('background-image', 'url(' + src + ')');
      after.call(this, src, img);
    })();
  };

  return {
    img: img,
    background: background
  };
});