(function () {
    'use strict'
    //
    kintone.events.on('portal.show', (event) => {
        console.log(event);
        // 
        const divElement = document.createElement('div');
        divElement.textContent = 'Hello World';

        const element = kintone.portal.getContentSpaceElement();

        element.appendChild(divElement);
    });

})();