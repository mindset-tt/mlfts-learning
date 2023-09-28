(()=>{
    //After displaying the top screen of the space
    kintone.events.on('space.portal.show', (event) =>{
        console.log(event);
    })
})();