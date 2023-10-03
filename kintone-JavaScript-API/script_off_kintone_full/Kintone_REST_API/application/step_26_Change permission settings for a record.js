(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'rights': [
              {
                'filterCond': 'Updated_datetime > "2012-02-03T09:00:00Z" and Updated_datetime < "2012-02-03T10:00:00Z"',
                'entities': [
                  {
                    'entity': {
                      'type': 'ORGANIZATION',
                      'code': 'org1'
                    },
                    'viewable': false,
                    'editable': false,
                    'deletable': false,
                    'includeSubs': true
                  },
                  {
                    'entity': {
                      'type': 'FIELD_ENTITY',
                      'code': 'Updated_by'
                    },
                    'viewable': true,
                    'editable': true,
                    'deletable': true
                  }
                ]
              }
            ]
          };
          
          kintone.api(kintone.api.url('/k/v1/record/acl.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();