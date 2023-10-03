(function(){
    'use strict'
    // ເຫດການເກິດຂື້ນເມື່ອເປີດໜ້າ detail 
    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);
        // ຄຳສັງເຊື່ອງ input ທີ່ມີ fidle id Radio_button
        kintone.app.record.setFieldShown('Radio_button', false);
    });

})();