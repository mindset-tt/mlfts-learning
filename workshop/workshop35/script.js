$(document).ready(function () {
    const setting = $('#setting');
    const resetBtn = $('#reset');
    const body = $('body');
    var text = $('p');
    loadTheme();

    //change theme from checkbox
    setting.on('change', function () {
        localStorage.setItem('night-mode', $(this).prop('checked'));
        loadTheme();
    });

    //set and load theme function
    function loadTheme() {
        var status = localStorage.getItem('night-mode');
        setting.prop('checked', status);
        if ($('#setting').prop('checked')) {
            text.text('ໂຫມດມືດ');
            body.css('background-color', 'black');
            body.css('color', 'white');
            body.css('transition', 'all 1s ease-in-out');
        } else {
            text.text('ໂຫມດແຈ້ງ');
            body.css('background-color', 'white');
            body.css('color', 'black');
            body.css('transition', 'all 1s ease-in-out');
        }
    }

    //reset theme to default
    resetBtn.on('click', function () {
        localStorage.clear();
        loadTheme();
    });


});