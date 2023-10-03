(function(){
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        kintone.proxy('https://api.exchangerate-api.com/v4/latest/USD', 'GET', {}, {}, (body, status, headers) => {
            // success
            console.log(status, JSON.parse(body), headers);
          }, (error) => {
            // error
            console.log(error); // proxy APIのレスポンスボディ(文字列)を表示
          });

    });

})();