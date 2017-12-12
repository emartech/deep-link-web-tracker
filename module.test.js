var chai = require('chai');

var tracker = require('./module');

var expect = chai.expect;

describe('Deep Link Web Tracker', function() {
  describe('when referer is external', function() {
    it('returns true', function() {
      var result = tracker();
      expect(result).to.be.true;
    });
  });
});
