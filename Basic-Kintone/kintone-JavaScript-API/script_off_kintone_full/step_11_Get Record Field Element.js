(function() {
    'use strict'
    kintone.events.on('app.record.detail.show', (even) => {
        // console.log(even);
        var recordField = kintone.app.record.getFieldElement('Text');
        var recordField_0 = kintone.app.record.getFieldElement('Text');
        console.log(recordField.firstChild.innerText);
        console.log(recordField_0);
    });
})();