(() => {

    //After displaying the Add Record screen
    kintone.events.on('app.record.create.show', (event) => {
        console.log(event);
    });
    //When you change the value of a field
    kintone.events.on('app.record.create.change.Date', (event) => {
        console.log(event);
    });
    //When saving
    kintone.events.on('app.record.create.submit', (event) => {
        console.log(event);
    });
    //After a successful save
    kintone.events.on('app.record.create.submit.success', (event) => {
        console.log(event);
    })
})();