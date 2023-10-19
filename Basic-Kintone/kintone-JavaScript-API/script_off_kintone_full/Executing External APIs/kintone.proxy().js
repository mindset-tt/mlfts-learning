(function(){
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        kintone.proxy('https://api.exchangerate-api.com/v4/latest/USD', 'GET', {}, {}, (body, status, headers) => {
            // success
            console.log(status, JSON.parse(body), headers);
          }, (error) => {
            // error
            console.log(error);
          });

    });

})();