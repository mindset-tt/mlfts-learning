(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);


        // Get the target app ID of the lookup field
        var targetAppId = kintone.app.getLookupTargetAppId('Lookup');
        console.log(targetAppId);

    });

})();