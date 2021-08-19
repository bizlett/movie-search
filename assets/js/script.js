// Global variables
const API_KEY = 'f0eb98b7c925ef27dc4b795263d8bfe8';
const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

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
                // data.results - need to iterate over the results to drop each result into its listing container
                // iterate over results in listing container function?
                // let myWatch = data.results;
                console.log(data);

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
                <div class="listing-info">
                    <p></p>
                </div> */


// function to display api data to page
function createWatchList(Search) {
    // create div (listing) to hold watch list information
    let listingContainer = document.createElement('div');
    listingContainer.classList.add('listing');
    // create listing image div and info
    // write content to listing image div (innerhtml?)
    let listingTemplate = `
                <div class="listing-image">
                ${search.map((listing) => {
                    // returns value from search and maps into listing
                    return `
                    <img src=${listing.poster_path} data-movie-id=${listing.id}/>
                    `;
                })}
                </div>
                <div class="listing-info">
                    <p></p>
                </div>
                `;
                // .map should iterate through the array returned by search

    // write listing template to listing container
    listingContainer.innerHTML = listingTemplate;

    // return value to listing template - what are my expectations here? What do I want the code to do?
    return listingContainer;

    // append listing container to parent (#watch-list)
    // watchList.appendChild(listingContainer);

};