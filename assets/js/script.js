const API_KEY = "76d72308";

// Global variables
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-text');
const searchButton = document.querySelector('#search-button');

// Event Listeners
// searchForm.addEventListener('submit', getMovie);
searchButton.addEventListener('click', getMovie);


// Functions 

// Search movie function
function getMovie(e) {
    // prevent form from sumitting
    e.preventDefault();

    // grab value from form input
    let search = searchInput.value;

    // check if there is text to submit, else trigger alert
    if (search != "") {
        alert("You've searched for something!");

    } else {
        // Alert message when search box is empty
        alert("Give us a hint! Search a movie, director or series for more information.");
    }
    
};
