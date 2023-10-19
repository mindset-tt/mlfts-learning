(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'rights': [
              {
                'entity': {
                  'type': 'USER',
                  'code': 'user1'
                },
                'appEditable': true,
                'recordViewable': true,
                'recordAddable': true,
                'recordEditable': true,
                'recordDeletable': true,
                'recordImportable': true,
                'recordExportable': true
              },
              {
                'entity': {
                  'type': 'GROUP',
                  'code': 'everyone'
                },
                'includeSubs': true,
                'appEditable': true,
                'recordViewable': true,
                'recordAddable': true,
                'recordEditable': true,
                'recordDeletable': true,
                'recordImportable': false,
                'recordExportable': false
              },
              {
                'entity': {
                  'type': 'CREATOR'
                },
                'appEditable': true,
                'recordViewable': true,
                'recordAddable': true,
                'recordEditable': true,
                'recordDeletable': true,
                'recordImportable': true,
                'recordExportable': true
              }
            ]
          };
          
          kintone.api(kintone.api.url('/k/v1/app/acl.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();