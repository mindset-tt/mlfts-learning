(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        // Adding new views: "My List View", "My Calendar View"
        // Updating existing views: "My Custom View", "(Assigned to me)"
        // Any other views not mentioned will be deleted

        var body = {
            'app': kintone.app.getId(),
            'views': {
                'Hi View': {
                    'index': 0,
                    'type': 'LIST',
                    'name': 'Hi View',
                    'fields': [
                        'Record_number',
                        'name'
                    ],
                    'filterCond': 'Updated_datetime > LAST_WEEK()',
                    'sort': 'Record_number asc'
                }
            }
        };

        kintone.api(kintone.api.url('/k/v1/preview/app/views.json', true), 'PUT', body, function (resp) {
            // success
            console.log(resp);
        }, function (error) {
            // error
            console.log(error);
        });

    });

})();