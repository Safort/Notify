var assert = chai.assert;
var expect = chai.expect;

var notify = new Notify('.notify', {
  removingDelay: 500
});



describe('Notify', function() {

  describe('#add()', function() {
    it('Дожен добавлять уведомление', function() {

      notify.add({title: 'title', content: 'text'});
      notify.add({title: 'title2', content: 'text2'});
      notify.add({title: 'title3', content: 'text3'});
      notify.add({title: 'title4', content: 'text4'});
      notify.add({title: 'title5', content: 'text5'});

      expect(notify.itemsCounter).to.equal(5);
    });
  });

  describe('#closeFirst()', function() {
    it('Дожен удалять первое уведомление', function(done) {

      notify.closeFirst(function() {
        expect(notify.itemsCounter).to.equal(4);
        done();
      });

    });
  });

  describe('#closeLast()', function() {
    it('Дожен удалять последенее уведомление', function(done) {

      notify.closeLast(function() {
        expect(notify.itemsCounter).to.equal(3);
        done();
      });

    });
  });

  describe('#closeAll()', function() {
    it('Дожен удалять все уведомления', function(done) {

      notify.closeAll(function() {
        expect(notify.itemsCounter).to.equal(0);
        done();
      });

    });
  });

});