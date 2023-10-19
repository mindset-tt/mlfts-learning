(function() {
    'use strict'
  
    kintone.events.on('app.record.index.show', async (event) => {
      console.log(event);
  
      var body = {
        'app': kintone.app.getId(),
        'query': 'Created_by in (LOGINUSER()) and Created_datetime = TODAY() order by $id asc',
        'fields': ['$id', 'Created_by', 'Created_datetime']
      };
      kintone.api(kintone.api.url('/k/v1/records/cursor.json', true), 'POST', body, function(resp) {
        // success
        console.log(resp);
      }, function(error) {
        // error
        console.log(error);
      });
  
    })
})();