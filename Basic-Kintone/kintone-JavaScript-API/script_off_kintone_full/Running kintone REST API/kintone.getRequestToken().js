(function () {
    'use strict';

    kintone.events.on('app.record.index.show', async (event) => {
        console.log(event);

        const headers = {
            'X-Requested-With': 'XMLHttpRequest',
          };
         
          const blob = new Blob(['TEST'], {
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

    });

})();