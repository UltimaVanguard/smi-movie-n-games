function getgames() {
    //
    //  If statements for criteria goes here 
    //
    
    // Need to add criteria to the URL
    // Build search URL
    const searchURL = 'https://api.rawg.io/api/games?&key=1f307ccc56be4c28bbb79985edb675eb'

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