(function() {
    'use strict'
    //ເມື່ອມີການເປິດໜ້າ detail ຈະເພີ່ມຂໍ້ມູນໃສ່ຢູ່ໜ້າ index 
    kintone.events.on('app.record.detail.show', async (event) => {
      console.log(event);

      var body = {
        'app': kintone.app.getId(),
        'record': {
          'name': {
            'value': 'Sample'
          },
          'lname': {
            'value': 'Sample'
          }
        }
      };
      
      kintone.api(kintone.api.url('/k/v1/record.json', true), 'POST', body, function(resp) {
        // success
        console.log(resp);
      }, function(error) {
        // error
        console.log(error);
      });
  
    })
})();