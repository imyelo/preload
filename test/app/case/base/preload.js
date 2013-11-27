define(function (require, exports, module) {
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
        var cb = function () {
          console.log('called!');
        };
        $('<img data-preload="./imgs/github.png" class="preload-img" />').appendTo('body');
        preload.img(cb);

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
