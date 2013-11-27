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
          img.onload = onload.apply(this, arguments);
        }
      });
    };
  };

  var img = _register('.preload-img', function (after) {
    $(this).attr('src', src);
    after.call(this);
  });

  var background = _register('.preload-background', function (after) {
    $(this).css('background-image', 'url(' + src + ')');
    after.call(this);
  });


  exports.img = img;
  exports.background = background;
});