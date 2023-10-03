(function() {
    'use strict';

    //ເຫດການເກິດຂື້ນເມື່ອມີການສະແດງຜົນ graph ອອກມາ
    //event occurs when the graph is displayed
    kintone.events.on('app.report.show', (event) => {
        console.log(event);
        console.log("Graph Display Event");
    })

  })();