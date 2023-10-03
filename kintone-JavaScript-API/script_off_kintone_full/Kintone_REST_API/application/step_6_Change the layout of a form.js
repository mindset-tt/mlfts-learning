(function() {
  'use strict'


  kintone.events.on('app.record.detail.show', async (event) => {
    console.log(event);

    var body = {
      'app': kintone.app.getId(),
      'layout': [
        {
          'type': 'ROW',
          'fields': [
            { 'type': 'SINGLE_LINE_TEXT', 'code': 'name', 'size': { 'width': '500' } },
            { 'type': 'SINGLE_LINE_TEXT', 'code': 'Text', 'size': { 'width': '500' } },
            { 'type': 'NUMBER', 'code': 'Number', 'size': { 'width': '500' } }
          ]
        },
        {
          'type': 'ROW',
          'fields': [
            { 'type': 'RADIO_BUTTON', 'code': 'Radio_button', 'size': { 'width': '500' } }
          ]
        }
      ]
    };

    kintone.api(kintone.api.url('/k/v1/preview/app/form/layout.json', true), 'PUT', body, function (resp) {
      // success
      console.log(resp);
    }, function (error) {
      // error
      console.log(error);
    });

  })
})();