(function() {
    'use strict'


    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'notifications': [{
              'entity': {
                'type': 'USER',
                'code': 'user1'
              },
              'includeSubs': false,
              'recordAdded': true,
              'recordEdited': true,
              'commentAdded': false,
              'statusChanged': false,
              'fileImported': true
            }],
            'notifyToCommenter': true,
            'revision': '2'
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/notifications/general.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();