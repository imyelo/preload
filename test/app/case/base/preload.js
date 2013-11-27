define(function (require, exports, module) {
  var toDataURL = function (elem, width, height) {
    var canvas, context, result;
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.drawImage(elem, 0, 0, width, height);
    result = canvas.toDataURL();
    canvas = null;
    context = null;
    return result;
  };

  return function (preload) {
    describe('preload', function () {
        // var test = function (ubb, text, output) {
        //   describe(text, function () {
        //     it('should be ' + output, function () {
        //       expect(ubb.toHtml(text)).to.be.equal(output);
        //     });
        //   });
        // };
      describe('img', function () {
        var cb = function (src, img) {
          console.log('called!');
          it('should trigger after image loaded', function () {
            expect(toDataURL(img, 27, 48).length > 10).to.be.true;
          });
        };
        var spy = sinon.spy(cb);
        var server = sinon.fakeServer.create();
        $('<img data-preload="./imgs/github.png" class="preload-img" />').appendTo('body');
        preload.img(spy);
        it('should trigger the "after" method ', function () {
          expect(spy.calledOnce).to.be.true;
        });

        // var ubb, text, output;
        // ubb = new Ubb();
        // ubb.add(testTag.pair);
        // text = '[test foo=120%;"> data-height="]sth[/test]';
        // output = '<div class="test" data-foo="120%;&quot;&gt;">sth</div>';
        // test(ubb, text, output);
      });
    });
  };
});
