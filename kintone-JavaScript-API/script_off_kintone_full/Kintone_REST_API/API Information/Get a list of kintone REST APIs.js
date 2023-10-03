(function (){
    'use starct'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        kintone.api(kintone.api.url('/k/v1/apis.json', true), 'GET', {}, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    })

})();