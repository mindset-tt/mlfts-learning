(function () {
    'use strict'

    kintone.events.on('app.record.form.show', (event) => {
        console.log(event);
        var body = {
            'app': kintone.app.getId(),
            'properties': {
              'Number': {
                'type': 'NUMBER',
                'code': 'Ages',
                'label': 'Ages',
                'noLabel': false,
                'required': false,
                'unique': false,
                'maxValue': 64,
                'minValue': 0,
                'defaultValue': '12345',
                'digit': true,
                'displayScale': '',
                'expression': '',
                'unit': '$',
                'unitPosition': 'BEFORE'
              }
            }
          };
          kintone.api(kintone.api.url('/k/v1/preview/app/form/fields.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();