(function (){
    'use starct'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        const body = {
            'app': kintone.app.getId(),
            'properties': {
              'Hi': {
                'type': 'SINGLE_LINE_TEXT',
                'code': 'Hi',
                'label': 'Hi',
                'noLabel': false,
                'required': false,
                'minLength': '',
                'maxLength': '',
                'expression': '',
                'hideExpression': false,
                'unique': false,
                'defaultValue': 'Hi Kintone'
              } 
            }
          };
          kintone.api(kintone.api.url('/k/v1/preview/app/form/fields.json', true), 'POST', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });
    })

})();