'use strict';

(function () {
  var AVATAR_IMG_URL = 'img/avatars/user0';
  var PHOTOS_IMG_URL = 'http://o0.github.io/assets/images/tokyo/hotel';
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 150;

  var MAX_Y = 500;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var TOTAL_OFFERS = 8;

  var offers = [];
  window.data = {};
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
  window.data.typeRussianList = typeRussianList;
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
  window.data.offers = offers;
})();
