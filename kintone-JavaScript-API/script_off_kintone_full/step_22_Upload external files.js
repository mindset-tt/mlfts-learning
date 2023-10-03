(function(){
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        const blob = new Blob(['Hello Kintone!'], {
            type: 'text/plain',
          });
          const data = {
            format: 'RAW',
            value: blob
          };
          
          kintone.proxy.upload('https://api.exchangerate-api.com/v4/latest/USD', 'POST', {}, data, (body, status, headers) => {
            // success
            console.log(status, JSON.parse(body), headers); 
          }, (error) => {
            // error
            console.log(error); // proxy APIのレスポンスボディ(文字列)を表示
          });
        return event;
    });

})();