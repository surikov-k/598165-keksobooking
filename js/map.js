'use strict';
var AVATAR_IMG_URL = 'img/avatars/user0';
var PHOTOS_IMG_URL = 'http://o0.github.io/assets/images/tokyo/hotel';
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 150;
var MAP_MAX_X = 1200;
var MAP_MAX_Y = 750;
var MAX_Y = 500;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var TOTAL_OFFERS = 8;
var PIN_LEG_HEIGHT = 22;

var offers = [];
var avatarList = [];
var titlesList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var typeRussianList = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var checkinCheckoutList = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [];

for (var i = 0; i < 8; i++) {
  avatarList[i] = AVATAR_IMG_URL + (i + 1) + '.png';
}

for (i = 0; i < 3; i++) {
  photos[i] = PHOTOS_IMG_URL + (i + 1) + '.jpg';
}

var shuffleArray = function (array) {
  for (var shuffleIdx = array.length - 1; shuffleIdx > 0; shuffleIdx--) {
    var randomIndex = Math.floor(Math.random() * (shuffleIdx + 1));
    var temp = array[shuffleIdx];
    array[shuffleIdx] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
};

avatarList = shuffleArray(avatarList);
titlesList = shuffleArray(titlesList);

var randomInt = function (min, max) {
  var rnd = min + Math.random() * (max + 1 - min);
  return Math.floor(rnd);
};

var getRandomFromArray = function (array) {
  return array[randomInt(0, array.length - 1)];
};

var generateFeatures = function () {
  var randomFeatures = shuffleArray(featuresList);
  var featuresLength = randomInt(1, featuresList.length - 1);
  var featuresArray = [];
  for (var genaratorIdx = 0; genaratorIdx < featuresLength; genaratorIdx++) {
    featuresArray[genaratorIdx] = randomFeatures[genaratorIdx];
  }
  return featuresArray;
};

var generateOffers = function (totalOffers) {
  for (i = 0; i < totalOffers; i++) {
    offers[i] = {};
    offers[i].author = {};
    offers[i].author.avatar = avatarList[i];

    offers[i].location = {};
    offers[i].location.x = randomInt(MIN_X, MAX_X);
    offers[i].location.y = randomInt(MIN_Y, MAX_Y);

    offers[i].offer = {};
    offers[i].offer.title = titlesList[i];
    offers[i].offer.address = offers[i].location.x + ', ' + offers[i].location.y;
    offers[i].offer.price = randomInt(MIN_PRICE, MAX_PRICE);
    offers[i].offer.type = getRandomFromArray(typeList);
    offers[i].offer.rooms = randomInt(MIN_ROOMS, MAX_ROOMS);
    offers[i].offer.guests = offers[i].offer.rooms * randomInt(1, 3);
    offers[i].offer.checkin = getRandomFromArray(checkinCheckoutList);
    offers[i].offer.checkout = getRandomFromArray(checkinCheckoutList);
    offers[i].offer.features = generateFeatures();
    offers[i].description = '';
    offers[i].offer.photos = shuffleArray(photos);
  }
};

generateOffers(TOTAL_OFFERS);

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinImg = pinTemplate.querySelector('img');
var deltaX = pinImg.width / 2;
var deltaY = pinImg.height;
var pins = [];

for (i = 0; i < offers.length; i++) {
  pins[i] = pinTemplate.cloneNode(true);

  pins[i].style.left = offers[i].location.x - deltaX + 'px';
  pins[i].style.top = offers[i].location.y - deltaY + 'px';
  pins[i].querySelector('img').src = offers[i].author.avatar;
  pins[i].querySelector('img').alt = offers[i].offer.title;
  pins[i].setAttribute('data-pin-number', i);
}

var fragment = document.createDocumentFragment();

for (i = 0; i < pins.length; i++) {
  fragment.appendChild(pins[i]);
}

var renderCard = function (n) {
  if (document.querySelector('.map__card')) {
    document.querySelector('.map__card').remove();
  }
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);
  card.setAttribute('data-card-number', n);
  card.querySelector('.popup__title').textContent = offers[n].offer.title;
  card.querySelector('.popup__text--address').textContent = offers[n].offer.address;
  card.querySelector('.popup__text--price').textContent = offers[n].offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = typeRussianList[offers[n].offer.type];
  card.querySelector('.popup__text--capacity').textContent = offers[n].offer.rooms + ' комнаты для ' + offers[n].offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[n].offer.checkin + ', выезд до ' + offers[n].offer.checkout;

  card.querySelector('.popup__features').innerHTML = '';
  var featuresPopup = card.querySelector('.popup__features');
  for (i = 0; i < offers[n].offer.features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + offers[n].offer.features[i]);
    featuresPopup.appendChild(featureItem);
  }

  card.querySelector('.popup__description').textContent = offers[n].offer.description;

  var photoTemplate = card.querySelector('.popup__photo');
  card.querySelector('.popup__photos').innerHTML = '';
  var offerPhotos = card.querySelector('.popup__photos');
  for (i = 0; i < offers[n].offer.photos.length; i++) {
    var offerImage = photoTemplate.cloneNode(true);
    offerImage.src = offers[n].offer.photos[i];
    offerPhotos.appendChild(offerImage);
  }

  card.querySelector('.popup__avatar').src = offers[n].author.avatar;

  var map = document.querySelector('.map');
  var filters = map.querySelector('.map__filters-container');
  map.insertBefore(card, filters);
  var closeButton = document.querySelector('.popup__close');
  closeButton.addEventListener('click', function () {
    card.remove();
  });
};


