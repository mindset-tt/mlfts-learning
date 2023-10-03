(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', async (event) => {
        console.log(event);

        const body = {
            requests: [
              {
                method: 'POST',
                api: '/k/v1/record.json',
                payload: {
                  app: kintone.app.getId(),
                  record: {
                    name : {
                      value: '文字列1行を追加します。'
                    }
                  }
                }
              }
            //   {
            //     method: 'PUT',
            //     api: '/k/v1/record.json',
            //     payload: {
            //       app: 1973,
            //       id: 33,
            //       revision: 2,
            //       record: {
            //         文字列1行: {
            //           value: '文字列1行を更新します。'
            //         }
            //       }
            //     }
            //   },
            //   {
            //     method: 'POST',
            //     api: '/k/v1/record.json',
            //     payload: {
            //       app: 1974,
            //       record: {
            //         文字列1行: {
            //           value: '文字列1行を追加します。'
            //         }
            //       }
            //     }
            //   }
            ]
          };
          
          await kintone.api(kintone.api.url('/k/v1/bulkRequest.json', true), 'POST', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });


    })
})();