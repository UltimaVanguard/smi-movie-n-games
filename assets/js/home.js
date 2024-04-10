// variables for html elements
const movieDisplayEl = $('#movies');

// function to display searched movies
function displayMovies(movie) {
    // creating element for the main card
    const movieCard = $('div');
    movieCard.setClass('card col-3');
    movieCard.attr('data-movie-id', movie.imdbID);
    
    // creating element for header
    const movieCardHeader = $('header')
    const movieCardHeading = $('h4')
    movieCardHeading.text(movie.Title);

    // creating element for poster image
    const movieCardImg = $('img');
    movieCardImg.attr('src', movie.Poster)

    // creating element for year released
    const movieCardYear = $('p');
    movieCardYear.setClass('col-6');
    movieCardYear.text(`Year Released: ${movie.Year}`);

    // creating element for Type
    const movieCardType = $('p');
    movieCardType.setClass('col-6');
    movieCardType.text(`Type: ${movie.Type}`);

    // appending heading to the header
    movieCardHeader.append(movieCardHeading);
    // appending movieCard pieces to the movieCard
    movieCard.append(movieCardHeader, movieCardImg, movieCardYear, movieCardType);
    // appending movieCard to the movie section
    movieDisplayEl.append(movieCard);
}

function getGames() {
    //
    //  If statements for criteria goes here 
    //
    
    // Need to add criteria to the URL
    // Build search URL
    const searchURL = 'https://api.rawg.io/api/games?key=1f307ccc56be4c28bbb79985edb675eb'

    // fetch request
    fetch(searchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(games) {
            console.log(games);
            // function to display list of games
            // for(let game of games) {
            //     displayGames(game);
            // }
    })
}

function getMovies() {
    //
    //  If statements for criteria goes here 
    //
    
    // Need to add criteria to the URL
    // Build search URL
    const searchURL = 'https://www.omdbapi.com/?apikey=56faa022'

    // fetch request
    fetch(searchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(movies) {
            console.log(movies);
            // loop to display movies
            for(let movie of movies.search) {
                displayMovies(movie);
            }
    })
}