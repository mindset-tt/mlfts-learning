(async () => {
  'use strict';
  kintone.events.on('app.record.index.show', async (event) => {
    console.log(event);

    // Get data from outside
    try {
      const resp = await kintone.proxy('https://api.example.com', 'GET', {}, {});
      // success
      console.log(resp);
    } catch (error) {
      // error
      console.log(error);
    }

    
    // Post object to outside
    const blob = new Blob(['テストファイルです'], {
      type: 'text/plain',
    });
    const data = {
      format: 'RAW',
      value: blob
    };
    try {
      const resp = await kintone.proxy.upload('https://api.example.com', 'POST', {}, data);
      // success
      console.log(resp);
    } catch (error) {
      // error
      console.log(error);
    }
  });

});