var disableForm = function () {
  var adFormElements = document.querySelector('.ad-form').querySelectorAll('fieldset');
  for (i = 0; i < adFormElements.length; i++) {
    adFormElements[i].setAttribute('disabled', 'disabled');
  }
};

disableForm();

var activatePage = function () {
  var adFormElements = document.querySelector('.ad-form').querySelectorAll('fieldset');
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  for (i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }
  document.querySelector('.map__pins').appendChild(fragment);
};


var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

var getPinDimension = function (pin) {
  var pinDimension = {
    width: pin.getBoundingClientRect().width,
    height: pin.getBoundingClientRect().height,
    borderWidth: parseInt(window.getComputedStyle(pin.querySelector('img')).getPropertyValue('border-top-width'), 10)
  };
  return pinDimension;
};

var getPinCoords = function (pin) {
  var mapCoords = getCoords(document.querySelector('.map__overlay'));
  var pinCoords = getCoords(pin);
  var pinDimension = getPinDimension(pin);

  return {
    x: Math.floor(pinCoords.left - mapCoords.left + pinDimension.width / 2),
    y: Math.floor(pinCoords.top - mapCoords.top + pinDimension.height - pinDimension.borderWidth * 2 + PIN_LEG_HEIGHT)
  };
};


var mapPinMain = document.querySelector('.map__pin--main');
var addressField = document.querySelector('input[name="address"]');

var fillAddressField = function (pin) {
  var coords = getPinCoords(pin);
  addressField.value = coords.x + ', ' + coords.y;
};

fillAddressField(mapPinMain);

mapPinMain.addEventListener('mousedown', function (evt) {

  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {

    moveEvt.preventDefault();

    fillAddressField(mapPinMain);

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (getPinCoords(mapPinMain).x < 0) {
      mapPinMain.style.left = 0 - getPinDimension(mapPinMain).width / 2 + 'px';
    } else
    if (getPinCoords(mapPinMain).x > MAP_MAX_X) {
      mapPinMain.style.left = MAP_MAX_X - getPinDimension(mapPinMain).width / 2 + 'px';
    } else {
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }

    if (getCoords(mapPinMain).top < 0) {
      mapPinMain.style.top = 0 + getPinDimension(mapPinMain).borderWidth + 'px';
    }

    if (getPinCoords(mapPinMain).y > MAP_MAX_Y) {
      mapPinMain.style.top = (MAP_MAX_Y - (getPinDimension(mapPinMain).height - getPinDimension(mapPinMain).borderWidth * 2 + PIN_LEG_HEIGHT)) + 'px';
    } else {
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    }


  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

mapPinMain.addEventListener('mouseup', function () {
  activatePage();
});

var onPinClick = function (evt) {
  var target = evt.target;
  if (target.parentNode.matches('.map__pin') && !target.parentNode.matches('.map__pin--main')) {
    var offerNumber = target.parentNode.getAttribute('data-pin-number');
    renderCard(offerNumber);

  }
};

var mapPins = document.querySelector('.map__pins');
mapPins.addEventListener('click', onPinClick);


var priceInput = document.getElementById('price');
var typeSelect = document.getElementById('type');
typeSelect.addEventListener('change', function (evt) {
  if (evt.target.value === 'flat') {
    priceInput.placeholder = '1000';
    priceInput.min = 1000;
  } else
  if (evt.target.value === 'bungalo') {
    priceInput.placeholder = '0';
    priceInput.min = 0;
  } else
  if (evt.target.value === 'house') {
    priceInput.placeholder = '5000';
    priceInput.min = 5000;
  } else
  if (evt.target.value === 'palace') {
    priceInput.placeholder = '10000';
    priceInput.min = 10000;
  }
});

var timeInSelect = document.getElementById('timein');
var timeOutSelect = document.getElementById('timeout');
timeInSelect .addEventListener('change', function (evt) {
  timeOutSelect.value = evt.target.value;
});
timeOutSelect.addEventListener('change', function (evt) {
  timeInSelect.value = evt.target.value;
});

var capacitySelect = document.getElementById('capacity');
var roomNumberSelect = document.getElementById('room_number');

var checkCapacitySelectValidity = function () {
  var rooms = roomNumberSelect.value;
  var capacity = capacitySelect.value;

  if (rooms === '1' && capacity !== '1') {
    capacitySelect.setCustomValidity('Число гостей не больше одного');
  } else
  if (rooms === '2' &&
      !(capacity === '1' || capacity === '2')) {
    capacitySelect.setCustomValidity('Число гостей не больше двух');
  } else
  if (rooms === '3' &&
      !(capacity === '1' || capacity === '2' || capacity === '3')) {
    capacitySelect.setCustomValidity('Число гостей не больше трех');
  } else
  if (rooms === '100' && capacity !== '0') {
    capacitySelect.setCustomValidity('Без гостей');
  } else {
    capacitySelect.setCustomValidity('');
  }
};

var submit = document.querySelector('.ad-form__submit');

submit.addEventListener('click', checkCapacitySelectValidity);
