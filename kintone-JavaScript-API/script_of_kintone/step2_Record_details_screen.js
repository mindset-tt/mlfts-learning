(()=>{
    //app.record.detail.show
    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);
    });
    //Before you delete a record
    kintone.events.on('app.record.detail.delete.submit', (event) => {
        console.log(event);
    });
    //When you perform a process management action
    kintone.events.on('app.record.detail.process.proceed', (event) => {
        console.log(event);
    });

})();