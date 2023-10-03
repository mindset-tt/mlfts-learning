(function() {
    'use strict'
  
    kintone.events.on('app.record.detail.show', async (event) => {
      console.log(event);


      var body = {
        app: 2
      };
      
    //   kintone.api(kintone.api.url('/k/v1/space/members.json', true), 'GET', body, function(resp) {
    //     // success
    //     console.log(resp);
    //   }, function(error) {
    //     // error
    //     console.log(error);
    //   });
    let fields = await kintone.api(kintone.api.url('/k/v1/space.json', true), 'GET', body);
    console.log(fields);
  
      })
  
  })();