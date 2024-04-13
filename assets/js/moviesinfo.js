// declaring element variables
const mainEl = $('main');
const movieTitleEl = $('.movie-title');
const movieDisplayEl = $('.movie-display');
const homeButton = $('.home');
let movieStorage =[];

// loading local storage
const movieId = localStorage.getItem('movie-id');

// displays movie for the ID in local storage
function displayMovie(movie) {
    // Updates Header with name of movie
    movieTitleEl.text(movieTitleEl.text() + movie.Title);

    // build overall
    const card = $('<div>');
    card.addClass('card row col-12 is-center');

    // builds the element for the image
    const cardImg = $('<img>');
    cardImg.addClass('col-12 col-3-md');
    cardImg.attr('src', movie.Poster);

    // builds the element for information and add button
    const divCard = $('<div>');
    divCard.addClass('col-12 col-9-md');

    // builds card for info
    const cardInfo = $('<div>');
    cardInfo.addClass('card col-12');

    // builds element for director
    const cardDirector = $('<p>');
    cardDirector.addClass('col-12 is-center');
    cardDirector.text(`Director: ${movie.Director}`);

    // builds card for actors
    const cardActors = $('<p>');
    cardActors.addClass('col-12 is-center');
    cardActors.text(`Main Actors: ${movie.Actors}`);

    // builds element for genre
    const cardGenre = $('<p>');
    cardGenre.addClass('col-12 is-center');
    cardGenre.text(`Genre: ${movie.Genre}`);

    // build element for plot
    const cardPlot = $('<p>');
    cardPlot.addClass('col-12 is-center');
    cardPlot.text(`Plot: ${movie.Plot}`);

    // builds element for runtime
    const cardRuntime = $('<p>');
    cardRuntime.addClass('col-12 is-center');
    cardRuntime.text(`Runtime: ${movie.Runtime}`);

    // builds element for add button
    const cardAddBtn = $('<button>');
    cardAddBtn.addClass('button btn-add-movie');
    // cardAddBtn.attr('data-movie-id', movie.imdbID)
    cardAddBtn.text('Add Movie');
    cardAddBtn.on('click', function(){
        addMovieList(movie);
        window.location.href = './index.html';

    });

    // appends info to appropriate cards and appends to the page
    cardInfo.append(cardDirector, cardActors, cardGenre, cardPlot, cardRuntime);
    divCard.append(cardInfo, cardAddBtn)
    card.append(cardImg, divCard);
    movieDisplayEl.append(card);
}

// gets movie by ID in local storage
function getMovie() {
    // building URL
    const movieUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=56faa022`;
    console.log(movieUrl);

    // fetching data
    fetch(movieUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(movie) {
            console.log(movie);
            displayMovie(movie);
    })
}

function returnHome() {
    window.location.href = './index.html#movies';
}

if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark');
}
function getLocalStorage() {
   movieStorage = JSON.parse(localStorage.getItem('Movie title'));
   console.log(movieStorage);
}
function addMovieList(movie) {
    movieStorage.push(movie.Title);
    localStorage.setItem('Movie title', JSON.stringify(movieStorage));
}


// on load, gets and displays movie information
window.onload = getMovie();
window.onload = getLocalStorage();

// mainEl.on('click', '.btn-add-movie', addMovie);

homeButton.on('click', returnHome);
