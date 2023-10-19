(()=>{
    //Registration of event Handling
    kintone.events.on('portal.show', (event) =>{
        console.log(event);
    });
    //Remove of event Handling
    kintone.events.off('portal.show', (event) =>{
        console.log(event);
    })
})();