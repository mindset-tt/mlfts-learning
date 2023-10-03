(function() {
    'use strict';

    kintone.events.on('app.record.print.show',(event) => {
        console.log(event);  
        alert('print show');
        console.log("Onload Event print");   
    });
  })();