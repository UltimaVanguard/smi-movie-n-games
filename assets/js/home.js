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
            // loop to display list of movies
            // for(let movie of movies) {
            //     displayMovies(movie);
            // }
    })
}