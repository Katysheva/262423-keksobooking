'use strict';

var noticeFormElement = document.querySelector('.notice__form');

var placeTypeElement = noticeFormElement.querySelector('#type');
var priceInputElement = noticeFormElement.querySelector('#price');

window.initializePins();

(function () {

  var noticeTitleElement = noticeFormElement.querySelector('#title');
  var addressElement = noticeFormElement.querySelector('#address');

  noticeTitleElement.minLength = '30';
  noticeTitleElement.maxLength = '100';
  noticeTitleElement.required = 'true';

  priceInputElement.min = '1000';
  priceInputElement.max = '1000000';
  priceInputElement.required = 'true';

  addressElement.required = 'true';
})();

/**
* checking time block
*/

(function () {
  var startTime = document.getElementById('time');
  var endTime = document.getElementById('timeout');
  var timeValues = ['12', '13', '14'];

  window.synchronizeFields(startTime, endTime, timeValues, timeValues, 'value');
  window.synchronizeFields(endTime, startTime, timeValues, timeValues, 'value');
})();

/**
* rooms count & capacity binding
*/

(function () {
  var roomNumberEl = noticeFormElement.querySelector('#room_number');
  var capacityEl = noticeFormElement.querySelector('#capacity');

  window.synchronizeFields(roomNumberEl, capacityEl, ['1', '2', '100'], ['0', '3', '3'], 'value');
})();

/**
* type of place & price binding
*/

(function () {
  var priceValues = ['1000', '0', '10000'];
  window.synchronizeFields(placeTypeElement, priceInputElement, priceValues, priceValues, 'min');
})();
