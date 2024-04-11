// variables for html elements
const gameForm = $('#game-form');
const movieForm = $('#movie-form');
const gameInput = $('#game-search');
const movieInput = $('#movie-search');
const gameDisplayEl = $('#games');
const movieDisplayEl = $('#movies');

function displayGames(game) {
    // creating element for the main card
    const gameCard = $('<div>');
    gameCard.addClass('card col col-4-md col-3-lg game-card');
    gameCard.attr('data-game-id', game.id);
    
    // creating element for header
    const gameCardHeader = $('<header>')
    const gameCardHeading = $('<h4>')
    gameCardHeading.text(game.name);

    // creating element for poster image
    const gameCardImg = $('<img>');
    gameCardImg.attr('src', game.background_image)
    gameCardImg.css('max-height', '200px')

    // creating element for year released
    const gameCardYear = $('<p>');
    gameCardYear.addClass('col-12');
    if (game.released) {
        gameCardYear.text(`Year Released: ${game.released}`); 
    } else {
        gameCardYear.text('Year Released: Not Applicable');
    };
    

    // creating element for Type
    const gameCardRating = $('<p>');
    gameCardRating.addClass('col-12');
    if(game.esrb_rating) {
        gameCardRating.text(`Rating: ${game.esrb_rating.name}`);
    } else {
        gameCardRating.text('Rating: Not Rated')
    }

    // creating an element to add a button
    const gameInfoButton = $('<button>');
    gameInfoButton.addClass('button btn-game-info');
    gameInfoButton.attr('data-game-id', game.id);
    gameInfoButton.text('More Info');

    // creating an element to add a button
    const gameAddButton = $('<button>');
    gameAddButton.addClass('button btn-game-add');
    // gameAddButton.attr('data-game-id', game.id);
    gameAddButton.text('Add Game');

    // appending heading to the header
    gameCardHeader.append(gameCardHeading);
    // appending gameCard elements to the gameCard
    gameCard.append(gameCardHeader, gameCardImg, gameCardYear, gameCardRating, gameInfoButton, gameAddButton);
    // appending movieCard to the movie section
    gameDisplayEl.append(gameCard);
}

// function to display searched movies
function displayMovies(movie) {
    // creating element for the main card
    const movieCard = $('<div>');
    movieCard.addClass('card col-12 col-3-md col-3-lg movie-card');
    movieCard.attr('data-movie-id', movie.imdbID);
    
    // creating element for header
    const movieCardHeader = $('<header>')
    const movieCardHeading = $('<h4>')
    movieCardHeading.text(movie.Title);

    // creating element for poster image
    const movieCardImg = $('<img>');
    movieCardImg.attr('src', movie.Poster)

    // creating element for year released
    const movieCardYear = $('<p>');
    movieCardYear.addClass('col-12');
    if (movie.Year) {
        movieCardYear.text(`Year Released: ${movie.Year}`);
    } else {
        movieCardYear.text('Year Released: Not Available');
    }

    // creating element for Type
    const movieCardType = $('<p>');
    movieCardType.addClass('col-12');
    if (movie.Type) {
        const movieType = movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1);
        movieCardType.text(`Type: ${movieType}`);
    } else {
        movieCardType.text('Type: Not Available');
    }

    // creating an element to add a button
    const movieInfoButton = $('<button>');
    movieInfoButton.addClass('button btn-movie-info');
    movieInfoButton.attr('data-movie-id', movie.imdbID);
    movieInfoButton.text('More Info');

    // creating an element to add a button
    const movieAddButton = $('<button>');
    movieAddButton.addClass('button btn-movie-add');
    // movieAddButton.attr('data-movie-id', movie.imdbID);
    movieAddButton.text('Add Movie');

    // appending heading to the header
    movieCardHeader.append(movieCardHeading);
    // appending movieCard elements to the movieCard
    movieCard.append(movieCardHeader, movieCardImg, movieCardYear, movieCardType, movieInfoButton, movieAddButton);
    // appending movieCard to the movie section
    movieDisplayEl.append(movieCard);
}

function getGames(event) {
    event.preventDefault();
    const gameSearch = gameInput.val();
    //
    //  If statements for criteria goes here 
    //
    
    // Need to add criteria to the URL
    // Build search URL
    const searchURL = `https://api.rawg.io/api/games?key=1f307ccc56be4c28bbb79985edb675eb&search=${gameSearch}`

    // fetch request
    fetch(searchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(games) {
            console.log(games);
            // removes current game cards
            $('.game-card').remove();
            // function to display list of games
            for(let game of games.results) {
                displayGames(game);
            }
    })

    // removes form input
    gameInput.val('')
}

function getMovies(event) {
    event.preventDefault();
    const movieSearch = movieInput.val();
    //
    //  If statements for criteria goes here 
    //
    
    // Need to add criteria to the URL
    // Build search URL
    const searchURL = `https://www.omdbapi.com/?s=${movieSearch}&apikey=56faa022`

    // fetch request
    fetch(searchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(movies) {
            console.log(movies);
            // removes current movie cards
            $('.movie-card').remove();
            // loop to display movies
            for(let movie of movies.Search) {
                displayMovies(movie);
            }
    })

    // removes value from input
    movieInput.val('')
}

gameForm.on('submit', getGames);

movieForm.on('submit', getMovies);

if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark');
}

function getGameInfo() {
    const gameId = $(this).attr('data-game-id')
    localStorage.setItem('game-id', gameId)
    window.location.href = './gamesinfo.html'
  }

  gameDisplayEl.on('click', '.btn-game-info', getGameInfo);