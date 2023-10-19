(function() {
    'use strict'

    kintone.events.on('app.record.index.show', (event) => {
        console.log(event);
        var body = {
            'app': kintone.app.getId(),
            'lang': 'en'
          };
          
          kintone.api(kintone.api.url('/k/v1/app/settings.json', true), 'GET', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();