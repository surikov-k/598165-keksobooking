'use strict';

(function () {
  var PIN_LEG_HEIGHT = 22;
  var MAP_MAX_X = 1200;
  var MAP_MAX_Y = 750;

  window.pin = {};

  var mapPinMain = document.querySelector('.map__pin--main');

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

  mapPinMain.addEventListener('mousedown', function (evt) {

    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      window.form.fillAddressField(mapPinMain);

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


  window.pin.mapPinMain = mapPinMain;
  window.pin.getPinCoords = getPinCoords;

})();
