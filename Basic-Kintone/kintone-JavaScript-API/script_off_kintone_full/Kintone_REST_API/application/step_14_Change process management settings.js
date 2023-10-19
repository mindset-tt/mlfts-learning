(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);


        var body = {
            'app': kintone.app.getId(),
            'enable': true,
            'states': {
              'Not started': {
                'name': 'Not started',
                'index': '0',
                'assignee': {
                  'type': 'ONE',
                  'entities': [
                  ]
                }
              }
            },
            'actions': [
              {
                'name': 'Start',
                'from': 'Not started',
                'to': 'In progress',
                'filterCond': 'Record_number = "1"'
              },
              {
                'name': 'Complete',
                'from': 'In progress',
                'to': 'Completed',
                'filterCond': ''
              }
            ]
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/status.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();