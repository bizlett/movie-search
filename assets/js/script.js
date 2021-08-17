// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

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
            // data.results
            let myWatch = data.results;
            // drop results into container that's been created...? (need to create container!!) 
            
            // append results container into watch list section
        })
        // if error - logs error to console 
        .catch((error) => {
            console.log(error);
        });


        // logs search results to console?? we will want to display into page
        console.log(search);

        // clear search input
        searchInput.value = '';

    } else {
        // Alert message when search box is empty
        alert("Give us a hint! Search a movie or series for more information.");
    }    
};


// watch list div to create 
/* <div class="listing">
                <div class="listing-image"></div>
                <div class="listing-content">
                    <p></p>
                </div> */


// function to display api data to page
function createWatchList() {
    // create div (listing) to hold watch list information
    // create listing image div and content
    // write content to listing image div (innerhtml?)
    let listingTemplate = `
        <div class="listing">
                <div class="listing-image"></div>
                <div class="listing-content">
                    <p></p>
                </div>`;


    // append listing image div to parent (#watch-list)
    // create div to hold object content 
    // write content to object content div (innerhtml?)
    // append content div to parent (#watch-list)

};



