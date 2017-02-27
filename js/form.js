'use strict';


(function () {

  var noticeFormElement = document.querySelector('.notice__form');

  var placeTypeElement = noticeFormElement.querySelector('#type');
  var priceInputElement = noticeFormElement.querySelector('#price');

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

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  (function () {
    var startTime = document.getElementById('time');
    var endTime = document.getElementById('timeout');

    var timeValues = ['12', '13', '14'];

    window.synchronizeFields(startTime, endTime, timeValues, timeValues, syncValues);
    window.synchronizeFields(endTime, startTime, timeValues, timeValues, syncValues);
  })();

  /**
  * rooms count & capacity binding
  */

  (function () {
    var roomNumberEl = noticeFormElement.querySelector('#room_number');
    var capacityEl = noticeFormElement.querySelector('#capacity');

    var roomNumberValues = ['1', '2', '100'];
    var guestsCountValues = ['0', '3', '3'];

    window.synchronizeFields(roomNumberEl, capacityEl, roomNumberValues, guestsCountValues, syncValues);
  })();

  /**
  * type of place & price binding
  */

  (function () {
    var priceValues = ['1000', '0', '10000'];
    window.synchronizeFields(placeTypeElement, priceInputElement, priceValues, priceValues, syncValueWithMin);
  })();

})();
