(function () {
    'use strict';

    kintone.events.on('app.record.index.show', (event) => {
        console.log(event);

        const params = {
            app: 2,
            fields: ['recordId']
        };
        kintone.api.urlForGet('/k/v1/records.json', params, false);

    });

})();