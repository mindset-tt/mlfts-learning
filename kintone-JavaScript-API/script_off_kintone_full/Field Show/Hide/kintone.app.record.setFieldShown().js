(function() {
    'use strict'

    kintone.events.on('app.record.detail.show', function(event) {

        kintone.app.record.setFieldShown('name', false);

        return event;
      });

})();