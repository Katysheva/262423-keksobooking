'use strict';

var pinsContainerElement = document.querySelector('.tokyo > .tokyo__pin-map');
var dialogElement = document.querySelector('.dialog');
var noticeFormElement = document.querySelector('.notice__form');

var placeType = noticeFormElement.querySelector('#type');
var priceInput = noticeFormElement.querySelector('#price');


subscribeAll();


function subscribeAll() {
  subscribePins();

  subscribeDialogs();

  subscribeTime();

  subscribeRoomAndCapacity();

  subscribePlaceTypeAndPrice();
}

/**
* show announcement card
*/

function subscribePins() {
  var pinElements = pinsContainerElement.querySelectorAll('.pin');

  for (var i = 0; i <= pinElements.length - 1; i++) {
    pinElements[i].addEventListener('click', handleOnClickPin);
  }
}

function handleOnClickPin(event) {
  var element = event.currentTarget;

  if (!element.classList.contains('pin--active')) {
    removePinActiveClass();

    element.classList.add('pin--active');

    openDialog(dialogElement);
  }
}

/**
* close announcement card
*/

function subscribeDialogs() {
  dialogElement.querySelector('.dialog__close')
    .addEventListener('click', handleOnClickDialogClose);
}

function handleOnClickDialogClose(event) {
  event.preventDefault();

  dialogElement.classList.add('invisible');

  removePinActiveClass();
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
  }
}

/**
* rooms count & capacity binding
*/

function subscribeRoomAndCapacity() {
  var roomNumberElement = noticeFormElement.querySelector('#room_number');
  var capacityElement = noticeFormElement.querySelector('#capacity');

  roomNumberElement.addEventListener('change', handleOnChangeRoomNumber(capacityElement.children));
  capacityElement.addEventListener('change', handleOnChangeCapacity(roomNumberElement.children));
}

function handleOnChangeRoomNumber(capacityOptions) {

  return function innerHandleOnChangeRoomNumber(event) {
    var element = event.target;
    var curRoomNumber = parseInt(element.options[element.selectedIndex].value, 10);

    getGuestCapacity(capacityOptions, curRoomNumber);
  }
}

function handleOnChangeCapacity(roomNumberOptions) {

  return function innerHandleOnChangeCapacity(event) {
    var element = event.target;
    var curCapacity = parseInt(element.options[element.selectedIndex].value, 10);

    getRoomNumbers(roomNumberOptions, curCapacity);
  }
}


/**
* type of place & price binding
*/

function subscribePlaceTypeAndPrice() {
  placeType.addEventListener('change', handleOnChangePlaceType);

  priceInput.addEventListener('change', handleOnChangePriceInput(placeType.children));
}

function handleOnChangePlaceType (event) {
  priceInput.value = event.target.options[event.target.selectedIndex].value;
}

function handleOnChangePriceInput (placeTypeOptions) {

  return function innerHandleOnChangePriceInput(event) {

    var placeValues = sortPlaceTypeByValue(placeTypeOptions);
    var priceValue = parseInt(event.target.value, 10);
    var curValue = 0;

    for (var j = 0; j <= placeValues.length - 1; j++) {

      if (!placeValues[j + 1] && priceValue >= placeValues[j]) {
        curValue = placeValues[placeValues.length - 1];
      } else if (priceValue >= placeValues[j] && priceValue < placeValues[j + 1]) {
        curValue = placeValues[j];
      }
    }

    for (var k = 0; k <= placeTypeOptions.length - 1; k++) {
      if (curValue === parseInt(placeTypeOptions[k].value, 10)) {
        placeTypeOptions[k].selected = true;
      }
    }
  }
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

function getGuestCapacity(options, roomsCount) {
  for (var k = 0; k <= options.length - 1; k++) {
    var currentOptionVal = parseInt(options[k].value, 10);

    if ((roomsCount === 1 && currentOptionVal === 0) ||
      (roomsCount > 1 && currentOptionVal === 3)) {
      options[k].selected = true;

  } else {
    options[k].selected = false;
  }
}
}

function getRoomNumbers(options, guestCapacity) {
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

function sortPlaceTypeByValue(placeTypeOptions) {
  var placeTypeValues = [];

  for (var i = 0; i <= placeTypeOptions.length - 1; i++) {
    placeTypeValues.push(parseInt(placeTypeOptions[i].value, 10));
  }

  return placeTypeValues.sort(compareNumeric);
}

function compareNumeric(a, b) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}
