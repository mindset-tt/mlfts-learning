(function() {
    'use strict';
    // ເຫດການເກິດຂື້ນເມື່ອມີການເປິດໜ້າ index ຂື້ນມາ.
    //event occurs when the index page is open
    kintone.events.on('app.record.index.show', (event) => {
      console.log(event);  
      console.log("Onload Event");   
    });

    // ເຫດການເກິດຂື້ນເມື່ອກົດແກ້ໄຂຢູ່ໜ້າ index
    //event occurs when you click edit on the index page
    kintone.events.on('app.record.index.edit.show', (event) => {
        console.log("Inline Edit Event");   
        console.log(event);  

    });

    // ເຫດການເກິດຂື້ນເມື່ອກົດບັນທຶກການແກ້ໄຂຢູ່ໜ້າ index
    //event occurs when you click save edits on the index page
    kintone.events.on('app.record.index.edit.submit', (event) => {
        console.log(event);  
        console.log("Save Submit Event");   
    });

    // ເຫດການເກິດຂື້ນເມື່ອບັນທຶກການແກ້ໄຂຢູ່ໜ້າ index ສຳເລັດແລ້ວ
    //event that occurs when saving a modification to the index page is complete
    kintone.events.on('app.record.index.edit.submit.success',(event) => {
        console.log(event);  
        console.log("Save Submit Success Event");   
    });

    //ເຫດການເກິດຂື້ນເມື່ອມີການປ່ຽນແປງຂໍ້ມູນໃນ field Dropdown
    //event occurs when the data in the Dropdown field is changed
    kintone.events.on('app.record.index.edit.change.dropdown_0', function(event) {
        console.log(event);  
        console.log("Field Change Event");
      });

    //ການເກິດຂື້ນເມື່ອມີກົດລົບຂໍ້ມູນຢູ່ໜ້າ index
    //Event occurs when there is a delete button on the index page
    kintone.events.on('app.record.index.delete.submit',(event) => {
        console.log(event);  
        console.log("Delete Submit Event");   
    });


  })();