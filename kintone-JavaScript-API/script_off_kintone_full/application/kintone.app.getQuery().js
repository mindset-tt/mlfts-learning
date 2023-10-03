(function () {
    'use strict'

    kintone.events.on('app.record.index.show', async (event) => {
        console.log(event);


        var condition = kintone.app.getQuery();
        console.log(condition);


    });

})();