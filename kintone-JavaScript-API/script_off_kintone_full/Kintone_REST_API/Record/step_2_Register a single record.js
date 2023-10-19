(function() {
    'use strict'
  
    kintone.events.on('app.record.index.show', async (event) => {
      console.log(event);

      var body = {
        'app': kintone.app.getId(),
        //ສ້າງຕົວປ່ຽນເພື່ອ Query ຂໍ້ມູນຈາກ kintone api ເພື່ອຂໍ້ມູນ ຄົນທີ່ສ້າງແມ່ນໃຜ ແລະ ຄົນທີ່ສ້າງພາຍໃນມື້ນີ້ ໃຫ້ຄົນຫາຂໍ້ມູນຈາກ $id, limit ບໍ່ໃຫ່້ເກິນ 100
        'fields': ['$id', 'Date', 'Created_by', 'name'],
        'query': 'Date_and_time < YESTERDAY()',
        'size' : '500'
      };
      
      kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body, function(resp) {
        // success
        console.log(resp);
      }, function(error) {
        // error
        console.log(error);
      });
  
    })
})();