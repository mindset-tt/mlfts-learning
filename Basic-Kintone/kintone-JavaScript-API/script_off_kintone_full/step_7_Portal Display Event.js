(function() {
    'use strice'

    kintone.events.on('portal.show', (event) => {
        console.log(event);
        console.log("Portal Display Event");
        window.alert('Hello Kintone!');
    });

})();