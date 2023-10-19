(() => {
    kintone.events.on('portal.show', function (event) {
        var el = kintone.portal.getContentSpaceElement();
        el.textContent = 'Hello Kintone!';
            window.alert('Hello Kintone!');

    });
})();