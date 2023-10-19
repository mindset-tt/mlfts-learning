$(document).ready(function () {
    const textArea = $('textarea');
    const total = $('.total');
    const max = $('.max');
    const limit = $('.limit');
    
    textArea.on('keyup', function () {
        let length = textArea.val().length;
        total.text(length);
        if (length > 100) {
            // total.css('color', 'red');
            // max.css('color', 'red');
            limit.addClass('active');
        } else {
            // total.css('color', 'black');
            // max.css('color', 'black');
            limit.removeClass('active');
        }
    });
});