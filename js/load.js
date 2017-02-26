'use strict';

window.load = (function () {
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  return function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.responseType = 'json';

    xhr.open('GET', DATA_URL);
    xhr.send();
  };
})();
