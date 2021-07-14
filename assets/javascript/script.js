//TODO: a weather dashboard with form inputs
//TODO: search for a city, presented with current and future conditions for that city and that city is added to the search history
//Weather API
//var testURL= "https://api.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=b189ed07703c87b6aee0ad39e180260d"
var selectCityEl = document.querySelector("#selectcity-input")
var searchBtn = document.querySelector(".btn");

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var city = selectCityEl.value
    //console.log(city)
    weather(city);
})

function weather(selectCity) {
    var openWeathURL = "https://api.openweathermap.org/data/2.5/weather?q="
    var myAPIKey = "&units=imperial&appid=b189ed07703c87b6aee0ad39e180260d"
    console.log(selectCity);
    //Parse all three together in fullURL after finishing testing
    var fullURL = openWeathURL + selectCity + myAPIKey;

    fetch(fullURL)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                console.log(response.status);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var card = $("<div>").addClass("card m-1").attr("style", "border: 1px solid black");
            var cardBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h3>").addClass("card-title").text(data.name)
            var temp = $("<h5>").addClass("card-text").text("Temperature:" + Math.round(data.main.temp) + String.fromCharCode(176))
            $("#weather-main").append(card.append(cardBody.append(cardTitle, temp)))

            //call oneCall here
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            fiveDay(lat, lon)
        });

    console.log(fullURL)
}

function fiveDay(lat, lon) {
    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely`
    var myAPIKey = "&units=imperial&appid=b189ed07703c87b6aee0ad39e180260d"

    //Parse all three together in fullURL after finishing testing
    var fullURL = oneCallUrl + myAPIKey;

    fetch(fullURL)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                console.log(response.status);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        })
}


//fetch API using combined fullURL- event listener
//function with user parameter on click of search to show the weather for that city


//save said user selection within local storage, appending to the page, so that it will remain in a separate button under the search bar and remains after refreshing the page.



//TODO:view current weather conditions for that city, presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//TODO view the UV index, presented with a color that indicates whether the conditions are favorable, moderate, or severe
//TODO: view future weather conditions for that city, presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//TODO: click on a city in the search history, again presented with current and future conditions for that city
