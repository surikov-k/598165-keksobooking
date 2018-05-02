'use strict';

(function () {
  window.form = {};

  var disableForm = function () {
    var adFormElements = document.querySelector('.ad-form').querySelectorAll('fieldset');
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    }
  };

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

  disableForm();


  var fillAddressField = function (pin) {
    var addressField = document.querySelector('input[name="address"]');
    var coords = window.pin.getPinCoords(pin);
    addressField.value = coords.x + ', ' + coords.y;
  };

  fillAddressField(window.pin.mapPinMain);


  submit.addEventListener('click', checkCapacitySelectValidity);
  window.form.fillAddressField = fillAddressField;
})();
