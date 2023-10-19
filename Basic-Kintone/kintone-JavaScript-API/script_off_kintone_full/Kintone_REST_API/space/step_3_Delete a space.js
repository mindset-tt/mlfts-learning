(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        var body = {
            'id': 1
          };
          
          kintone.api(kintone.api.url('/k/v1/space.json', true), 'DELETE', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });
       

    })
})();