// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const baseUrl = 'https://api.themoviedb.org/3/';
const personUrl = `search/person?api_key=${API_KEY}&language=en-US`;
const popularUrl = `movie/popular?api_key=${API_KEY}&language=en-US`;
const trendingUrl = `trending/movie/day?api_key=${API_KEY}`;
const posterImagePath = 'https://image.tmdb.org/t/p/w185/';

const searchInputRef = document.querySelector('#search-input');
const searchButtonRef = document.querySelector('#search-button');
const searchResultsListRef = document.querySelector('#search-results-list');
const popularListRef = document.querySelector('#popular-list');
const trendingListRef = document.querySelector('#trending-list');
const morePopularMoviesButtonRef = document.querySelector('#more-popular');
const moreTrendingMoviesButtonRef = document.querySelector('#more-trending');
const movieModalRef = document.querySelector("#movie-modal");

const movieDetails = ["title", "release_date", "genres", "runtime", "tagline", "overview"];
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

// Search movie/series function based on person
function searchPerson(e) {
    e.preventDefault();
    let search = searchInputRef.value;
    if (search != "") {
        let searchInputRefUrl = baseUrl + personUrl + '&query=' + search;
        // calls to api url to get person based on user search
        fetch(searchInputRefUrl)
            .then((res) => res.json())
            .then((data) => {
                switch (data.results[0].known_for_department) {
                    case 'Acting':
                        getSearchResults(data.results[0].id, true);
                        break;
                    case 'Writing':
                        getSearchResults(data.results[0].id, false);
                        break;
                    case 'Directing':
                        getSearchResults(data.results[0].id, false);
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
        // clear search input
        searchInputRef.value = '';
    } else {
        bootbox.alert("Give us a hint! Try searching for an actor, writer or director.");
    }
}

// function to get results from person search
function getSearchResults(person_id, actor) {
    //second api call to return movie credits using person id         
    fetch(baseUrl + `person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json())
        .then((data) => {
            if (actor) {
                displaySearchResults(data.cast, searchResultsListRef);
            } else {
                displaySearchResults(data.crew, searchResultsListRef);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// // function to display movies from search 
function displaySearchResults(data) {
    searchResultsListRef.innerHTML = '';
    // shows list header
    document.getElementById('search-results-header').style.display = "block";
    data.forEach(movie => {
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

// function to get popular movies
function getPopularMovies() {
    fetch(baseUrl + popularUrl)
        .then((res) => res.json())
        .then((data) => {
            displayMovies(data.results, popularListRef);
        })
        .catch((error) => {
            console.log(error);
        });
}

// function to get top rated movies
function getTrendingMovies() {
    fetch(baseUrl + trendingUrl)
        .then((res) => res.json())
        .then((data) => {
            displayMovies(data.results, trendingListRef);
        })
        .catch((error) => {
            console.log(error);
        });
}

// function to display movies  
function displayMovies(data, listType) {
    listType.innerHTML = '';
    data.forEach(movie => {
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

// function to display new page of movie results when 'search more' button is clicked
function getMoreMovies() {
    let page = Math.floor(Math.random() * 500) + 1;

    if (e.target.id === 'more-popular') {
        fetch(baseUrl + popularUrl + '&page=' + `${page}`) //url is constructed with randomly generated page number
            .then((res) => res.json())
            .then((data) => {
                displayMovies(data.results, popularListRef);
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        fetch(baseUrl + trendingUrl + '&page=' + `${page}`) //url is constructed with randomly generated page number
            .then((res) => res.json())
            .then((data) => {
                displayMovies(data.results, trendingListRef);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

// function to open movie listing modal
// original code to target img element from Esterling Accime (https://www.youtube.com/watch?v=mWg2udweauY&t=3518s)
// support from tutor support on object.fromEntries, to solve display bug with modal and to create movieGenres
function getMovieDetails(e, movieId) {
    let movieDetailsUrl = `movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    //second api call to return movie details using movie id 
    fetch(baseUrl + movieDetailsUrl)
        .then((res) => res.json())
        .then((data) => {
            showMovieDetails(data); 
        })
        .catch((error) => {
            console.log(error);
        });
}

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
                    <h5 class="modal-title"><strong>${movieInfo.title} </h5><span>${movieInfo.release_date.slice(0,4)}</span></strong>
                </div>
                <div class="modal-body" id="movie-modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div>                
                                <span id="genres"><strong>${movieGenres} </strong></span>
                                <span> ${movieInfo.runtime} minutes</span>
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