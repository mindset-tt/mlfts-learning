(()=>{
    'use strict'
    kintone.events.on('app.record.edit.show', (event) => {
        console.log(event);
    });

    kintone.events.on('app.record.edit.change.Date', (event) => {
        console.log(event);
    });

    kintone.events.on('app.record.edit.submit', (event) => {
        console.log(event);
    });

    kintone.events.on('app.record.edit.submit.success', (event) => {
        console.log(event);
    });
})();