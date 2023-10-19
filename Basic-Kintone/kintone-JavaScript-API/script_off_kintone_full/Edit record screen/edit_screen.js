(function() {
    'use strict';

    // ເຫດການເກິດຂື້ນເມື່ອມີການກົດແກ້ໄຂຂໍ້ມູນຢູ່ໜ້າ detail.show
    // event occurs when the edit information is clicked on the detail.show pa
    kintone.events.on('app.record.edit.show', (event) => {
        console.log(event);
        console.log("Onload Event Edit");
    });

    kintone.events.on('app.record.edit.change.dropdown_0', (event) => {
        console.log(event);
        console.log("Field Change Event");
    });

    // ເຫດການເກິດຂື້ນເມື່ອມີການກົດບັນທຶກການແກ້ໄຂຢູ່ໜ້າ Edit
    // event occurs when a save edit is clicked on the Edit page
    kintone.events.on('app.record.edit.submit', (event) => {
        console.log(event);
        console.log("Submit edit record");
    });


    kintone.events.on('app.record.create.edit.success', (event) => {
        console.log(event);
        console.log("Save edit Success Event");
        var record = event.record;
        alert('Project Name is ' + record.Text.value + '.');
    });


  })();