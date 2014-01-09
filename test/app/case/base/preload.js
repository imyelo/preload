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
      var url = 'http://localhost:3000/';
      var cb = function (src, img) {
        console.log('called!');
        return img;
      };
      var $img;
      var insertImage = function (delay) {
        var ts = (new Date()).getTime() + '' + parseInt(Math.random() * 65525, 0);
        if ($img && typeof $img.remove === 'function') {
          $img.remove();
        }
        $img = $('<img data-preload="' + url + delay + '?' + ts + '" class="preload-img" />').appendTo('body');
      };
      var getSpy = function () {
        return sinon.spy(cb);
      };
      describe('Preload method', function () {
        describe('before', function () {
          it('should NOT trigger the "after" function before image loaded', function (done) {
            var spy = getSpy();
            insertImage(600)
            preload($img.attr('data-preload'), spy);
            setTimeout(function () {
              expect(spy.callCount).to.be.equal(0);
              done();
            }, 200);
          });
        });
        describe('after', function () {
          it('should trigger the "after" function after image loaded', function (done) {
            var spy = getSpy();
            insertImage(100);
            preload($img.attr('data-preload'), spy);
            setTimeout(function () {
              expect(spy.callCount).to.be.equal(1);
              done();
            }, 1200);
          });
        });
      });
      describe('preload plugin for jQuery', function () {
        describe('$.fn.preloadImage', function () {
          describe('before', function () {
            it('should NOT trigger the "after" function before image loaded', function (done) {
              var spy = getSpy();
              insertImage(600)
              $img.preloadImage(spy);
              setTimeout(function () {
                expect(spy.callCount).to.be.equal(0);
                done();
              }, 200);
            });
          });
          describe('after', function () {
            it('should trigger the "after" function after image loaded', function (done) {
              var spy = getSpy();
              insertImage(100);
              $img.preloadImage(spy);
              setTimeout(function () {
                expect(spy.callCount).to.be.equal(1);
                done();
              }, 1200);
            });
          });
        });
        describe('$.fn.preloadSrc', function () {
          describe('before', function () {
            it('should NOT trigger the "after" function before image loaded', function (done) {
              var spy = getSpy();
              insertImage(600)
              $img.preloadSrc(spy);
              setTimeout(function () {
                expect(spy.callCount).to.be.equal(0);
                done();
              }, 200);
            });
            it('should keep the src attr empty before image loaded', function (done) {
              var spy = getSpy();
              insertImage(600);
              $img.preloadSrc(spy);
              setTimeout(function () {
                expect($img.attr('src')).to.be.empty;
                done();
              }, 200);
            });
          });
          describe('after', function () {
            it('should trigger the "after" function after image loaded', function (done) {
              var spy = getSpy();
              insertImage(100);
              $img.preloadSrc(spy);
              setTimeout(function () {
                expect(spy.callCount).to.be.equal(1);
                done();
              }, 1200);
            });
            it('should change the src attr after image loaded', function (done) {
              var delay = 100;
              var spy = getSpy();
              insertImage(delay);
              $img.preloadSrc(spy);
              setTimeout(function () {
                expect($img.attr('src')).to.be.match(new RegExp("^" + url + delay + ""));
                done();
              }, 1200);
            });
          });
        });
        describe('$.fn.preloadBackground', function () {
          describe('before', function () {
            it('should NOT trigger the "after" function before image loaded', function (done) {
              var spy = getSpy();
              insertImage(600)
              $img.preloadBackground(spy);
              setTimeout(function () {
                expect(spy.callCount).to.be.equal(0);
                done();
              }, 200);
            });
            it('should keep the background attr empty before image loaded', function (done) {
              var spy = getSpy();
              insertImage(600);
              $img.preloadBackground(spy);
              setTimeout(function () {
                expect($img.get(0).style.backgroundImage).to.be.empty;
                done();
              }, 200);
            });
          });
          describe('after', function () {
            it('should trigger the "after" function after image loaded', function (done) {
              var spy = getSpy();
              insertImage(100);
              $img.preloadBackground(spy);
              setTimeout(function () {
                expect(spy.callCount).to.be.equal(1);
                done();
              }, 1200);
            });
            it('should change the background attr after image loaded', function (done) {
              var delay = 100;
              var spy = getSpy();
              insertImage(delay);
              $img.preloadBackground(spy);
              setTimeout(function () {
                expect($img.get(0).style.backgroundImage).to.be.match(new RegExp("^url\\(" + url + delay + ""));
                done();
              }, 1200);
            });
          });
        });
      });
    });
  };
  
});
