// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const baseUrl = 'https://api.themoviedb.org/3/';
const personUrl = `search/person?api_key=${API_KEY}&language=en-US`;
const popularUrl = `movie/popular?api_key=${API_KEY}&language=en-US`;
const trendingUrl = `trending/all/day?api_key=${API_KEY}`;

const posterImagePath = 'https://image.tmdb.org/t/p/w185/';

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

const watchList = document.querySelector('#watch-list');
const popularList = document.querySelector('#popular-list');
const trendingList = document.querySelector('#trending-list');

const morePopularMoviesButton = document.querySelector('#more-popular');
const moreTrendingMoviesButton = document.querySelector('#more-trending');

// Event Listeners
searchButton.addEventListener('click', getWatch);

window.addEventListener('load', (e) => {
    getPopularMovies();
    getTrendingMovies();
});

morePopularMoviesButton.addEventListener('click', getMorePopularMovies);

moreTrendingMoviesButton.addEventListener('click', getMoreTrendingMovies);

// Functions 

// Search movie/series function based on person
function getWatch(e) {
    // prevent form from sumitting
    e.preventDefault();

    // grab value from form input
    let search = searchInput.value;

    // check if there is text to submit, then run function
    if (search != "") {

        // define parameters 
        let searchInputUrl = baseUrl + personUrl + '&query=' + search;

        // calls to api url to get person based on user search
        fetch(searchInputUrl)
            // responds and returns response as json
            .then((res) => res.json())
            // get person id from previous api call
            .then((data) => {
                // if person is an actor
                if (data.results[0].known_for_department == 'Acting') {
                    let person_id = data.results[0].id;
                    
                    // second api call to return movie credits using person id
                    fetch(baseUrl + `person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`)
                        .then((res) => res.json())
                        // trigger createWatchList function to display movie credit results
                        .then((data) => {
                            createWatchList(data.cast);
                        })
                } else if (data.results[0].known_for_department == 'Directing') {
                    let person_id = data.results[0].id;
                    
                    // second api call to return movie credits using person id
                    fetch(baseUrl + `person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`)
                        .then((res) => res.json())
                        // trigger createWatchList function to display movie credit results
                        .then((data) => {
                            createWatchList(data.crew);
                        })
                } else if (data.results[0].known_for_department == 'Writing') {
                    let person_id = data.results[0].id;
                   
                    // second api call to return movie credits using person id
                    fetch(baseUrl + `person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`)
                        .then((res) => res.json())
                        // trigger createWatchList function to display movie credit results
                        .then((data) => {
                            createWatchList(data.crew);
                        })
                } else {
                    // Alert message to prompt to ask for director or actor
                    bootbox.alert("Sorry no results here! Try searching for an actor, writer or director.");
                }
            })

            // if error - logs error to console 
            .catch((error) => {
                console.log(error);
            });

        // clear search input
        searchInput.value = '';

    } else {
        // Alert message when search box is empty
        bootbox.alert("Give us a hint! Search an actor, writer or director for inspiration!");
    }
};


// function to get popular movies
function getPopularMovies(e) {
    // calls to api url to get information
    fetch(baseUrl + popularUrl)
        // responds and returns response as json
        .then((res) => res.json())
        // logs data from api to console 
        .then((data) => {
            
            createPopularList(data.results);
        })
        // if error - logs error to console 
        .catch((error) => {
            console.log(error);
        });
}


// function to get top rated movies
function getTrendingMovies(e) {
    // calls to api url to get information
    fetch(baseUrl + trendingUrl)
        // responds and returns response as json
        .then((res) => res.json())
        // logs data from api to console 
        .then((data) => {
   
            createTrendingList(data.results);
        })
        // if error - logs error to console 
        .catch((error) => {
            console.log(error);
        });
}


// function to display movies from search 
function createWatchList(data) {
    // clear current results before adding new results
    watchList.innerHTML = '';

    // show results header
    document.getElementById('search-results-header').style.display = "block";

    // iterate over results and create listing container to hold it within
    data.forEach(movie => {
        let {
            poster_path,
            title,
            vote_average,
        } = movie;
        // removes any results that don't have a poster image
        if (poster_path !== null) {

            // create container to hold search results
            let listingContainer = document.createElement('div');
            listingContainer.classList.add('listing', 'zoom');

            // write content to listing container - poster image, title, rating
            listingContainer.innerHTML = `
       <img src="${posterImagePath + poster_path}" alt="${title} poster" data-movie-id=${movie.id}>
       <div class="listing-info">
       <h4>${title}</h4>
       <span>Rating ${vote_average}</span>
       </div>
       `;

            // append results container into watch list section
            watchList.appendChild(listingContainer);
        }
    });
};


