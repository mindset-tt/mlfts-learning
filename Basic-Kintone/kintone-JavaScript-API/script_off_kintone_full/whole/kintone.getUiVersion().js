(function() {
    'use strict'

    kintone.events.on('app.record.index.show', function(event) {
        // console.log(event);

        var uiVer = kintone.getUiVersion();
        console.log(uiVer);

        return event;
      });

})();