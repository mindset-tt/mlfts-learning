(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        kintone.api.getConcurrencyLimit()
            .then(function (limit) {
                console.log('Concurrency Limit:', limit);
                //ສ້າງ object body ເພື່ອເກັບກຳຂໍ້ມູນ app
                const body = {
                    app: kintone.app.getId(),
                };
                // 
                kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body, (resp) => {
                    // success
                    console.log(resp);
                }, (error) => {
                    // error
                    console.log(error);
                });

                // ແອັບທີ 2
                const apps1 = {
                    app: 28,
                };
                // console.log(apps1.app);

                kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', apps1, (resp) => {
                    // success
                    console.log(resp);
                }, (error) => {
                    // error
                    console.log(error);
                });

                return event;
            })
            .catch(function (error) {
                console.error('Error:', error);
            });

    });

})();