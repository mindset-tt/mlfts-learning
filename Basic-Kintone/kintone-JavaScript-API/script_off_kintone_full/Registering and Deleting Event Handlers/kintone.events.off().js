(function () {
    'use strict';

    const handler = (event) => {
        console.log(event);
    };
    kintone.events.on('app.record.index.show', handler);

    kintone.events.off('app.record.index.show', handler);

    kintone.events.off('app.record.index.show');
    
    kintone.events.off();

})();