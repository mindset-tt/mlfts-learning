(function(){
    'use strict'

    kintone.events.on('app.record.detail.show', function() {
        var el =  kintone.app.record.getSpaceElement('space1');
        el.textContent = 'Hello Kintone!';
    });

})();