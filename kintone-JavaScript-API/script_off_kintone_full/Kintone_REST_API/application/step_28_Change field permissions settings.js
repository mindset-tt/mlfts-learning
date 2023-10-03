(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': 1,
            'rights': [
              {
                'code': 'Text__single_line_',
                'entities': [
                  {
                    'accessibility': 'WRITE',
                    'entity': {
                      'type': 'USER',
                      'code': 'user1'
                    }
                  },
                  {
                    'accessibility': 'READ',
                    'entity': {
                      'type': 'GROUP',
                      'code': 'group1'
                    }
                  }
                ]
              },
              {
                'code': 'Number',
                'entities': [
                  {
                    'accessibility': 'NONE',
                    'entity': {
                      'type': 'ORGANIZATION',
                      'code': 'org1'
                    },
                    'includeSubs': true
                  }
                ]
              }
            ]
          };
          
          kintone.api(kintone.api.url('/k/v1/field/acl.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();