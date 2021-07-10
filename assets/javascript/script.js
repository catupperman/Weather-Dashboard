//TODO: a weather dashboard with form inputs
//TODO: search for a city, presented with current and future conditions for that city and that city is added to the search history
//Weather API
//var testURL= "https://api.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=b189ed07703c87b6aee0ad39e180260d"

var openWeathURL = "api.openweathermap.org/data/2.5/forecast?q="
//var cityURL = "{city name}" //user input-convert into a string
var myAPIKey = "&appid=b189ed07703c87b6aee0ad39e180260d"
var selectCity = document.querySelector("#selectcity-input").value
var searchBtn = document.querySelector(".btn")

//Parse all three together in fullURL after finishing testing
var fullURL = openWeathURL + selectCity + myAPIKey;
//fetch API using combined fullURL- event listener
//function with user parameter on click of search to show the weather for that city

fetch (fullURL)
//.then(function()

//);




//save said user selection within local storage, appending to the page, so that it will remain in a separate button under the search bar and remains after refreshing the page.




//TODO:view current weather conditions for that city, presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//TODO view the UV index, presented with a color that indicates whether the conditions are favorable, moderate, or severe
//TODO: view future weather conditions for that city, presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//TODO: click on a city in the search history, again presented with current and future conditions for that city
 