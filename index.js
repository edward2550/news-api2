'use strict';

const apiKey = "";

const searchUrl = "";

function formatQuereyParams(params){
    const quereyItems = object.key(params)
        .map(key => `${encodeURIComponent(key)} = ${encodeURIComponent(params[key])}`)
    return quereyItems.join("&");
}

function displayResult(responseJson,maxResults) {
    //if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    //iterate through the articles array, stopping at the max number of results
    for(let i = 0; i <responseJson.value.length & i<maxResults; i++) {
        //for each video obecjt in the article 
        //array, add a list item to the results
        //list with the article title, source, author,
        //description, and image
        $('#results-list').append(
            `<li><h3><a href="${responseJson.value[i].url}">${responseJson.value[i].title}</a></h3>
            <p>${responseJson.value[i].description}</p>
            <p>By ${responseJson.value[i].body}</p>
            </li>`
        )};
        //display the results section
        $('#results').removeClass("hidden");
}




function getNews(querey, maxResults=10){
    const params = {
        q: querey ,
        pageSize: maxResults
    };
    const quereyString = formatQuereyParams(params)
    const url = searchUrl + "?" + quereyString;

    console.log(url);

    const options = {
        header : new Headers({
            "x-rapiapi-key": apiKey
        })
    };
    fetch(url,options)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResult(responseJson,maxResults))
    .catch(err => {
        $('#js-error-message').text(`something went wrong: ${err.message}`)
    });
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searcTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNews(searcTerm,maxResults);
    });
}

$(watchForm);