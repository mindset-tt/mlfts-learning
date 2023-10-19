(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', (event) => {
        console.log(event);

        var body = {
            'app': kintone.app.getId(),
            'notifications': [{
              'timing': {
                'code': 'Deadline_Date',
                'daysLater': '-1',
                'time': '09:00'
              },
              'filterCond': 'User_selection in ("USER", "user1")',
              'title': 'Reminder: Tomorrow is the deadline',
              'targets': [{
                'entity': {
                  'type': 'USER',
                  'code': 'user1'
                },
                'includeSubs': false
              }]
            },
            {
              'timing': {
                'code': 'Created_datetime',
                'daysLater': '1',
                'hoursLater': '2'
              },
              'filterCond': 'User_selection in ("USER", "user1")',
              'title': 'Reminder: Yesterday\'s records',
              'targets': [{
                'entity': {
                  'type': 'USER',
                  'code': 'user1'
                },
                'includeSubs': false
              }]
            }
            ],
            'timezone': 'America/Los_Angeles',
            'revision': '2'
          };
          
          kintone.api(kintone.api.url('/k/v1/preview/app/notifications/reminder.json', true), 'PUT', body, function(resp) {
            // success
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

    });

})();