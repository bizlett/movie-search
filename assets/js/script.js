// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const baseUrl = 'https://api.themoviedb.org/3/';
const personUrl = `search/person?api_key=${API_KEY}&language=en-US`;
const popularUrl = `movie/popular?api_key=${API_KEY}&language=en-US`;
const trendingUrl = `trending/movie/day?api_key=${API_KEY}`;
const posterImagePath = 'https://image.tmdb.org/t/p/w185/';
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const watchList = document.querySelector('#watch-list');
const popularList = document.querySelector('#popular-list');
const trendingList = document.querySelector('#trending-list');
const morePopularMoviesButton = document.querySelector('#more-popular');
const moreTrendingMoviesButton = document.querySelector('#more-trending');

// Event Listeners
searchButton.addEventListener('click', searchPerson);

window.addEventListener('load', (e) => {
    getPopularMovies();
    getTrendingMovies();
});

window.addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() == 'img') {

        let target = e.target;
        let movieId = target.dataset.movieId;

        showMovieDetails(e, movieId);
    };
});

morePopularMoviesButton.addEventListener('click', getMoreMovies);

moreTrendingMoviesButton.addEventListener('click', getMoreMovies);

// Functions 

// Search movie/series function based on person
function searchPerson(e) {
    e.preventDefault();
    let search = searchInput.value;
    if (search != "") {
        let searchInputUrl = baseUrl + personUrl + '&query=' + search;
        // calls to api url to get person based on user search
        fetch(searchInputUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                switch (data.results[0].known_for_department) {
                    case 'Acting':
                        getResults(data.results[0].id, true);
                        break;
                    case 'Writing':
                        getResults(data.results[0].id, false);
                        break;
                    case 'Directing':
                        getResults(data.results[0].id, false);
                        break;
                    default:
                        bootbox.alert("Sorry no results here! Try searching for an actor, writer or director.");
                        break;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // clear search input
        searchInput.value = '';
    } else {
        bootbox.alert("Give us a hint! Try searching for an actor, writer or director.");
    }
}

// function to get results from person search
function getResults(person_id, actor) {
    //second api call to return movie credits using person id         
    fetch(baseUrl + `person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json())
        .then((data) => {
            if (actor) {
                displayMovies(data.cast, watchList);
            } else {
                displayMovies(data.crew, watchList);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// // function to display movies from search 
// function createWatchList(data) {
//     watchList.innerHTML = '';
//     document.getElementById('search-results-header').style.display = "block";
//     data.forEach(movie => {
//         let {
//             poster_path,
//             title,
//             vote_average,
//         } = movie;

//         if (poster_path !== null) {
//             let listingContainer = document.createElement('div');
//             listingContainer.classList.add('listing', 'zoom');
//             listingContainer.innerHTML = `
//             <img src="${posterImagePath + poster_path}" alt="${title} poster" data-movie-id=${movie.id}>
//             <div class="listing-info">
//             <h4>${title}</h4>
//             <span>Rating ${vote_average}</span>
//             </div>
//             `;
//             watchList.appendChild(listingContainer);
//         }
//     });
// };

// function to get popular movies
function getPopularMovies(e) {
    fetch(baseUrl + popularUrl)
        .then((res) => res.json())
        .then((data) => {
            displayMovies(data.results, popularList);
        })
        .catch((error) => {
            console.log(error);
        });
}

// function to get top rated movies
function getTrendingMovies(e) {
    fetch(baseUrl + trendingUrl)
        .then((res) => res.json())
        .then((data) => {
            displayMovies(data.results, trendingList);
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
function getMoreMovies(e) {
    let page = Math.floor(Math.random() * 500) + 1;

    if (e.target.id === 'more-popular') {
        fetch(baseUrl + popularUrl + '&page=' + `${page}`) //url is constructed with randomly generated page number
            .then((res) => res.json())
            .then((data) => {
                displayMovies(data.results, popularList);
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        fetch(baseUrl + trendingUrl + '&page=' + `${page}`) //url is constructed with randomly generated page number
            .then((res) => res.json())
            .then((data) => {
                displayMovies(data.results, trendingList);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

// function to open movie listing modal
// original code to target img element from Esterling Accime (https://www.youtube.com/watch?v=mWg2udweauY&t=3518s)
// support from tutor support on object.fromEntries and to solve display bug with modal
function showMovieDetails(e, movieId) {
    let movieDetailsUrl = `movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    //second api call to return movie details using movie id 
    fetch(baseUrl + movieDetailsUrl)
        .then((res) => res.json())
        .then((data) => {
            let filters = ["title", "release_date", "genres", "runtime", "tagline", "overview"];
            let movieInfo = Object.fromEntries(Object.entries(data).filter(([k, v]) => filters.includes(k)));
            let movieModalRef = document.querySelector("#movie-modal");
            let movieModal = new bootstrap.Modal(movieModalRef, {
                backdrop: true
            });
            let genreName = movieInfo.genres;
            genreName.forEach(genre => {
                let {
                    name
                } = genre;

                console.log(genre);
                movieModalRef.innerHTML = `
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="movieModalTitle"><strong>${movieInfo.title} </h5> <span> (${movieInfo.release_date.slice(0,4)})</span></strong>
                                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div>                
                                            <span id="genres"><strong>${genre.name} </strong></span>
                                            <span> ${movieInfo.runtime} minutes</span>
                                        </div>
                                        <div>
                                            <h6><em>${movieInfo.tagline}</em></h6>
                                            <p>${movieInfo.overview}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>         
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Back to movies</button>
                            </div>
                        </div>
                    </div>
                    `; 
            });
            movieModal.show();
        })    
        .catch((error) => {
            console.log(error);
        });
}

