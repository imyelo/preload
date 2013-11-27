define(function (require, exports, module) {
  var toDataURL = function (elem, width, height) {
    var canvas, context, result;
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = width || elem.width || 0;
    canvas.height = height || elem.height || 0;
    context.drawImage(elem, 0, 0, width, height);
    result = canvas.toDataURL();
    canvas = null;
    context = null;
    return result;
  };

  return function (preload) {
    describe('preload', function () {
      describe('img', function () {
        var cb = function (src, img) {
          console.log('called!');
          it('should trigger after image loaded', function () {
            expect(toDataURL(img).length > 10).to.be.true;
          });
        };
        var spy = sinon.spy(cb);
        var server = sinon.fakeServer.create();
        $('<img data-preload="./imgs/github.png" class="preload-img" />').appendTo('body');
        preload.img(spy);
        it('should trigger the "after" method ', function () {
          expect(spy.calledOnce).to.be.true;
        });
      });
    });
  };
  
});
