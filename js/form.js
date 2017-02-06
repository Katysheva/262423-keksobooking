'use strict';

var pinsContainerElement = document.querySelector('.tokyo > .tokyo__pin-map');
var dialogElement = document.querySelector('.dialog');
var noticeFormElement = document.querySelector('.notice__form');

var placeTypeElement = noticeFormElement.querySelector('#type');
var priceInputElement = noticeFormElement.querySelector('#price');

var ENTER_KEY_CODE = 13;

setValidationValue();

subscribePins();

subscribeDialogs();

subscribeTime();

subscribeRoomAndCapacity();

subscribePlaceTypeElementAndPrice();

function setValidationValue() {

  var noticeTitleElement = noticeFormElement.querySelector('#title');
  var addressElement = noticeFormElement.querySelector('#address');

  noticeTitleElement.minLength = '30';
  noticeTitleElement.maxLength = '100';
  noticeTitleElement.required = 'true';

  priceInputElement.min = '1000';
  priceInputElement.max = '1000000';
  priceInputElement.required = 'true';

  addressElement.required = 'true';
}

/**
* show announcement card
*/

function subscribePins() {
  pinsContainerElement.addEventListener('click', handleOnClickPin);
  pinsContainerElement.addEventListener('keydown', handleOnClickPin);
}

function handleOnClickPin(event) {

  if (event.type === 'click' || event.keyCode === ENTER_KEY_CODE) {
    var element = event.target;

    if (element.offsetParent.classList.contains('pin')) {
      element = event.target.offsetParent;
    }

    if (!element.classList.contains('pin--active')) {
      removePinActiveClass();

      element.classList.add('pin--active');

      openDialog(dialogElement);
    }
  }
}

/**
* close announcement card
*/

function subscribeDialogs() {
  var dialogCloseElement = dialogElement.querySelector('.dialog__close');
  dialogCloseElement.addEventListener('click', handleOnClickDialogClose);
  dialogCloseElement.addEventListener('keydown', handleOnClickDialogClose);
}

function handleOnClickDialogClose(event) {
  event.preventDefault();
  if (event.type === 'click' || event.keyCode === ENTER_KEY_CODE) {
    dialogElement.classList.add('invisible');

    removePinActiveClass();
  }
}

/**
* checking time block
*/

function subscribeTime() {
  var startTime = document.getElementById('time');
  var endTime = document.getElementById('timeout');

  startTime.addEventListener('change', handleOnChangeTime(endTime));
  endTime.addEventListener('change', handleOnChangeTime(startTime));
}

function handleOnChangeTime(changeableElement) {

  return function innerHandleOnChangeTime(event) {
    var chosenElement = event.target;
    var curValue = chosenElement.options[chosenElement.selectedIndex].value;
    var elementOptions = changeableElement.querySelectorAll('option');

    for (var j = 0; j <= elementOptions.length - 1; j++) {
      var option = elementOptions[j];

      if (option.value === curValue) {
        option.selected = true;
      }
    }
  };
}

/**
* rooms count & capacity binding
*/

function subscribeRoomAndCapacity() {
  var roomNumberEl = noticeFormElement.querySelector('#room_number');
  var capacityEl = noticeFormElement.querySelector('#capacity');

  var capOptions = capacityEl.children;
  var roomOption = roomNumberEl.children;

  roomNumberEl.addEventListener('change', handleOnChangeRoomNumber(capOptions));
  capacityEl.addEventListener('change', handleOnChangeCapacity(roomOption));
}

function handleOnChangeRoomNumber(capacityOptions) {

  return function innerHandleOnChangeRoomNumber(event) {
    var el = event.target;
    var curRoomNumber = parseInt(el.options[el.selectedIndex].value, 10);

    changeGuestCapasity(capacityOptions, curRoomNumber);
  };
}

function handleOnChangeCapacity(roomNumberOptions) {

  return function innerHandleOnChangeCapacity(event) {
    var el = event.target;
    var curCapacity = parseInt(el.options[el.selectedIndex].value, 10);

    changeRoomNumbers(roomNumberOptions, curCapacity);
  };
}


/**
* type of place & price binding
*/

function subscribePlaceTypeElementAndPrice() {
  placeTypeElement.addEventListener('change', handleOnChangePlaceElement);
  var placeOpt = placeTypeElement.children;
  priceInputElement.addEventListener('change', handleOnChangePriceEl(placeOpt));
}

function handleOnChangePlaceElement (event) {
  var element = event.target;
  priceInputElement.min = element.options[element.selectedIndex].value;
}

function handleOnChangePriceEl (placeTypeElementOptions) {

  return function innerHandleOnChangePriceInputElement(event) {

    var placeVals = sortplaceTypeElementByValue(placeTypeElementOptions);
    var priceVal = parseInt(event.target.value, 10);
    var curValue = 0;

    for (var j = 0; j <= placeVals.length - 1; j++) {

      if (!placeVals[j + 1] && priceVal >= placeVals[j]) {
        curValue = placeVals[placeVals.length - 1];
      } else if (priceVal >= placeVals[j] && priceVal < placeVals[j + 1]) {
        curValue = placeVals[j];
      }
    }

    for (var k = 0; k <= placeTypeElementOptions.length - 1; k++) {
      if (curValue === parseInt(placeTypeElementOptions[k].value, 10)) {
        placeTypeElementOptions[k].selected = true;
      }
    }
  };
}

/**
* common functions
*/

function removePinActiveClass() {
  var pinActiveItems = pinsContainerElement.querySelectorAll('.pin--active');

  for (var i = 0; i <= pinActiveItems.length - 1; i++) {
    pinActiveItems[i].classList.remove('pin--active');
  }
}

function openDialog(dialog) {
  dialog.classList.remove('invisible');
}

function changeGuestCapasity(options, roomsCount) {
  for (var k = 0; k <= options.length - 1; k++) {
    var curVal = parseInt(options[k].value, 10);

    if (roomsCount === 1 && curVal === 0) {
      options[k].selected = true;

    } else if (roomsCount > 1 && curVal === 3) {
      options[k].selected = true;

    } else {
      options[k].selected = false;
    }
  }
}

function changeRoomNumbers(options, guestCapacity) {
  for (var i = 0; i <= options.length - 1; i++) {
    var currentOptionVal = parseInt(options[i].value, 10);

    if (guestCapacity === 0 && currentOptionVal === 1) {
      options[i].selected = true;

    } else if (guestCapacity === 3 && currentOptionVal === 2) {
      options[i].selected = true;

    } else {
      options[i].selected = false;
    }
  }
}

function sortplaceTypeElementByValue(placeTypeElementOptions) {
  var placeTypeElementValues = [];

  for (var i = 0; i <= placeTypeElementOptions.length - 1; i++) {
    placeTypeElementValues.push(parseInt(placeTypeElementOptions[i].value, 10));
  }

  return placeTypeElementValues.sort(compareNumeric);
}

function compareNumeric(a, b) {
  return a - b;
}
