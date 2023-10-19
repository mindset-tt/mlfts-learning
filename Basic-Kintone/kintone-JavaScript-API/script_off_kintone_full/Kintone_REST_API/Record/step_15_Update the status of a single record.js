(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        var body = {
            app: kintone.app.getId(),
            id: kintone.app.record.getId(),
            action: 'Completed',
            assignee: 'nonthawatzaiyasan@gmail.com'
          };
          console.log(body.app);
          console.log(body.id);
          
          kintone.api(kintone.api.url('/k/v1/record/status.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });


    })
})();