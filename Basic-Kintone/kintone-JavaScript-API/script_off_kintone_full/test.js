(function () {
    'use strice'

    kintone.events.on('app.record.detail.show', function (event) {
        console.log(event);     
        var query = kintone.app.getQuery();
        var name = query['name'];
        var lname = query['lname'];

        console.log('Name:', name);
        console.log('lname:', lname);

        // Further processing based on the retrieved values
    });

})();