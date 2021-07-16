//TODO: a weather dashboard with form inputs
var selectCityEl = document.querySelector("#selectcity-input")
var searchBtn = document.querySelector(".btn");
var date = new Date();

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var city = selectCityEl.value
    //TODO: Add Title on Click with Five-Day
    
    localStorage.setItem(selectCityEl, city);
    weather(city);
    
})
//Append to the page as a button that re-enters into the text box
//JSON Parse??
$("#local-city").append(localStorage.getItem(selectCityEl));


//function with user parameter on click of search to show the weather for that city
function weather(selectCity) {
    //Weather API
    var openWeathURL = "https://api.openweathermap.org/data/2.5/weather?q="
    var myAPIKey = "&units=imperial&appid=b189ed07703c87b6aee0ad39e180260d"
    console.log(selectCity);
    //Parse all three together in fullURL 
    var fullURL = openWeathURL + selectCity + myAPIKey;

    //fetch API using combined fullURL- event listener
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
            var iconDaily = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
            var temp = $("<h5>").addClass("card-text").text("Temperature:" + Math.round(data.main.temp) + String.fromCharCode(176))
            var humidity = $("<h5>").addClass("card-text").text("Humidity:" + data.main.humidity+ "%")
            var wind = $("<h5>").addClass("card-text").text("Wind " + Math.round(data.wind.speed) + "MPH")
            var localDate = $("<h5>").addClass("card-text").text(date.toLocaleDateString('en-US'));
            //var uvIndex = $("<h5>").addClass("card-text").text("UV Index: " + data.)
            $("#weather-main").append(card.append(cardBody.append(iconDaily, localDate, cardTitle, temp, humidity, wind)))

            //call oneCall here
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            fiveDay(lat, lon)
        });

    console.log(fullURL)
}
//TODO: search for a city, presented with current and future conditions for that city and that city is added to the search history
//function to pull the five day forecast 
function fiveDay(lat, lon) {
    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely`
    var myAPIKey = "&units=imperial&appid=b189ed07703c87b6aee0ad39e180260d"

    //Parse all three together in fullURL 
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
            for(let i=0; i<5; i++) {
            var cardFiveDay = $("<div>").addClass("card m-2").attr("style", "border: 2px solid black");
            var cardFiveBody = $("<div>").addClass("card-body");
            var dateFiveDay = $("<div>").addClass("card-text").text(date.toLocaleDateString('en-US'));
            var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png")
            var tempFiveDay = $("<p>").addClass("card-text").text("Temperature: " + Math.round(data.daily[i].temp.max)+ String.fromCharCode(176));
            var humFiveDay = $("<p>").addClass("card-text").text("Humidity: " + data.daily[i].humidity + "%");
            var windFiveDay = $("<p>").addClass("card-text").text("Wind: " + Math.round(data.daily[i].wind_speed) + "MPH");
            var uvIndex = $("<p>").addClass("card-text").text("UV Index:  " + data.daily[i].uvi)
            $("#five-day").append(cardFiveDay.append(cardFiveBody.append(dateFiveDay, icon, tempFiveDay, humFiveDay, windFiveDay, uvIndex)));
            
            if(uvIndex <= 3){
                $(this).addClass("good")
            } else if (uvIndex >= 6){
                $(this).addClass("bad")
            } else {
                $(this).addClass("not-so-bad")
            }
            
            console.log(data);
        }

        })
}

//save said user selection within local storage, appending to the page, so that it will remain in a separate button under the search bar and remains after refreshing the page.






//TODO:view current weather conditions for that city, presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//TODO view the UV index, presented with a color that indicates whether the conditions are favorable, moderate, or severe
//TODO: view future weather conditions for that city, presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//TODO: click on a city in the search history, again presented with current and future conditions for that city
