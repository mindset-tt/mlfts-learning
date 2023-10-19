(function () {
  'use strict'


  kintone.events.on('app.record.detail.show', (event) => {
    console.log(event);

    kintone.api(kintone.api.url('/k/v1/form.json', true), 'GET', {
      'app': kintone.app.getId()
    }, function (resp) {
      console.log(resp);
    }, function (error) {
      console.log(error);
    }
    );

  })
})();