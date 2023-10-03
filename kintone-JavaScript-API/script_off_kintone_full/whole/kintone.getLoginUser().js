(function() {
    'use strict'

    kintone.events.on('app.record.index.show', function(event) {
        // console.log(event);

        var user = kintone.getLoginUser();
        console.log(user);

        return event;
      });

})();