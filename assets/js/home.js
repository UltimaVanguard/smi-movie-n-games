// variables for html elements
const modal = $('.modal');
const searchBtn = $('.search');
const searchForm = $('#search-form');
const mediaType = $('#media');
const searchInput = $('#title');
const closeBtn = $('.cancel');
const displayEl = $('.search-results');
const gameForm = $('#game-form');
const movieForm = $('#movie-form');
const gameInput = $('#game-search');
const movieInput = $('#movie-search');
const gameDisplayEl = $('#games');
const movieDisplayEl = $('#movies');
const movieList = $('.movie-list');
const gameList = $('.game-list');
const gameResetBtn = $('#gameButton');
const movieResetBtn = $('#movieButton');
let movieArray = JSON.parse(localStorage.getItem('Movie title')) || [];
let gameArray = JSON.parse(localStorage.getItem('Game Name')) || [];

// displays modal
function displayModal() {
    modal.css('display', 'block');
}

// hides modal
function closeModal(event) {
    event.preventDefault();
    modal.css('display', 'none');
}

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
    // added event listener for add game button
    gameAddButton.on('click', function(){
        addGameList(game);
    }) 

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

    // adding an event listener to the movie add button
    movieAddButton.on('click', function(){
        addMovieList(movie.Title)
    });

    // appending heading to the header
    movieCardHeader.append(movieCardHeading);

    // appending movieCard elements to the movieCard
    movieCard.append(movieCardHeader, movieCardImg, movieCardYear, movieCardType, movieInfoButton, movieAddButton);
    
    // appending movieCard to the movie section
    movieDisplayEl.append(movieCard);
}

// function to add games to the list 
function addGameList(game) {
    const gameListEl = $('<li>');
   gameListEl.addClass('col-4 list-item').text(game.name).css('display' , 'inline').css('color' , 'white').css('font-size', '20px').css('background-color' , '#2f4454').css('border' , '5px').css('border-radius' , '10px').css('text-align' , 'center').css('padding', '3px 10px');
   gameList.append(gameListEl);
}

function updateGameList() {
    for (let i = 0; i < gameArray.length; i++) {
        const gameListItem = gameArray[i];
        addGameList(gameListItem);
        
    }

}

function updateMovieList() {
    for (let i = 0; i < movieArray.length; i++) {
        const movieListItem = movieArray[i];
        addMovieList(movieListItem);
        
    }

}

// function to add moves to the list
function addMovieList(movie) {

    // creating an element to add a list item 
   const movieListEl = $('<li>');
   movieListEl.addClass('col-4 list-item').text(movie).css('display' , 'inline').css('color' , 'white').css('font-size', '20px').css('background-color' , '#2f4454').css('border' , '5px').css('border-radius' , '10px').css('text-align' , 'center').css('padding', '3px 10px');
   movieList.append(movieListEl);
}

//this function removes the list of games
function removeGameList(){
 gameList.empty();  
 localStorage.removeItem('Game Name');
}

// this fumction removes the list of movies
function removeMovieList(){
    movieList.empty();
    localStorage.removeItem('Movie title');
}

// gets games based on search results
function getGames(event) {
    const gameSearch = searchInput.val();
    //
    //  If statements for criteria goes here 
    //
    
    // Need to add criteria to the URL
    // Build search URL
    const searchURL = `https://api.rawg.io/api/games?key=1f307ccc56be4c28bbb79985edb675eb&search=${gameSearch}`

    // fetch request
    fetch(searchURL)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(games) {
            // removes current game cards
            $('.game-card').remove();
            $('.game-error').remove();
            // function to display list of games
            if (games.results.length === 0) {
                const emptyText = $('<h3>');
                emptyText.addClass('game-error col-12 is-center');
                emptyText.text('No results found!');
                gameDisplayEl.append(emptyText);
            } else {
                for(let game of games.results) {
                    displayGames(game);
                }
            }
        })
        .catch(function(error) {
            $('.game-card').remove();
            $('.game-error').remove();
            console.error(error);
            const errorText = $('<h3>');
            errorText.addClass('game-error col-12 is-center');
            errorText.text('Something went wrong. Try Again!');
            gameDisplayEl.append(errorText);
        });
}    

// gets movies based on search results
function getMovies(event) {;
    const movieSearch = searchInput.val();
    //
    //  If statements for criteria goes here 
    //
    
    // Need to add criteria to the URL
    // Build search URL
    const searchURL = `https://www.omdbapi.com/?s=${movieSearch}&apikey=56faa022`

    // fetch request
    fetch(searchURL)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(movies) {
            // removes current movie cards
            $('.movie-card').remove();
            $('.movie-error').remove();
            // loop to display movies
            if (!movies.Search) {
                const errorText = $('<h3>');
                errorText.addClass('movie-error col-12 is-center');
                errorText.text('No results found!');
                movieDisplayEl.append(errorText);
            } else {
                for(let movie of movies.Search) {
                    displayMovies(movie);
                }   
            }
        })
        .catch(function(error) {
            $('.movie-card').remove();
            $('.movie-error').remove();
            console.error(error);
            const errorText = $('<h3>');
            errorText.addClass('movie-error col-12 is-center');
            errorText.text('Something went wrong. Try Again!');
            movieDisplayEl.append(errorText);
        });
}

// gets type of media from form and runs appropriate function
function getType(event) {
    event.preventDefault();

    if (mediaType.val() === 'movies') {
        getMovies();
    } else {
        getGames();
    }

    searchInput.val('')
    closeModal(event);
}

function getGameInfo() {
    const gameId = $(this).attr('data-game-id')
    localStorage.setItem('game-id', gameId)
    window.location.href = './gamesinfo.html'
    console.log(gameURL)
}

// saves movieId to local storage and goes to movie info page
function getMovieInfo() {
    const movieId = $(this).attr('data-movie-id');
    localStorage.setItem('movie-id', movieId);

    window.location.href = './moviesinfo.html';
}

if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark');
}
// *******************************
window.onload = updateGameList(), updateMovieList();

// display modal on search button click
searchBtn.on('click', displayModal);

// closes modal on cancel button click
closeBtn.on('click', closeModal);

// displays games or movies on submit click
searchForm.on('submit', getType);

// goes to game info page
gameDisplayEl.on('click', '.btn-game-info', getGameInfo);

// goes to movie info page
movieDisplayEl.on('click', '.btn-movie-info', getMovieInfo);

// added event listeners to the reset list buttons
gameResetBtn.on('click', removeGameList);
movieResetBtn.on('click', removeMovieList);