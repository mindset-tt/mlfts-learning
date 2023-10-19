(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'lang': 'en'
          };
          
          kintone.api(kintone.api.url('/k/v1/app/reports.json', true), 'GET', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();