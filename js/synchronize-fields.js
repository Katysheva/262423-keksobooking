'use strict';

window.synchronizeFields = function (fieldIn, fieldOut, valuesIn, valuesOut, callback) {
  fieldIn.addEventListener('change', function () {
    if (typeof callBack === 'function') {
      callback(fieldOut, valuesOut[valuesIn.indexOf(fieldIn.value)]);
    }
  });
};
