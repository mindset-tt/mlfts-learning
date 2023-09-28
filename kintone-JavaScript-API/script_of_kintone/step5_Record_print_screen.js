(()=>{
    //After displaying the print record screen
    kintone.events.on('app.record.print.show', (event) => {
        console.log(event);
    })
})();