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

dialogClose.addEventListener('click', function () {
  dialog.classList.add('invisible');
  var pinActiveItem = document.querySelector('.pin--active');
  pinActiveItem.classList.remove('pin--active');
});


var startTime = document.getElementById('time');
var endTimeOptions = document.querySelectorAll('#timeout option');

startTime.addEventListener('change', function () {
  var curValue = startTime.options[startTime.selectedIndex].value;

  for (var j = 0; j <= endTimeOptions.length - 1; j++) {
    var option = endTimeOptions[j];
    if (option.value === curValue) {
      option.selected = true;
    }
  }
});


var placeType = document.getElementById('type');
var priceInput = document.getElementById('price');

placeType.addEventListener('change', function () {
  var curOptionPrice = placeType.options[placeType.selectedIndex].value;
  priceInput.value = curOptionPrice;
});


var roomNumber = document.getElementById('room_number');

roomNumber.addEventListener('change', function () {
  var curRoomNumber = roomNumber.options[roomNumber.selectedIndex].value;
  getGuestCapacity(curRoomNumber);

});

function getGuestCapacity(roomsCount) {
  var capacity = document.getElementById('capacity');
  var capacityOptions = capacity.children;

  for (var k = 0; k <= capacityOptions.length - 1; k++) {
    if (roomsCount === '1' && capacityOptions[k].value === '0') {
      capacityOptions[k].selected = true;
    } else {
      capacityOptions[k].selected = false;
    }
  }
}
