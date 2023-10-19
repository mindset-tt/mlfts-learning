(function(){
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        // console.log(event);
        const params = {
            app: kintone.app.getId(),
            fields: ['name']
          };
        // console.log(params.fields);

        var test = kintone.api.urlForGet('/k/v1/records.json', params, false);
        console.log(test);

        //ແບບທີີ່ສອງ
        var urlForGet = kintone.api.urlForGet('/k/v1/records.json', {app: kintone.app.getId(), fields: ['name']});
        console.log(decodeURIComponent(urlForGet));
    });

})();