(()=>{
    //After displaying the graph screen
    kintone.events.on('app.report.show', (event) => {
        console.log(event);
    })
    kintone.events.on('app.record.print.show', function(event) {
        alert('Print Screen has been displayed.');
      });
})()