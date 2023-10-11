
const apiKey = 'aa7b17bf'; // Your OMDB API key

function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `https://www.omdbapi.com/?s=${searchInput}&apikey=${apiKey}`;

    fetch(apiUrl)     //fetch
        .then(response => response.json())   //pomise success
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                displayError(data.Error);
            }
        })
        .catch(error => {      //promise reject
            console.error('Error:', error);
            displayError('An error occurred while fetching data.');
        });
}

function displayMovies(movies) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <h2>${movie.Title} (${movie.Year})</h2>
           
            <img src="${movie.Poster}" alt="${movie.Title}">
            <button onclick="showMovieDetails('${movie.imdbID}')">Show Details</button>
        `;
        searchResults.appendChild(movieCard);
    });
}

function showMovieDetails(imdbID) {
    const apiUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`; //api

    fetch(apiUrl)      //readable file convert
        .then(response => response.json())
        .then(data => {
            displayMovieDetails(data);
        })
        .catch(error => {
            console.error('Error:', error);
            displayError('An error occurred while fetching movie details.');
        });
}

function displayMovieDetails(movie) {      //using data from api
    const movieDetails = document.getElementById('movieDetails');
    movieDetails.innerHTML = '';

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-card');
    movieInfo.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <p>Director: ${movie.Director}</p>
        <p>Producer: ${movie.Production}</p>
        <p>${movie.Genre}</p>
        <p>${movie.Plot}</p>
        <img src="${movie.Poster}" alt="${movie.Title}">
    `;

    movieDetails.appendChild(movieInfo);
}

function displayError(message) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `<p>${message}</p>`;
}