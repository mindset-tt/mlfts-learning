(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'apps': [1, 2]
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/deploy.json', true), 'GET', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();