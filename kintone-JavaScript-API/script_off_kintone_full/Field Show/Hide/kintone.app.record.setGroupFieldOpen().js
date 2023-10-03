(function(){
    'use strict'
    // ເຫດການເກິດຂື້ນເມື່ອກົດປ່ຽນສະຖານະ Radio_button ຢູ່ໜ້າ create 
    kintone.events.on('app.record.create.change.Radio_button', (event) => {
        console.log(event);
        // ສ້າງຕົວປ່ຽນ record ເພື່ອເກັບກຳຂໍ້ມູນ id recrod
        var record = event.record;
        console.log(record);
        // ສ່າງຕົວປ່ຽນ radioButtonValue ເພື່ອເກັບກຳເອົາຂໍ້ມູນ ການເລື້ອກ Redio Button
        var radioButtonValue = record.Radio_button.value;
        console.log(radioButtonValue);
        // ສ້າງ ຕົວປ່ຽນ group1 group2 group3 ເພື່ອເກັບກຳຂໍ້ມູນວ່າ ເມືື່ອມີການເລື້ອກແທ້ຫຼືບໍ້ ຖ່າຫາກມີການເລື້ອກຈະສະແດງ true ຖ້າບໍ່ false 
        var group1 = radioButtonValue === 'Redio1';
        var group2 = radioButtonValue === 'Redio2';
        var group3 = radioButtonValue === 'Redio3';
        // console.log(group1);
        // console.log(group2);
        // console.log(group3);

        kintone.app.record.setGroupFieldOpen('Radio_button', group1);
        kintone.app.record.setGroupFieldOpen('Radio_button', group2);
        kintone.app.record.setGroupFieldOpen('Radio_button', group3);

        return event;
        
    });
})();