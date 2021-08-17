// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
// need to work on this url - want to search movies and series by title and by actor e.g. brad pitt returns all brad pitt movies
const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&append_to_response=videos,images`;

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

// Event Listeners
// searchForm.addEventListener('submit', getMovie);
searchButton.addEventListener('click', getWatch);


// Functions 

// Search movie/person/series function
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
            // data is being returned as an object
        })
        // if error - logs error to console 
        .catch((error) => {
            console.log(error);
        });

        // logs search results to console??
        console.log(search);

        // clear search input
        searchInput.value = '';

    } else {
        // Alert message when search box is empty
        alert("Give us a hint! Search a person, movie or series for more information.");
    }    
};




