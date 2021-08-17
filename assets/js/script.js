// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const url = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-text');
const searchButton = document.querySelector('#search-button');

// Event Listeners
// searchForm.addEventListener('submit', getMovie);
searchButton.addEventListener('click', getWatch);


// Functions 

// Search movie function
function getWatch(e) {
    // prevent form from sumitting
    e.preventDefault();

    // grab value from form input
    let search = searchInput.value;

    // check if there is text to submit, then run function
    if (search != "") {

        // define parameters 
        let myUrl = url + '&guery=' + search;

        fetch(myUrl) 
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });

        console.log(search);

        // clear search input
        searchInput.value = '';

    } else {
        // Alert message when search box is empty
        alert("Give us a hint! Search a person, movie or series for more information.");
    }    
};
