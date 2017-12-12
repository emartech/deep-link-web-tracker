var chai = require('chai');
var sinon = require('sinon');
var track = require('./module');
var sinonChai = require('sinon-chai');

var expect = chai.expect;

chai.use(sinonChai);

beforeEach(function () {
  this.xhr = global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

  var requests = this.requests = [];

  this.xhr.onCreate = function(xhr) {
    requests.push(xhr);
  };
});

afterEach(function () {
  this.xhr.restore();
  delete this.xhr;
});


describe('Deep Link Web Tracker', function() {
  describe('has ems_dl get paramter', function() {
    it('calls ajax request', function() {
      global.location = { search: '?fancy_url=1&ems_dl=1_2_3_4_5' };

      track();

      expect(this.requests[0].method).to.eq('POST');
      expect(this.requests[0].url).to.eq('https://deep-link.eservice.emarsys.net/api/clicks');
      expect(this.requests[0].requestHeaders['Content-Type']).to.contains('application/json');
      expect(this.requests[0].requestBody).to.deep.eq({ ems_dl: '1_2_3_4_5' });
    });
    it('calls ajax request when url different', function() {
      global.location = { search: '?ems_dl=1_2_3_4_5' };

      var result = track();

      expect(this.requests[0].method).to.eq('POST');
      expect(this.requests[0].url).to.eq('https://deep-link.eservice.emarsys.net/api/clicks');
      expect(this.requests[0].requestHeaders['Content-Type']).to.contains('application/json');
      expect(this.requests[0].requestBody).to.deep.eq({ ems_dl: '1_2_3_4_5' });
    });
  });
  describe('has not got ems_dl get paramter', function() {
    it('returns false', function() {
      global.location = { search: '?fancy_url=1' };

      var result = track();
      
      expect(this.requests).to.deep.eq([]);
    });
  });
});
