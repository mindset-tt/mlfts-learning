(function() {
    'use strict';
    // ເຫດການເກິດຂື້ນເມື່ອມີການກົດແກ້ໄຂຂໍ້ມູນຢູ່ໜ້າ detail.show
    // event occurs when the edit information is clicked on the detail.show pa
    kintone.events.on('app.record.edit.show', (event) => {
        console.log(event);
        console.log("Onload Event Edit");
    });

    // ເຫດການເກິດຂື້ນເມື່ອມີການກົດບັນທຶກການແກ້ໄຂຢູ່ໜ້າ Edit
    // event occurs when a save edit is clicked on the Edit page
    kintone.events.on('app.record.edit.submit', (event) => {
        console.log(event);
        console.log("Submit edit record");
    });

    // ເຫດການເກິດຂື້ນເມື່ອມີການກົດບັນທຶກການແກ້ໄຂຢູ່ໜ້າ Edit ສຳເລັດແລ້ວ
    // event occurs when a save edit is clicked on the Edit page
    kintone.events.on('app.record.edit.submit.success', (event) => {
        console.log(event);
        console.log("Save Submit Success Event");
        var record = event.record;
        alert('ແກ້ໄຂຂໍ້ມູນຂອງ ' + record.Text.value + '. ສຳເລັດແລ້ວ');
    });


    // ເຫດການເກິດຂື້ນເມື່ອມີການປ່ຽນແປງ dropdown_0 ຢູ່ໜ້າ edit
    // event occurs when the dropdown_0 is changed on the edit page
    kintone.events.on('app.record.edit.change.dropdown_0', (event) => {
        console.log(event);
        console.log("Field Change Event Edit");
    });

  })();