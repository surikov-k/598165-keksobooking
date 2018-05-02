'use strict';

(function () {
  var renderCard = function (n) {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);
    card.setAttribute('data-card-number', n);
    card.querySelector('.popup__title').textContent = window.data.offers[n].offer.title;
    card.querySelector('.popup__text--address').textContent = window.data.offers[n].offer.address;
    card.querySelector('.popup__text--price').textContent = window.data.offers[n].offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = window.data.typeRussianList[window.data.offers[n].offer.type];
    card.querySelector('.popup__text--capacity').textContent = window.data.offers[n].offer.rooms + ' комнаты для ' + window.data.offers[n].offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.data.offers[n].offer.checkin + ', выезд до ' + window.data.offers[n].offer.checkout;

    card.querySelector('.popup__features').innerHTML = '';
    var featuresPopup = card.querySelector('.popup__features');
    for (var i = 0; i < window.data.offers[n].offer.features.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + window.data.offers[n].offer.features[i]);
      featuresPopup.appendChild(featureItem);
    }

    card.querySelector('.popup__description').textContent = window.data.offers[n].offer.description;

    var photoTemplate = card.querySelector('.popup__photo');
    card.querySelector('.popup__photos').innerHTML = '';
    var offerPhotos = card.querySelector('.popup__photos');
    for (i = 0; i < window.data.offers[n].offer.photos.length; i++) {
      var offerImage = photoTemplate.cloneNode(true);
      offerImage.src = window.data.offers[n].offer.photos[i];
      offerPhotos.appendChild(offerImage);
    }

    card.querySelector('.popup__avatar').src = window.data.offers[n].author.avatar;

    var map = document.querySelector('.map');
    var filters = map.querySelector('.map__filters-container');
    map.insertBefore(card, filters);
    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      card.remove();
    });
  };
  window.card = {
    renderCard: renderCard
  };
})();
