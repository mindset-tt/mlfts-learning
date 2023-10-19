(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'reports': {
              'ລາຍການ': {
                'chartType': 'BAR',
                'chartMode': 'NORMAL',
                'name': 'ລາຍການ',
                'index': '0',
                'groups': [{
                  'code': 'Created_by'
                }],
                'aggregations': [{
                  'type': 'COUNT'
                }],
                'filterCond': '',
                'sorts': [{
                  'by': 'TOTAL',
                  'order': 'DESC'
                }],
                'periodicReport': null
              }
            },
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/reports.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();