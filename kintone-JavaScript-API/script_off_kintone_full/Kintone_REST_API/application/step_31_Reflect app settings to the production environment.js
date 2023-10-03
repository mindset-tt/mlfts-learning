(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'apps': [
              {
                'app': kintone.app.getId(),
              }
            ],
            'revert': true
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/deploy.json', true), 'POST', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();