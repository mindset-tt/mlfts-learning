(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'actions': {
              'Action_A': {
                'name': 'Action_A',
                'index': '0',
                'destApp': {
                  'code': 'INVOICE',
                },
                'mappings': [
                  {
                    'srcType': 'FIELD',
                    'srcField': 'CompanyName',
                    'destField': 'CompanyName',
                  },
                  {
                    'srcType': 'FIELD',
                    'srcField': 'DivisionName',
                    'destField': 'DivisionName',
                  },
                  {
                    'srcType': 'RECORD_URL',
                    'destField': 'URL',
                  }
                ],
                'entities': [
                  {
                    'type': 'USER',
                    'code': 'userA',
                  }
                ],
              },
            },
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/actions.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();