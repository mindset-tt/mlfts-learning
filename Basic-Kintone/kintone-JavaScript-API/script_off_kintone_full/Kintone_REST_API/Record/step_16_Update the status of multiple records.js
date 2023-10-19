(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'records': [
              {
                'id': 1,
                'action': 'Start',
                'assignee': 'nonthawatzaiyasan@gmail.com'
              }
            ]
          };
          
          kintone.api(kintone.api.url('/k/v1/records/status.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });


    })
})();