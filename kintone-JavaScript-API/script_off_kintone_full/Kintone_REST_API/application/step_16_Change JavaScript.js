(function() {
    'use strict'


    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'scope': 'ALL',
            'desktop': {
              'js': [
                {
                  'type': 'URL',
                  'url': 'https://www.example.com/example.js'
                },
                {
                  'type': 'FILE',
                  'file': {
                    'fileKey': 'ddfc8e89-7aa3-4350-b9ab-3a75c9cf46b3'
                  }
                }
              ],
              'css': []
            },
            'mobile': {
              'js': [
                {
                  'type': 'FILE',
                  'file': {
                    'fileKey': '20150519023802B3EB762E870645F889B22F9D4F1F3059023'
                  }
                },
                {
                  'type': 'URL',
                  'url': 'https://www.example.com/example-mobile.js'
                }
              ],
              'css': []
            }
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/customize.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();