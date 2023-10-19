(function () {
    'use strict';

    kintone.events.on('app.record.index.show', (event) => {
        console.log(event);
    });

    kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
        console.log(event);
    });

})();