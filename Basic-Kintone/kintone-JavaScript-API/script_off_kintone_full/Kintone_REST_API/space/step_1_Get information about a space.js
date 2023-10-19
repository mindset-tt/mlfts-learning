(function() {
  'use strict'

  kintone.events.on('app.record.detail.show', async (event) => {
    console.log(event);

    const body = {
      id: '1'
    };
    
    try {
      const resp = await kintone.api(kintone.api.url('/k/v1/space.json', true), 'GET', body);
      // success
      console.log(resp);
    } catch (error) {
      // error
      console.log(error);
    }  

    })

})();