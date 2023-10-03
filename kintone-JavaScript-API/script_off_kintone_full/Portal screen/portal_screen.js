(function() {
    'use strict';

    kintone.events.on('portal.show',(event) => {
        console.log(event);  
        alert('Hello Kintone'); 
    });
    
  })();