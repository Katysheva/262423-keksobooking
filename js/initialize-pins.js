'use strict';

window.load(function(evt) {
  var similarApartments = evt.target.response;

  showSimilarPosts(similarApartments);

});

function showSimilarPosts(apartmentsArray) {
  if ('content' in document.createElement('template')) {
    for (var i = 0; i < 3; i++) {

      var templateElement = document.querySelector('#pin-template');
      templateElement.content.querySelector('img').src = apartmentsArray[i].author.avatar;

      var currentTemplatePin = templateElement.content.querySelector('.pin');
      currentTemplatePin.style.top = apartmentsArray[i].location.y + 'px';
      currentTemplatePin.style.left = apartmentsArray[i].location.x + 'px';

      document.body.appendChild(templateElement.content.cloneNode(true));
    }
  }
}

window.initializePins = (function () {

  var pinsContainerElement = document.querySelector('.tokyo > .tokyo__pin-map');
  var dialogElement = document.querySelector('.dialog');

  var ENTER_KEY_CODE = 13;

/**
* show announcement card
*/

(function () {
  pinsContainerElement.addEventListener('click', handleOnClickPin);
  pinsContainerElement.addEventListener('keydown', handleOnClickPin);

  function handleOnClickPin(event) {
    console.log(event);

    if (event.type === 'click' || event.keyCode === ENTER_KEY_CODE) {
      var element = event.target;

      if (element.offsetParent.classList.contains('pin')) {
        element = event.target.offsetParent;
      }

      if (!element.classList.contains('pin--active')) {
        removePinActiveClass();

        element.classList.add('pin--active');
        // window.showCard(dialogElement);
      }
    }
  }
})();

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
  }})();

/**
* common functions
*/

function removePinActiveClass() {
  var pinActiveItems = pinsContainerElement.querySelectorAll('.pin--active');

  for (var i = 0; i <= pinActiveItems.length - 1; i++) {
    pinActiveItems[i].classList.remove('pin--active');
  }
}

// function openDialog(dialog) {
//   dialog.classList.remove('invisible');
// }
})();
