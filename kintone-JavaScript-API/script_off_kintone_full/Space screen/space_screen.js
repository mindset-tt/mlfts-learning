(function() {
    'use strict';

    kintone.events.on('space.portal.show',(event) => {
        console.log(event);  
        alert('Hello space portal'); 
    });
    
  })();