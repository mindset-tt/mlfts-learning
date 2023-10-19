(function () {
    'use strict'

    kintone.events.on('app.record.detail.show', function (event) {

        const element = kintone.app.record.getFieldElement('name');
        console.log(element);
        element.style.color = 'red';

        return event;
    });

})();