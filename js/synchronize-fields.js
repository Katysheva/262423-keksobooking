'use strict';

function synchronizeFields(fieldIn, fieldOut, valuesIn, valuesOut, propName ) {
  fieldIn.addEventListener('change', function () {
    fieldOut[propName] = valuesOut[valuesIn.indexOf(fieldIn.value)];
  });
}
