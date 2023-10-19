$(document).ready(function () {
    const switchToggle = $('input[type="checkbox"]');
    const toggleIcon = $('#toggle-icon');
    const nav = $('#nav');
    const image1 = $('#image1');
    const image2 = $('#image2');
    const image3 = $('#image3');

    const switchMode = () => {
        if (switchToggle.prop('checked')) {
            $('html').attr('data-theme', 'dark');
            darkMode();
            imageSwitchMode('dark');
        } else {
            $('html').attr('data-theme', 'light');
            lightMode();
            imageSwitchMode('light');
        }
    }

    const darkMode = () => {
        toggleIcon.children().eq(0).text('ໂຫມດມືດ');
        toggleIcon.children().eq(1).removeClass('fa-sun').addClass('fa-moon');
        nav.css('background-color', 'rgb(0 0 0 / 50%)');
    }

    const lightMode = () => {
        toggleIcon.children().eq(0).text('ໂຫມດແຈ້ງ');
        toggleIcon.children().eq(1).removeClass('fa-moon').addClass('fa-sun');
        nav.css('background-color', 'rgb(255 255 255 / 50%)');
    }

    const imageSwitchMode = (mode) => {
        image1.attr('src', `img/undraw_Projections_${mode}.svg`);
        image2.attr('src', `img/undraw_Raining_${mode}.svg`);
        image3.attr('src', `img/undraw_Freelancer_${mode}.svg`);
    }

    switchToggle.on('change', switchMode);
});