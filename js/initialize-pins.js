'use strict';

window.initializePins = (function () {

  var pinsContainerElement = document.querySelector('.tokyo > .tokyo__pin-map');
  var dialogElement = document.querySelector('.dialog');
  var filtersElement = document.querySelector('.tokyo__filters');

  var ENTER_KEY_CODE = 13;
  // var chosenSimilarApartments;

  var similarApartments = [];
  var filter = {};

  var filteredPins = similarApartments;

  window.load(function (evt) {
    similarApartments = evt.target.response;

    filteredPins = showSimilarPosts(similarApartments);

    subscribePins();
    setInitialFilterState();
  });

  filtersElement.addEventListener('change', handleOnChangeFilters);

  /**
  * filtered data
  */

  function setInitialFilterState() {
    filter = {
      type: 'any',
      price: 'middle',
      rooms: 'any',
      guests: 'any'
    };

    var housingTypes = filtersElement.querySelector('#housing_type').options;
    var housingPrices = filtersElement.querySelector('#housing_price').options;
    var housingRooms = filtersElement.querySelector('#housing_rooms').options;
    var housingGuests = filtersElement.querySelector('#housing_guests').options;

    for (var i = 0; i < housingTypes.length; i++) {

      if (housingTypes[i].value === filter.type) {

        housingTypes[i].selected = true;
      }
    }

    for (var j = 0; j < housingPrices.length; j++) {

      if (housingPrices[j].value === filter.type) {

        housingPrices[j].selected = true;
      }
    }

    for (var k = 0; k < housingRooms.length; k++) {

      if (housingRooms[k].value === filter.type) {

        housingRooms[k].selected = true;
      }
    }

    for (var l = 0; l < housingGuests.length; l++) {

      if (housingGuests[l].value === filter.type) {

        housingGuests[l].selected = true;
      }
    }
  }

  function handleOnChangeFilters(event) {
    var element = event.target;
    var selectedOption = element.options[element.selectedIndex].value;
    var filterName = element.id.slice('housing_'.length);

    filter[filterName] = selectedOption;

    filteredPins = getFilteredPins(filter);

    showFilteredPosts(filteredPins);
  }

  function getFilteredPins(curFilter) {
    var filteredData = [];

    similarApartments.forEach(function (item) {

      var itemPrice = Math.floor(item.offer.price);
      if (itemPrice <= 10000) {
        itemPrice = 'low';

      } else if (itemPrice >= 50000) {
        itemPrice = 'hight';

      } else {
        itemPrice = 'middle';
      }

      var itemType = false;
      if (item.offer.type === curFilter.type) {
        itemType = item.offer.type;

      } else if (curFilter.type === 'any') {
        itemType = true;
      }

      var itemRoomsCount = false;
      if (item.offer.rooms === Math.floor(curFilter.rooms)) {
        itemRoomsCount = item.offer.rooms;

      } else if (curFilter.rooms === 'any') {
        itemRoomsCount = true;
      }

      var itemGuestsCount = false;
      if (item.offer.guests === Math.floor(curFilter.guests)) {
        itemGuestsCount = item.offer.guests;

      } else if (curFilter.guests === 'any') {
        itemGuestsCount = true;
      }

      if (itemType && itemPrice === curFilter.price && itemRoomsCount && itemGuestsCount) {
        filteredData.push(item);
      }
    });

    return filteredData;
  }

  /**
  * show announcement card
  */

  var subscribePins = function () {
    pinsContainerElement.addEventListener('click', handleOnClickPin);
    pinsContainerElement.addEventListener('keydown', handleOnClickPin);
  };

  function handleOnClickPin(event) {

    if (event.type === 'click' || event.keyCode === ENTER_KEY_CODE) {
      var element = event.target;

      if (!element.offsetParent.classList.contains('pin__main')) {

        if (element.offsetParent.classList.contains('pin')) {
          element = event.target.offsetParent;
        }

        if (!element.classList.contains('pin--active')) {
          removePinActiveClass();

          element.classList.add('pin--active');

          window.showCard(dialogElement, element, filteredPins);
        }
      }
    }
  }

  /**
  * close announcement card
  */

  (function () {
    var dialogCloseElement = dialogElement.querySelector('.dialog__close');

    dialogCloseElement.addEventListener('click', handleOnClickDialogClose);
    dialogCloseElement.addEventListener('keydown', handleOnClickDialogClose);

    function handleOnClickDialogClose(event) {
      event.preventDefault();

      if (event.type === 'click' || event.keyCode === ENTER_KEY_CODE) {
        dialogElement.classList.add('invisible');

        removePinActiveClass();
      }
    }
  })();

  /**
  * common functions
  */

  function removePinActiveClass() {
    var pinActiveItems = pinsContainerElement.querySelectorAll('.pin--active');

    for (var i = 0; i <= pinActiveItems.length - 1; i++) {
      pinActiveItems[i].classList.remove('pin--active');
    }
  }

  function showSimilarPosts(apartmentsArray) {
    var newApartmentsArray = [];

    if ('content' in document.createElement('template')) {
      for (var i = 0; i < 3; i++) {

        showPost(apartmentsArray, i);
        newApartmentsArray.push(apartmentsArray[i]);
      }
    }
    return newApartmentsArray;
  }

  function showFilteredPosts(apartmentsFilteredArray) {
    var newApartmentsArray = [];
    var pins = pinsContainerElement.querySelectorAll('.pin');

    pins.forEach(function (item) {
      if (!item.classList.contains('pin__main')) {
        pinsContainerElement.removeChild(item);
      }
    });

    if ('content' in document.createElement('template')) {
      for (var i = 0; i < apartmentsFilteredArray.length; i++) {

        showPost(apartmentsFilteredArray, i);

        newApartmentsArray.push(apartmentsFilteredArray[i]);
      }
    }

    return newApartmentsArray;
  }


  function showPost(apartmentsArray, i) {
    var templateElement = document.querySelector('#pin-template');
    templateElement.content.querySelector('img').src = apartmentsArray[i].author.avatar;

    var currentTemplatePin = templateElement.content.querySelector('.pin');

    currentTemplatePin.dataset.itemIndex = i;

    currentTemplatePin.style.top = apartmentsArray[i].location.y + 'px';
    currentTemplatePin.style.left = apartmentsArray[i].location.x + 'px';

    pinsContainerElement.appendChild(templateElement.content.cloneNode(true));
  }
})();
