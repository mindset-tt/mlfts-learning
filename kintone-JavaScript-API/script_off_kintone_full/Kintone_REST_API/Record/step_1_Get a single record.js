(function() {
    'use strict'
  
    kintone.events.on('app.record.detail.show', async (event) => {
      console.log(event);
  
      var body = {
        'app': kintone.app.getId(),
        'id': 1
      };
      
      kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', body, function(resp) {
        // success
        console.log(resp);
      }, function(error) {
        // error
        console.log(error);
      });
  
    })
})();