(function() {
    'use strict';

    // ເຫດການເກິດຂື້ນເມື່ອມີການກົດເພີ່ມຂໍ້ມມູນ
    //event occurs when an add data is clicked
    kintone.events.on('app.record.create.show',(event) => {
        console.log(event);  
        console.log("Onload Event Create");   
    });

    //ເຫດການເກິດຂື້ນເມື່ອມີການກົດບັນທຶກຢູ່ໜ້າ create (ໜ້າບັນທຶກຂໍ້ມູນ)
    //Event occurs when save is clicked on the create page (ໜ້າບັນທຶກຂໍ້ມູນ)
    kintone.events.on('app.record.create.submit',(event) => {
        console.log(event);  
        console.log("Save Submit Event");
    });

    //ເຫດການເກິດຂື້ນເມື່ອມີການບັນທຶກສຳເລັດ
    // event that occurs when a recording is completed
    kintone.events.on('app.record.create.submit.success', (event) => {
        console.log(event);
        console.log("Save Submit Success Event");
        var record = event.record;
        alert('Project Name is ' + record.Text.value + '.');
    });

    // ເຫດການເກິດຂື້ນເມື່ອເຮົາເມື່ອມີການປ່ຽນແປ່ງ dropdown_01 ຢູ່ໜ້າ create
    // event occurs when we change dropdown_01 on the create page
    kintone.events.on('app.record.create.change.dropdown_0', (event) => {
        console.log(event);
        console.log("Field Change Event");
    });



  })();