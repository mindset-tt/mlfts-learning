(function() {
    'use strict'

    kintone.events.on('app.record.edit.show', function(event) {
        // console.log(event);
        var record = event.record;
        console.log(record);
        
        // Set multiple field values
        record.name.value = 'Field Value1';
        record.Lname.value = 'Field Value 2';
      
        // Save the modified record
        // kintone.app.record.set();
        
        return event;
      });

})();