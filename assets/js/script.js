// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const baseUrl = 'https://api.themoviedb.org/3/';
const personUrl = `search/person?api_key=${API_KEY}&language=en-US`;
const popularUrl = `movie/popular?api_key=${API_KEY}&language=en-US`;
const trendingUrl = `trending/movie/day?api_key=${API_KEY}`;
const posterImagePath = 'https://image.tmdb.org/t/p/w185/';

const searchInputRef = document.querySelector('#search-input');
const searchButtonRef = document.querySelector('#search-button');
const searchResultsHeaderRef = document.querySelector('#search-results-header');
const searchResultsListRef = document.querySelector('#search-results-list');
const popularListRef = document.querySelector('#popular-list');
const trendingListRef = document.querySelector('#trending-list');
const morePopularMoviesButtonRef = document.querySelector('#more-popular');
const moreTrendingMoviesButtonRef = document.querySelector('#more-trending');
const movieModalRef = document.querySelector("#movie-modal");

const movieDetails = ["title", "release_date", "genres", "runtime", "tagline", "overview", "poster_path"];
const movieModal = new bootstrap.Modal(movieModalRef);

// Event Listeners
searchButtonRef.addEventListener('click', searchPerson);

window.addEventListener('load', (e) => {
    getPopularMovies();
    getTrendingMovies();
});

window.addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() == 'img') {
        let movieId = e.target.dataset.movieId;
        getMovieDetails(e, movieId);
    }
});

morePopularMoviesButtonRef.addEventListener('click', getMoreMovies);

moreTrendingMoviesButtonRef.addEventListener('click', getMoreMovies);

// Functions 

/**
 * This function searches for a person based on the user input. 
 * The user types search term into the input and clicks searchButtonRef.
 * It calls to the TMDB API to get the person ID.
 * @param {EventListener} e
 */
function searchPerson(e) {
    e.preventDefault();
    let search = searchInputRef.value;
    if (search != "") {
        let searchInputRefUrl = baseUrl + personUrl + '&query=' + search;
        fetch(searchInputRefUrl)
            .then((res) => res.json())
            .then((person) => {
                switch (person.results[0].known_for_department) {
                    case 'Acting':
                        getSearchResults(person.results[0].id, true);
                        break;
                    case 'Writing':
                        getSearchResults(person.results[0].id, false);
                        break;
                    case 'Directing':
                        getSearchResults(person.results[0].id, false);
                        break;
                    default:
                        bootbox.alert("Try searching for an actor, writer or director to return movie suggestions.");
                        break;
                }
            })
            .catch((error) => {
                console.log(error);
                bootbox.alert("Try searching for an actor, writer or director to return movie suggestions.");
            });
        searchInputRef.value = '';
    } else {
        bootbox.alert("Give us a hint! Try searching for an actor, writer or director.");
    }
}

/**
 * This function gets the movie credits of person a user has searched for.
 * @param {Number} personId
 * @param {String} actor 
 */
