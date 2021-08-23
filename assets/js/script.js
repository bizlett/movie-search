// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

// const searchPerson = &with_cast

const posterImagePath = 'https://image.tmdb.org/t/p/w185/'

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
        let myUrl = url + '&with_cast=' + search;

        // calls to api url to get information
        fetch(myUrl)
            // responds and returns response as json
            .then((res) => res.json())
            // logs data from api to console 
            .then((data) => {
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
        alert("Give us a hint! Search a movie or series for more information.");
    }
};

// function to display search results to watchList
function createWatchList(data) {
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
        <h4>Overview</h4>
        ${overview}  
        </div>
        `;
    
        // append results container into watch list section
        watchList.appendChild(listingContainer);
    });
};