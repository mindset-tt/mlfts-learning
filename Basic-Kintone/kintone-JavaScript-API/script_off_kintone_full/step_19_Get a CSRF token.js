(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        const headers = {
            'X-Requested-With': 'XMLHttpRequest',
        };
   
        const blob = new Blob(['Hello Kintone!'], {
            type: 'text/plain',
        });
        console.log('This is blob', blob);

        const formData = new FormData();
        console.log('This is FromData', formData)

        const csrfToken = kintone.getRequestToken();
        console.log('This is csrfToken', csrfToken);

        formData.append('__REQUEST_TOKEN__', csrfToken);
        formData.append('file', blob, 'test.txt');

        const params = {
            method: 'POST',
            headers,
            body: formData,
        };

        const resp = await fetch('/k/v1/file.json', params);
        console.log('This is resp ', resp);
        const respData = await resp.json();
        console.log('This is respData ', respData);
    });

})();