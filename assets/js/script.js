// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}`;

const popularUrl = `https://api.themoviedb.org/3/discover/movie?api_key=f0eb98b7c925ef27dc4b795263d8bfe8&language=en-US&sort_by=popularity.desc`;
const trendingUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc`;

const posterImagePath = 'https://image.tmdb.org/t/p/w185/';

// searchForm isn't being used right now
// const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

const watchList = document.querySelector('#watch-list');
const popularList = document.querySelector('#popular-list');
const trendingList = document.querySelector('#trending-list');

// Event Listeners
searchButton.addEventListener('click', getWatch);

window.addEventListener('load', (event) => {
    getPopularMovies();
    getTrendingMovies();
});

// Functions 

// Search movie/series function
function getWatch(e) {
    // prevent form from sumitting
    e.preventDefault();

    // grab value from form input
    let search = searchInput.value;

    // check if there is text to submit, then run function
    if (search != "") {

        // define parameters 
        let mySearchUrl = url + '&query=' + search;

        // calls to api url to get information
        fetch(mySearchUrl)
            // responds and returns response as json
            .then((res) => res.json())
            // logs data from api to console 
            .then((data) => {
                console.log(data);
                createWatchList(data.results[0].known_for);
            })
            // if error - logs error to console 
            .catch((error) => {
                console.log(error);
            });

        // clear search input
        searchInput.value = '';

    } else {
        // Alert message when search box is empty
        bootbox.alert("Give us a hint! Search an actor or director for inspiration!");
    }
};


// function to get popular movies
function getPopularMovies(e) {
    // calls to api url to get information
    fetch(popularUrl)
        // responds and returns response as json
        .then((res) => res.json())
        // logs data from api to console 
        .then((data) => {
            // console.log(data);
            createPopularList(data.results);
        })
        // if error - logs error to console 
        .catch((error) => {
            console.log(error);
        });
}


// function to get trending movies
function getTrendingMovies(e) {
    // calls to api url to get information
    fetch(trendingUrl)
        // responds and returns response as json
        .then((res) => res.json())
        // logs data from api to console 
        .then((data) => {
            console.log(data);
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

    // create container to hold search results heading
    let listHeader = document.createElement('div');
    listHeader.classList.add('list-header');

    // write content to results header
    listHeader.textContent = 'Search results';

    // append results header into watch list section
    watchList.appendChild(listHeader);

    // iterate over results and create listing container to hold it within
    data.forEach(movie => {
        let {
            poster_path,
            title,
            vote_average,
            overview
        } = movie;

        // create container to hold search results
        let listingContainer = document.createElement('div');
        listingContainer.classList.add('listing');

        // write content to listing container - poster image, title, rating
        listingContainer.innerHTML = `
       <img src="${posterImagePath + poster_path}" alt="${title} poster"/>
       <div class="listing-info">
       <h4>${title}</h4>
       <span>Rating ${vote_average}</span>
       </div>
       <div class="overview">
       ${overview}  
       </div>
       `;

        // append results container into watch list section
        watchList.appendChild(listingContainer);
    });
};


// function to display popular movies  
function createPopularList(data) {
    // clear current results before adding new results
    popularList.innerHTML = '';

    // add if statement in case media type returned is tv_show which has different
    // properties


    // iterate over results and create listing container to hold it within
    data.forEach(movie => {
        let {
            poster_path,
            title,
            vote_average,
            overview
        } = movie;

        // create container to hold search results
        let listingContainer = document.createElement('div');
        listingContainer.classList.add('listing');

        // write content to listing container - poster image, title, rating
        listingContainer.innerHTML = `
       <img src="${posterImagePath + poster_path}" alt="${title} poster"/>
       <div class="listing-info">
       <h4>${title}</h4>
       <span>Rating ${vote_average}</span>
       </div>
       <div class="overview">
       ${overview}  
       </div>
       `;

        // append results container into watch list section
        popularList.appendChild(listingContainer);
    });
};


// function to display trending movies  
function createTrendingList(data) {
    // clear current results before adding new results
    trendingList.innerHTML = '';

    // add if statement in case media type returned is tv_show which has different
    // properties

    // iterate over results and create listing container to hold it within
    data.forEach(movie => {
        let {
            poster_path,
            title,
            vote_average,
            overview
        } = movie;

        // create container to hold search results
        let listingContainer = document.createElement('div');
        listingContainer.classList.add('listing');

        // write content to listing container - poster image, title, rating
        listingContainer.innerHTML = `
       <img src="${posterImagePath + poster_path}" alt="${title} poster"/>
       <div class="listing-info">
       <h4>${title}</h4>
       <span>Rating ${vote_average}</span>
       </div>
       <div class="overview">
       ${overview}  
       </div>
       `;

        // append results container into watch list section
        trendingList.appendChild(listingContainer);
    });
};
