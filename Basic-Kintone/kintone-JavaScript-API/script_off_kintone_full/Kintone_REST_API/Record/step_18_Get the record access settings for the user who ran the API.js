(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        const body = {
            'app': kintone.app.getId(),
            'ids': [1, 2]
          };
          
          await kintone.api(kintone.api.url('/k/v1/records/acl/evaluate.json', true), 'GET', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });


    })
})();