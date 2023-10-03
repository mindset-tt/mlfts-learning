(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);


        // Get the target app ID of the lookup field
        var related = kintone.app.getRelatedRecordsTargetAppId('Related_records');
        console.log(related);

    });

})();