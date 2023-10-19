$(document).ready(function () {
    const setting = $('#setting');
    const resetBtn = $('#reset');
    const body = $('body');
    var text = $('p');
  
    // change theme from checkbox
    setting.on('change', function () {
        //set status to local storage
      localStorage.setItem('night-mode', $(this).prop('checked'));
      //load theme
      loadTheme();
    });
  
    // set and load theme function
    function loadTheme() {
        //get status from local storage
      var status = localStorage.getItem('night-mode');
      //check if status is true
      if (status === 'true') {
        //set theme to dark
        text.text('ໂຫມດມືດ');
        body.css('background-color', 'black');
        body.css('color', 'white');
        body.css('transition', 'all 1s ease-in-out');
      } else {
        //set theme to light
        text.text('ໂຫມດແຈ້ງ');
        body.css('background-color', 'white');
        body.css('color', 'black');
        body.css('transition', 'all 1s ease-in-out');
      }
    }
  
    // reset theme to default
    resetBtn.on('click', function () {
        //remove status from local storage
      localStorage.removeItem('night-mode');
      //set checkbox to false
      setting.prop('checked', false);
      //load theme
      loadTheme();
    });
  
    loadTheme();
  });