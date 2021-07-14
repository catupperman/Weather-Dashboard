//TODO: a weather dashboard with form inputs
//TODO: search for a city, presented with current and future conditions for that city and that city is added to the search history
//Weather API
//var testURL= "https://api.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=b189ed07703c87b6aee0ad39e180260d"
function weather(city) {
    var openWeathURL = "https://api.openweathermap.org/data/2.5/forecast?q="
    var myAPIKey = "&appid=b189ed07703c87b6aee0ad39e180260d"
    var selectCity = document.querySelector("#selectcity-input").value
    var searchBtn = document.querySelector(".btn")

    //Parse all three together in fullURL after finishing testing
    var fullURL = openWeathURL + selectCity + myAPIKey;

    fetch(fullURL)
        .then(function (response) {
            response.json();

            var resultBody = document.createElement('div');
            resultBody.classList.add('card-body');
            resultCard.append(resultBody);
        })

        console.log(fullURL)
}


function printWeather(resultObj) {
    //console.log(resultObj);

    var weatherDisplay = document.createElement('div');
    weatherDisplay.classList.add('card', 'sm-light', 'text-light', 'mb-3', 'p-3');


    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;

    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
        '<strong>Date:</strong> ' + resultObj.date + '<br/>';

    if (resultObj.subject) {
        bodyContentEl.innerHTML +=
            '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
    } else {
        bodyContentEl.innerHTML +=
            '<strong>Subjects:</strong> No subject for this entry.';
    }

    if (resultObj.description) {
        bodyContentEl.innerHTML +=
            '<strong>Description:</strong> ' + resultObj.description[0];
    } else {
        bodyContentEl.innerHTML +=
            '<strong>Description:</strong>  No description for this entry.';
    }

    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', resultObj.url);
    linkButtonEl.classList.add('btn', 'btn-dark');

    resultBody.append(titleEl, bodyContentEl, linkButtonEl);

    resultContentEl.append(weatherDisplay);
}

function searchApi(query, format) {
    var locQueryUrl = 'https://www.loc.gov/search/?fo=json';

    if (format) {
        locQueryUrl = 'https://www.loc.gov/' + format + '/?fo=json';
    }

    locQueryUrl = locQueryUrl + '&q=' + query;

    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (locRes) {
            // write query to page so user knows what they are viewing
            resultTextEl.textContent = locRes.search.query;

            console.log(locRes);

            if (!locRes.results.length) {
                console.log('No results found!');
                resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                resultContentEl.textContent = '';
                for (var i = 0; i < locRes.results.length; i++) {
                    printResults(locRes.results[i]);
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}
//fetch API using combined fullURL- event listener
//function with user parameter on click of search to show the weather for that city


//save said user selection within local storage, appending to the page, so that it will remain in a separate button under the search bar and remains after refreshing the page.



//TODO:view current weather conditions for that city, presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//TODO view the UV index, presented with a color that indicates whether the conditions are favorable, moderate, or severe
//TODO: view future weather conditions for that city, presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//TODO: click on a city in the search history, again presented with current and future conditions for that city
