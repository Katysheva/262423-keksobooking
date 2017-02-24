'use strict';

window.showCard = function (dialog, pinOffer) {
  dialog.classList.remove('invisible');

  dialog.querySelector('img[alt="Avatar"]').src = pinOffer.author.avatar;
  dialog.querySelector('lodge__title').innerText = pinOffer.offer.title;
  dialog.querySelector('lodge__address').innerText = pinOffer.offer.address;
  dialog.querySelector('lodge__price').innerHTML = pinOffer.offer.price + '&#x20bd;/ночь';
  dialog.querySelector('lodge__type').innerText = pinOffer.offer.type;
  dialog.querySelector('lodge__rooms-and-guests').innerHTML = pinOffer.offer.rooms + 'комнаты для' + pinOffer.offer.guests + 'гостей';
  dialog.querySelector('lodge__checkin-time').innerHTML = 'Заезд после' + pinOffer.offer.checkin + ', выезд до ' + pinOffer.offer.checkout;

}
