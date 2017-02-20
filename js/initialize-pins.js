'use strict';



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
  }})();

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

function openDialog(dialog) {
  dialog.classList.remove('invisible');
}
})();
