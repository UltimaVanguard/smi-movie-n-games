
// variables for html elements
const gameDisplayEl = $('#games');
const movieDisplayEl = $('#movies');

function displayGames(game) {
    // creating element for the main card
    const gameCard = $('div');
    gameCard.setClass('card col-3');
    gameCard.attr('data-game-id', game.id);
    
    // creating element for header
    const gameCardHeader = $('header')
    const gameCardHeading = $('h4')
    gameCardHeading.text(game.name);

    // creating element for poster image
    const gameCardImg = $('img');
    gameCardImg.attr('src', game.background_image)

    // creating element for year released
    const gameCardYear = $('p');
    gameCardYear.setClass('col-6');
    gameCardYear.text(`Year Released: ${game.released}`);

    // creating element for Type
    const gameCardRating = $('p');
    gameCardRating.setClass('col-6');
    gameCardRating.text(`Type: ${game.esrb_rating.name}`);

    // creating an element to add a button
    const gameCardButton = $('button');
    gameCardButton.setClass('button btn-game-info');
    gameCardButton.text('More Info');

    // appending heading to the header
    gameCardHeader.append(gameCardHeading);
    // appending gameCard elements to the gameCard
    gameCard.append(gameCardHeader, gameCardImg, gameCardYear, gameCardRating, gameCardButton);
    // appending movieCard to the movie section
    gameDisplayEl.append(gameCard);
}

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

    // creating an element to add a button
    const movieCardButton = $('button');
    movieCardButton.setClass('button btn-movie-info');
    movieCardButton.text('More Info');

    // appending heading to the header
    movieCardHeader.append(movieCardHeading);
    // appending movieCard pieces to the movieCard
    movieCard.append(movieCardHeader, movieCardImg, movieCardYear, movieCardType, movieCardButton);
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
            for(let game of games.results) {
                displayGames(game);
            }
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
            // loop to display list of movies
            // for(let movie of movies) {
            //     displayMovies(movie);
            // }
    })
}
