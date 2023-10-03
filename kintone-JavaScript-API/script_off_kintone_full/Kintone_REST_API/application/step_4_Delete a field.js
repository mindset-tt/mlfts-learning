(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'fields': [
              'Date_and_time'
            ]
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/form/fields.json', true), 'DELETE', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    })

})();