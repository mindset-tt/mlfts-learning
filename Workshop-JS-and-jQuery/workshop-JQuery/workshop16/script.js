$(document).ready(function () {
  const apiKey = "6bf2e023c8345d10623e24d02a4b8001";
  let years = "2023";
  let currentPage = 1;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${currentPage}&year=${years}`;

  const content = $('#content');
  const urlPoster = 'https://image.tmdb.org/t/p/w500/';

  const dropdown = $('#years');
  const previousButton = $('#previous');
  const nextButton = $('#next');
  var yearsSelect = $('#years');
  var currentYear = new Date().getFullYear();
  //make loop to create option for select year
  for (var i = currentYear; i >= 1910; i--) {
    $('<option>', {
      value: i,
      text: i
    }).appendTo(yearsSelect);
  }
  //make function to display movies
  async function displayMovies(url) {
    const response = await fetch(url);
    const movies = await response.json();

    content.empty();
    //loop through each movie
    movies.results.forEach(data => {
      const movieEl = $('<div>').addClass('movie');
      const title = $('<h2>').text(data.title.substring(0, 24));
      const poster = $('<img>').attr('src', `${urlPoster}${data.poster_path}`);
      //append title and poster to movieEl
      movieEl.append(title, poster);
      content.append(movieEl);
    });
  }
  //call api to display movies
  dropdown.on('change', () => {
    years = dropdown.val();
    currentPage = 1;
    const updateUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${currentPage}&year=${years}`;
    displayMovies(updateUrl);
  });
  //make event listener for get previous page
  previousButton.on('click', () => {
    if (currentPage > 1) {
      currentPage--;
      const updateUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${currentPage}&year=${years}`;
      displayMovies(updateUrl);
    }
  });
  //make event listener for get next page
  nextButton.on('click', () => {
    currentPage++;
    const updateUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${currentPage}&year=${years}`;
    displayMovies(updateUrl);
  });
  displayMovies(url);
});