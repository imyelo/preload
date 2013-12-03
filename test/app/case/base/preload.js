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
        var url = './imgs/github.png';
        var cb = function (src, img) {
          console.log('called!');
          return img;
        };
        var spy = sinon.spy(cb);
        var server = sinon.fakeServer.create();
        var $img = $('<img data-preload="' + url + '" class="preload-img" />').appendTo('body');
        describe('before', function () {
          it('should keep the src attr empty before image loaded', function () {
            expect($img.attr('src')).to.be.empty;
          });
        });
        describe('after', function () {
          it('should trigger the "after" method ', function (done) {
            setTimeout(function () {
              preload.img(spy);
              expect(spy.calledOnce).to.be.true;
              done();
            }, 0);
          });
          it('should trigger after image loaded', function (done) {
            setTimeout(function () {
              var img = spy.returnValues[0];
              expect(toDataURL(img).length > 10).to.be.true;
              done();
            }, 0);
          });
          it('should change the src attr after image loaded', function (done) {
            setTimeout(function () {
              var img = spy.returnValues[0];
              expect(img.attributes.src.value).to.be.equal(url);
              done();
            }, 0);
          });
        });
      });
    });
  };
  
});
