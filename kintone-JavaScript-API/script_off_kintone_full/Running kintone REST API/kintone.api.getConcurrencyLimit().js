(function () {
    'use strict';

    kintone.events.on('app.record.index.show', async (event) => {
        console.log(event);

        kintone.api.getConcurrencyLimit().then(function(result) {
            console.log(result);
          
            const params = {
                app: 2,
                fields: ['recordId']
            };
            kintone.api.urlForGet('/k/v1/records.json', params, false);

            // Sample response
            // {limit: 100, running: 1}
          });

    });

})();