'use strict';

window.showCard = (function () {

  return function (dialog, elem, pinOffersList) {

    if (pinOffersList && pinOffersList.length > 0) {

      for (var i = 0; i < pinOffersList.length; i++) {

        var pinOffer;

        if (i === Math.floor(elem.dataset.itemIndex)) {
          pinOffer = pinOffersList[i];
        }
      }

      dialog.classList.remove('invisible');

      dialog.querySelector('img[alt="Avatar"]').src = pinOffer.author.avatar;
      dialog.querySelector('.lodge__title').innerText = pinOffer.offer.title;
      dialog.querySelector('.lodge__address').innerText = pinOffer.offer.address;
      dialog.querySelector('.lodge__price').innerHTML = pinOffer.offer.price + '&#x20bd;/ночь';
      dialog.querySelector('.lodge__type').innerText = pinOffer.offer.type;
      dialog.querySelector('.lodge__rooms-and-guests').innerHTML = pinOffer.offer.rooms + ' комнаты для ' + pinOffer.offer.guests + ' гостей';
      dialog.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + pinOffer.offer.checkin + ', выезд до ' + pinOffer.offer.checkout;
      dialog.querySelector('.lodge__description').innerHTML = pinOffer.offer.description;

      // show features

      var features = dialog.querySelector('.lodge__features');
      features.innerHTML = '';

      var curFeature;
      pinOffer.offer.features.forEach(function (item) {

        curFeature = document.createElement('span');

        curFeature.className = 'feature__image';
        curFeature.classList.add('feature__image--' + item);

        features.appendChild(curFeature);
      });

      // show photos

      var photos = dialog.querySelector('.lodge__photos');
      photos.innerHTML = '';

      pinOffer.offer.photos.forEach(function (item) {
        showPhoto(item, photos);
      });
    }
  };

  function showPhoto(imgSrc, photos) {
    var templateElement = document.querySelector('#lodge-photos-template');
    templateElement.content.querySelector('img').src = imgSrc;

    photos.appendChild(templateElement.content.cloneNode(true));
  }
})();
