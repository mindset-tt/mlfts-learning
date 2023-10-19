(function() {
    'use strict'

    kintone.events.on('app.record.index.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'name': 'Hi Kintone',
            'description': 'Here is app description.',
            'icon': {
                'type': 'PRESET',
                'key': 'APP79'
              },
            'theme': 'BLACK'
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/settings.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();