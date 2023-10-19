(function() {
    'use strict';

    kintone.events.on('app.report.show',(event) => {
        console.log(event);  
        alert('report show');
        console.log("Onload Event print");   
    });
    
  })();