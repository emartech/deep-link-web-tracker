module.exports = function() {
  if (location.search.indexOf('ems_dl') === -1) {
    return;
  }

  var emsDlPosition = location.search.search(/[\?|&]ems_dl=/);

  var parameters = location.search.substr(emsDlPosition + 1).split('&');

  var emsDl = parameters[0].split('=');

  var xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://deep-link.eservice.emarsys.net/api/clicks');

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send(JSON.stringify({ ems_dl: emsDl[1]}));
};
