(function(){
    'use strict'

    kintone.events.on('app.record.index.show', async (event) => {
        console.log(event);

        var appId = kintone.app.getId(); // It's getId, and not getID
        console.log(appId);

    });

})();