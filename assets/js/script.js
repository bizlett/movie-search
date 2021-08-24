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

// Event Listeners
// searchForm.addEventListener('submit', getMovie);
searchButton.addEventListener('click', getWatch);


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
        let myUrl = url + '&query=' + search;

        // calls to api url to get information
        fetch(myUrl)
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
        alert("Give us a hint! Search an actor or director for more recommendations.");
    }
};

// function to display search results to watchList
function createWatchList(data) {
    // clear current results before adding new results
    watchList.innerHTML = '';

    // create container to hold search results heading
    let resultsHeader = document.createElement('div');
    resultsHeader.classList.add('results-header');

    // write content to results header
    resultsHeader.textContent = 'Search results';

    // append results header into watch list section
    watchList.appendChild(resultsHeader);

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