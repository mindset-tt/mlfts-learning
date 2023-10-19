$(document).ready(function() {
    var container = $('.container');
    var seats = $('.row .seat:not(.occupied)');
    var count = $('#count');
    var total = $('#total');
    var movieSelect = $('#movie');
    var price = +movieSelect.val();
  
    container.on('click', '.seat:not(.occupied)', function() {
      $(this).toggleClass('selected');
      updateSelected();
    });
  
    movieSelect.on('change', function() {
      price = +$(this).val();
      setMovieData($(this).prop('selectedIndex'), $(this).val());
      updateSelected();
    });
  
    function updateSelected() {
      var selectedSeats = $('.row .seat.selected');
      var countSeats = selectedSeats.length;
      var seatsIndex = selectedSeats.map(function() {
        return seats.index(this);
      }).get();
      localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
      count.text(countSeats);
      total.text(countSeats * price);
    }
  
    function setMovieData(movieIndex, moviePrice) {
      localStorage.setItem('movieIndex', movieIndex);
      localStorage.setItem('moviePrice', moviePrice);
    }
  
    function showDataToUI() {
      var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
      var selectMovieIndex = localStorage.getItem('movieIndex');
      if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.each(function(index) {
          if (selectedSeats.indexOf(index) > -1) {
            $(this).addClass('selected');
          }
        });
      }
      if (selectMovieIndex !== null) {
        movieSelect.prop('selectedIndex', selectMovieIndex);
      }
    }
  
    showDataToUI();
    updateSelected();
  });