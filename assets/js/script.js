// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}`;

const popularUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;
const trendingUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc`;

const posterImagePath = 'https://image.tmdb.org/t/p/w185/';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

const watchList = document.querySelector('#watch-list');
const popularList = document.querySelector('#popular-list');
const trendingList = document.querySelector('#trending-list');

// Event Listeners
// searchForm.addEventListener('submit', getMovie);
searchButton.addEventListener('click', getWatch);
popularList.addEventListener('load', getPopularMovies);
trendingList.addEventListener('load', getTrendingMovies);

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
                createWatchList(data.results);
            })
            // if error - logs error to console 
            .catch((error) => {
                console.log(error);
            });

        // clear search input
        searchInput.value = '';

    } else {
        // Alert message when search box is empty
        alert("Give us a hint! Search an actor or director for recommendations.");
    }
};
