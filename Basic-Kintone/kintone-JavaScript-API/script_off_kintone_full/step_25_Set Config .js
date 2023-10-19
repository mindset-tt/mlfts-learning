(function(){
    'use strict'
        
      kintone.events.on('app.record.detail.show', (event) => {
        const record = event.record;
        // console.log(record);

        const body = {
            app: kintone.app.getId(),
            id: 1
          };

          return new kintone.Promise((resolve, reject) => {
            console.log(resolve);
            console.log(reject);
            kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body, (resp) => {
                console.log(resp);
               const recordss = record['Fname'].value = record['Lname'].value;
               console.log(recordss);
                // resolve(event);
            });

        //   kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', body).then((resp) => {
        //     console.log(resp);
        //     record['name'].value = resp.record['lname'].value;
        //     resolve(event);
        //   });
        });
        
      });

})();