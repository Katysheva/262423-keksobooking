'use strict';

window.load = (function(callback) {
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  if (typeof callBack === 'function') {
    callback();
    console.log('This is callback')
    console.log(callback);
  }

  return function(onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.responseType = 'json';

    xhr.open('GET', DATA_URL);
    xhr.send();
  };
})();
