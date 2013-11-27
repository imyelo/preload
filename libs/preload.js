define(function (require, exports, module) {
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
          img.onload = onload.call(self, src);
        }
      });
    };
  };

  var img = function (after) {
    _register('.preload-img', function (src) {
      $(this).attr('src', src);
      after.call(this);
    })();
  };

  var background = function (after) {
    _register('.preload-background', function (src) {
      $(this).css('background-image', 'url(' + src + ')');
      after.call(this);
    })();
  };


  exports.img = img;
  exports.background = background;
});