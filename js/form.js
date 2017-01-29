'use strict';

var pinItems = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');

var dialogClose = dialog.querySelector('.dialog__close');

for (var i = 0; i <= pinItems.length - 1; i++) {
  var pin = pinItems[i];
  makePinActive(pin);
}

function makePinActive(selectedPin) {

  selectedPin.addEventListener('click', function () {
    if (!selectedPin.classList.contains('pin--active')) {
      var pinActiveItems = document.querySelectorAll('.pin--active');
      for (var j = 0; j <= pinActiveItems.length - 1; j++) {
        pinActiveItems[j].classList.remove('pin--active');
      }
      selectedPin.classList.add('pin--active');
      openDialog(dialog);
    }
  });

}

function openDialog(dialog) {
  dialog.classList.remove('invisible');
}

dialogClose.addEventListener('click', function (event) {
  event.preventDefault();
  dialog.classList.add('invisible');
  var pinActiveItem = document.querySelector('.pin--active');
  pinActiveItem.classList.remove('pin--active');
});


var startTime = document.getElementById('time');
var endTime = document.getElementById('timeout');
changeTime(startTime, endTime);
changeTime(endTime, startTime);

function changeTime(chosenElement, changeableElement) {
  chosenElement.addEventListener('change', function () {
    var curValue = chosenElement.options[chosenElement.selectedIndex].value;
    var elementOptions = changeableElement.querySelectorAll('option');

    for (var j = 0; j <= elementOptions.length - 1; j++) {
      var option = elementOptions[j];
      if (option.value === curValue) {
        option.selected = true;
      }
    }
  });
}


var placeType = document.getElementById('type');
var priceInput = document.getElementById('price');

placeType.addEventListener('change', function () {
  var curOptionPrice = placeType.options[placeType.selectedIndex].value;
  priceInput.value = curOptionPrice;
});

priceInput.addEventListener('change', function () {
  var placeTypeOptions = placeType.children;

  var placeValues = [];
  var priceValue = parseInt(priceInput.value, 10);

  for (var i = 0; i <= placeTypeOptions.length - 1; i++) {
    placeValues.push(parseInt(placeTypeOptions[i].value, 10));
  }
  placeValues.sort(compareNumeric);

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
});

function compareNumeric(a, b) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}


var roomNumber = document.getElementById('room_number');
var capacity = document.getElementById('capacity');

roomNumber.addEventListener('change', function () {
  var curRoomNumber = roomNumber.options[roomNumber.selectedIndex].value;
  getGuestCapacity(curRoomNumber);
});

capacity.addEventListener('change', function () {
  var curCapacity = capacity.options[capacity.selectedIndex].value;
  getRoomNumbers(curCapacity);
});

function getGuestCapacity(roomsCount) {
  var capacityOptions = capacity.children;

  for (var k = 0; k <= capacityOptions.length - 1; k++) {
    if (roomsCount === '1' && capacityOptions[k].value === '0') {
      capacityOptions[k].selected = true;
    } else {
      capacityOptions[k].selected = false;
    }
  }
}

function getRoomNumbers(guestCapacity) {
  var roomNumberOptions = roomNumber.children;

  for (var k = 0; k <= roomNumberOptions.length - 1; k++) {
    if (guestCapacity !== '0' && roomNumberOptions[k].value !== '1') {
      roomNumberOptions[k].selected = true;
      return;
    } else {
      roomNumberOptions[k].selected = false;
    }
  }
}
