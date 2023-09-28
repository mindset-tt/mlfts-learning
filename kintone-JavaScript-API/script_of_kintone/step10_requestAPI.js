(async () => {
    'use strict';
    kintone.events.on('app.record.index.show', async (event) => {
        console.log(event);
        var appId = kintone.app.getId(); // It's getId, and not getID
        console.log(appId);
        //post simple data to kintone
        const body = {
            app: kintone.app.getId(),
            id: 1
        };

        kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', body, (resp) => {
            // success
            console.log(resp);
        }, (error) => {
            // error
            console.log(error);
        });

        const headers = {
            'X-Requested-With': 'XMLHttpRequest',
        };

        // Post object data to kintone
        const blob = new Blob(['テストファイルです'], {
            type: 'text/plain',
        });
        const formData = new FormData();
        const csrfToken = kintone.getRequestToken();
        formData.append('__REQUEST_TOKEN__', csrfToken);
        formData.append('file', blob, 'test.txt');

        const params = {
            method: 'POST',
            headers,
            body: formData,
        };

        const resp = await fetch('/k/v1/file.json', params);
        const respData = await resp.json();
        console.log(respData);

        // Get API URL with query string
        const paramss = {
            app: 4,
            fields: ['recordId']
        };
        kintone.api.urlForGet('/k/v1/records.json', params, false);

        
    });
})();