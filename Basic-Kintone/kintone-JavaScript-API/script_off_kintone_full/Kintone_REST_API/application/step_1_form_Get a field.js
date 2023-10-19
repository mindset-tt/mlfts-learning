(function (){
    'use starct'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);
          var body = {
            id: kintone.app.getId()
          };
          console.log(body.id);

          kintone.api(kintone.api.url('/k/v1/app.json', true), 'GET', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });
    })

})();