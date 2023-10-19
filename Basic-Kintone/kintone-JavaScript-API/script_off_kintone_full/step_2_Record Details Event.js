(function() {
    'use strict';

    //ເຫດການເກິດຂື່ນເມື່ອມີການກົດເບິ່ງ Detail ຢູ່ໜ້າ indext
    //event occurs when clicking on View Detail on the indext page
    kintone.events.on('app.record.detail.show',(event) => {
        console.log(event);  
        console.log("Onload Event Detail.show");   
    });
    
    //ເຫດການເກິດຂື້ນເມື່ອມີການ Delete Detail 
    //event occurs when there is a Delete Detail
    kintone.events.on('app.record.detail.delete.submit',(event) => {
        console.log(event);  
        console.log("Delete Submit Event Detail");   
    });

    // ເຫດການເກິດຂື້ນເມື່ອມີການປ່ຽນສະຖານະ process 
    //event occurs when the OK button is pressed to change the status
    kintone.events.on('app.record.detail.process.proceed',(event) => {
        console.log(event);  
        console.log("Proceed Process Event Detail");   
    });


  })();