function getSearchResults(personId, actor) {
    fetch(baseUrl + `person/${personId}/movie_credits?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json())
        .then((movies) => {
            if (actor) {
                displaySearchResults(movies.cast, searchResultsListRef);
            } else {
                displaySearchResults(movies.crew, searchResultsListRef);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

/**
 * This function displays the list of movies from the users search.
 * @param {Array.Object} movies The list of movies (filmography) of the person that the user searched for
 */
function displaySearchResults(movies) {
    searchResultsListRef.innerHTML = '';
    // shows list header
    searchResultsHeaderRef.style.display = "block";
    movies.forEach(movie => {
        let {
            poster_path,
            title,
            vote_average,
        } = movie;

        if (poster_path !== null) {
            let listingContainer = document.createElement('div');
            listingContainer.classList.add('listing', 'zoom');
            listingContainer.innerHTML = `
            <img src="${posterImagePath + poster_path}" alt="${title} poster" data-movie-id=${movie.id}>
            <div class="listing-info">
            <h4>${title}</h4>
            <span>Rating ${vote_average}</span>
            </div>
            `;
            searchResultsListRef.appendChild(listingContainer);
        }
    });
}

/**
 * This function gets a list of movies that are popular on TMDB.
 */
function getPopularMovies() {
    fetch(baseUrl + popularUrl)
        .then((res) => res.json())
        .then((movies) => {
            displayMovies(movies.results, popularListRef);
        })
        .catch((error) => {
            console.log(error);
        });
}

/**
 * This function gets a list of movies that are trending on TMDB.
 */
function getTrendingMovies() {
    fetch(baseUrl + trendingUrl)
        .then((res) => res.json())
        .then((movies) => {
            displayMovies(movies.results, trendingListRef);
        })
        .catch((error) => {
            console.log(error);
        });
}

/**
 * This function displays the list of popular movies and trending movies in the relevant container.
 * @param {Array.Object} movies 
 * @param {Element} listType 
 */
function displayMovies(movies, listType) {
    listType.innerHTML = '';
    movies.forEach(movie => {
        let {
            poster_path,
            title,
            vote_average,
        } = movie;

        if (poster_path !== null) {
            let listingContainer = document.createElement('div');
            listingContainer.classList.add('listing', 'zoom');
            listingContainer.innerHTML = `
            <img src="${posterImagePath + poster_path}" alt="${title} poster" data-movie-id=${movie.id}>
            <div class="listing-info">
            <h4>${title}</h4>
            <span>Rating ${vote_average}</span>
            </div>
            `;
            listType.appendChild(listingContainer);
        }
    });
}

/**
 * This function loads another page of results from the list of popular or trending movies.
 * It loads more movies when the user clicks the 'Search more' buttons 
 * @param {EventListener} e 
 */
function getMoreMovies(e) {
    let page = Math.floor(Math.random() * 500) + 1;

    if (e.target.id === 'more-popular') {
        fetch(baseUrl + popularUrl + '&page=' + `${page}`) //url is constructed with randomly generated page number
            .then((res) => res.json())
            .then((movies) => {
                displayMovies(movies.results, popularListRef);
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        fetch(baseUrl + trendingUrl + '&page=' + `${page}`) //url is constructed with randomly generated page number
            .then((res) => res.json())
            .then((movies) => {
                displayMovies(movies.results, trendingListRef);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

/**
 * This function gets movie data to pass into the showMovieDetails function.
 * It uses an eventlistener targeting the poster image.
 * The original code to target the img element came from Esterling Accime (https://www.youtube.com/watch?v=mWg2udweauY&t=3518s)
 * @param {EventListener} e 
 * @param {number} movieId 
 */
function getMovieDetails(e, movieId) {
    let movieDetailsUrl = `movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetch(baseUrl + movieDetailsUrl)
        .then((res) => res.json())
        .then((data) => {
            showMovieDetails(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

/**
 *  * This function creates a modal displaying information about the movie the user has clicked. 
 * @param {Object} data 
 */
function showMovieDetails(data) {
    const movieInfo = Object.fromEntries(Object.entries(data).filter(([key, value]) => movieDetails.includes(key)));
    let genres = movieInfo.genres;
    let movieGenres = "";

    for (let i = 0; i < genres.length; i++) {
        movieGenres += genres[i].name + ", ";
    }

    let movieModalContent = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content" id="movie-modal-content">
                <div class="modal-header" id="movie-modal-header">
                    <div>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title"><strong>${movieInfo.title}</h5> ${movieInfo.release_date.slice(0,4)} </strong>
                    </div>
                    <div>              
                        <span id="genres"><strong>${movieGenres} </strong></span>
                        <span> ${movieInfo.runtime} minutes</span>
                    </div>
                </div>
                <div class="modal-body" id="movie-modal-body">
                    <div class="container-fluid">
                        <div id="movie-modal-row" class="row">
                            <div>
                                <img class="modal-poster" src="${posterImagePath + movieInfo.poster_path}" alt="${movieInfo.title} poster">
                            </div>
                            <div>
                                <h6><em>${movieInfo.tagline}</em></h6>
                                <p>${movieInfo.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>         
                <div class="modal-footer" id="movie-modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Back to movies</button>
                </div>
            </div>
        </div>
        `;
    movieModalRef.innerHTML = movieModalContent;
    movieModal.show();
}