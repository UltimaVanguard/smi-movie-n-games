// declaring element variables
const mainEl = $('main');
const gameTitleEl = $('.game-title');
const gameDisplayEl = $('.game-display');
const homeButton = $('.home');
let gameStorage = [];

// loading local storage
const gameId = localStorage.getItem('game-id');

// displays movie for the ID in local storage
function displayGame(game) {
    // Updates Header with name of movie
    gameTitleEl.text(gameTitleEl.text() + game.name);

    // build overall
    const card = $('<div>');
    card.addClass('card row col-12 is-center');

    // builds the element for the image
    const cardImg = $('<img>');
    cardImg.addClass('col-12 col-3-md');
    cardImg.attr('src', game.background_image);

    // builds the element for information and add button
    const divCard = $('<div>');
    divCard.addClass('col-12 col-9-md');

    // builds card for info
    const cardInfo = $('<div>');
    cardInfo.addClass('card col-12');

    // builds element for game style
    const cardStyle = $('<p>');
    cardStyle.addClass('col-12 is-center');
    cardStyle.text('Game Style: |')
    for(let i=0; i<5; i++) {
        cardStyle.text(cardStyle.text() + ` ${game.tags[i].name} | `);
    }

    // builds card for actors
    const cardPlatform = $('<p>');
    cardPlatform.addClass('col-12 is-center');
    cardPlatform.text('Platforms: | ')
    for(let platform of game.platforms) {
        cardPlatform.text(cardPlatform.text() + `${platform.platform.name} | `);   
    }

    // builds element for genre
    const cardGenre = $('<p>');
    cardGenre.addClass('col-12 is-center');
    cardGenre.text(`Genre: | `);
    for(let genre of game.genres) {
        cardGenre.text(cardGenre.text() + `${genre.name} | `);
    }

    // build element for plot
    const cardCreator = $('<p>');
    cardCreator.addClass('col-12 is-center');
    cardCreator.text(`Publishers and Developers: | `);
    for(let publisher of game.publishers) {
        cardCreator.text(cardCreator.text() + `${publisher.name} | `);
    }
    for(let developer of game.developers) {
        cardCreator.text(cardCreator.text() + `${developer.name} | `);
    }

    // builds element for add button
    const cardAddBtn = $('<button>');
    cardAddBtn.addClass('button btn-add-movie');
    // cardAddBtn.attr('data-movie-id', movie.imdbID)
    cardAddBtn.text('Add Game');
    cardAddBtn.on('click', function(){
        addGameList(game);
        window.location.href = './index.html';

    });

    // appends info to appropriate cards and appends to the page
    cardInfo.append(cardStyle, cardCreator, cardGenre, cardPlatform);
    divCard.append(cardInfo, cardAddBtn)
    card.append(cardImg, divCard);
    gameDisplayEl.append(card);
}

// gets movie by ID in local storage
function getGame() {
    // building URL
    const gameUrl = `https://api.rawg.io/api/games/${gameId}?key=1f307ccc56be4c28bbb79985edb675eb`;
    console.log(gameUrl);

    // fetching data
    fetch(gameUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(game) {
            console.log(game);
            displayGame(game);
    })
}

function returnHome() {
    window.location.href = './index.html#games';
}

if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark');
}
function getLocalStorage() {
    gameStorage = JSON.parse(localStorage.getItem('Game Name'));
    
 }
function addGameList(game) {
    gameStorage.push(game.name);
    localStorage.setItem('Game Name', JSON.stringify(gameStorage));
}

// on load, gets and displays movie information
window.onload = getGame();
window.onload = getLocalStorage();

// mainEl.on('click', '.btn-add-movie', addMovie);

homeButton.on('click', returnHome);