'use strict';

(function () {

  var pinTemplate = document.querySelector('template')
      .content.querySelector('.map__pin');
  var pinImg = pinTemplate.querySelector('img');
  var deltaX = pinImg.width / 2;
  var deltaY = pinImg.height;
  var pins = [];

  for (var i = 0; i < window.data.offers.length; i++) {
    pins[i] = pinTemplate.cloneNode(true);

    pins[i].style.left = window.data.offers[i].location.x - deltaX + 'px';
    pins[i].style.top = window.data.offers[i].location.y - deltaY + 'px';
    pins[i].querySelector('img').src = window.data.offers[i].author.avatar;
    pins[i].querySelector('img').alt = window.data.offers[i].offer.title;
    pins[i].setAttribute('data-pin-number', i);
  }

  var fragment = document.createDocumentFragment();

  for (i = 0; i < pins.length; i++) {
    fragment.appendChild(pins[i]);
  }

  var activatePage = function () {
    var adFormElements = document.querySelector('.ad-form').querySelectorAll('fieldset');
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    for (i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }

    document.querySelector('.map__pins').appendChild(fragment);
    window.pin.mapPinMain.removeEventListener('mouseup', activatePage);
  };

  window.pin.mapPinMain.addEventListener('mouseup', activatePage);

  var onPinClick = function (evt) {
    var target = evt.target;
    if (target.parentNode.matches('.map__pin') && !target.parentNode.matches('.map__pin--main')) {
      var offerNumber = target.parentNode.getAttribute('data-pin-number');
      window.card.renderCard(offerNumber);
    }
  };

  var mapPins = document.querySelector('.map__pins');
  mapPins.addEventListener('click', onPinClick);
})();