// function to display popular movies  
function createPopularList(data) {
    // clear current results before adding new results
    popularList.innerHTML = '';

    // iterate over results and create listing container to hold it within
    data.forEach(movie => {
        let {
            poster_path,
            title,
            vote_average,
        } = movie;

        // removes any results that don't have a poster image
        if (poster_path !== null) {

            // create container to hold search results
            let listingContainer = document.createElement('div');
            listingContainer.classList.add('listing', 'zoom');

            // write content to listing container - poster image, title, rating
            listingContainer.innerHTML = `
       <img src="${posterImagePath + poster_path}" alt="${title} poster" data-movie-id=${movie.id}>
       <div class="listing-info">
       <h4>${title}</h4>
       <span>Rating ${vote_average}</span>
       </div>
       `;
            // append results container into watch list section
            popularList.appendChild(listingContainer);
        }
    });
};


// function to display top rated movies  
function createTrendingList(data) {
    // clear current results before adding new results
    trendingList.innerHTML = '';

    // iterate over results and create listing container to hold it within
    data.forEach(movie => {
        let {
            poster_path,
            title,
            vote_average,
        } = movie;

        // removes any results that don't have a poster image
        if (poster_path !== null) {

            // create container to hold search results
            let listingContainer = document.createElement('div');
            listingContainer.classList.add('listing', 'zoom');

            // write content to listing container - poster image, title, rating
            listingContainer.innerHTML = `
       <img src="${posterImagePath + poster_path}" alt="${title} poster" data-movie-id=${movie.id}>
       <div class="listing-info">
       <h4>${title}</h4>
       <span>Rating ${vote_average}</span>
       </div>
       `;

            // append results container into watch list section
            trendingList.appendChild(listingContainer);
        }
    });
};


// function to display new page of popular movie results when 'search more' button is clicked
function getMorePopularMovies(e) {
    // define page
    let page = Math.floor(Math.random() * 500) + 1;

    // calls to the api
    fetch(baseUrl + popularUrl + '&page=' + `${page}`) //url is constructed with randomly generated page number

        // responds and returns response as json
        .then((res) => res.json())
        // logs data from api to console 
        .then((data) => {
            
            createPopularList(data.results);
        })
        // if error - logs error to console 
        .catch((error) => {
            console.log(error);
        });
}


// function to display new page of Trending movie results when 'search more' button is clicked
function getMoreTrendingMovies(e) {
    // define page
    let page = Math.floor(Math.random() * 500) + 1;

    // calls to the api
    fetch(baseUrl + trendingUrl + '&page=' + `${page}`) //url is constructed with randomly generated page number

        // responds and returns response as json
        .then((res) => res.json())
        // logs data from api to console 
        .then((data) => {
            
            createTrendingList(data.results);
        })
        // if error - logs error to console 
        .catch((error) => {
            console.log(error);
        });
}


// function to open movie listing
window.addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() == 'img') {
        let target = e.target;
        let movieId = target.dataset.movieId;
        let movieDetailsUrl = `movie/${movieId}?api_key=${API_KEY}&language=en-US`;

        fetch(baseUrl + movieDetailsUrl)
            .then((res) => res.json())
            .then((data) => {
                let filters = ["title", "release_date", "genres", "runtime", "tagline", "overview"];
                let movieInfo = Object.fromEntries(Object.entries(data).filter(([k, v]) => filters.includes(k)));

                console.log(movieInfo);

                //let movieModalRef = new bootstrap.Modal(document.getElementById('movie-modal'))

                let movieModalRef = document.querySelector("#movie-modal");
                let movieModal = new bootstrap.Modal(movieModalRef, {
                    backdrop: true
                });

                movieModalRef.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="movieModalTitle">${movieInfo.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>                
                            <span>${movieInfo.genres}</span>
                            <span>${movieInfo.runtime} minutes</span>
                        </div>
                        <div>
                            <h6>${movieInfo.tagline}</h6>
                            <p>${movieInfo.overview}</p>
                        </div>
                    </div>         
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Back to movies</button>
                </div>
                    `;

                    movieModal.show();
            })
            // if error - logs error to console 
            .catch((error) => {
                console.log(error);

            }); 
    };
});