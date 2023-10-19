(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);
        // var recordId = kintone.app.record.getId();
        // console.log(recordId);

        var record = kintone.app.record.get();
        console.log(record);

    });

})();