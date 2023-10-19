(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        var body = {
            'id': '1',
            'members': [
              {
                'entity': {
                  'type': 'USER',
                  'code': 'user1'
                },
                'isAdmin': true
              },
              {
                'entity': {
                  'type': 'GROUP',
                  'code': 'group1'
                },
                'isAdmin': false
              },
              {
                'entity': {
                  'type': 'ORGANIZATION',
                  'code': 'org1'
                },
                'isAdmin': false,
                'includeSubs': true
              }
            ]
          };
          
          kintone.api(kintone.api.url('/k/v1/space/members.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });
       

    })
})();