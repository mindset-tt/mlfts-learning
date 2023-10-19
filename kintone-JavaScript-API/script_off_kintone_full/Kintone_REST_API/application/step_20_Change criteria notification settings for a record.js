(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'notifications': [{
              'filterCond': 'User_selection in ("USER", "user1")',
              'title': 'user1 was selected',
              'targets': [{
                'entity': {
                  'type': 'USER',
                  'code': 'user1'
                },
                'includeSubs': false
              }]
            }],
            'revision': '2'
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/notifications/perRecord.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();