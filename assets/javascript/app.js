//need a function to call upon ajax. 
//this portion needs to call upon google maps, not yelp. 
function startSearch() {
    var apiKeyGoogle = "AIzaSyDlIhSIHh3DOCgKFekiOXVtnGCzdkGdxlE"

    //need to find a way to convert these to long/lat
    var city = $("#citySearch").val().trim();
    city = city.trim().replace(/ /g, "+");
    var state = $("#stateSearch").val().trim();
    var zip = $("#zipSearch").val().trim();
    //function that converts to long/lat and names it with variable "location"
    //which we can actually use geocoding API from google. 
    var queryURLGeocoding = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + state + "&key=" + apiKeyGoogle;
    var long;
    var lati;
    $.ajax({
        url: queryURLGeocoding,
        method: 'GET',
    }).then(function (response1) {
        console.log(response1);
        console.log(response1.results[0].geometry.location.lng);
        console.log(response1.results[0].geometry.location.lat);

        lati = response1.results[0].geometry.location.lat;
        long = response1.results[0].geometry.location.lng;

        var cuisine = $("#cuisineSearch").val();
        var queryURLGoogleMaps = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lati + "," + long + "&radius=8000&type=restaurant&keyword=" + cuisine + "&key=" + apiKeyGoogle;

        $.ajax({
            url: queryURLGoogleMaps,
            method: 'GET',
        }).then(function (response2) {
            console.log(response2);

            for (var i = 0; i < 7; i++) {

            }
        })
    });


    //radius is set to 8000 meters which is about 5 miles 
    // var queryURLGoogleMaps1 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + lat + "," + lng + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + apiKeyGoogle;



}



// main div card that everything goes into
var card = $("<div>");
card.addClass("card restaurant-card");

// contains the figue with image inside 
var cardImage = $("<div>");
cardImage.addClass("card-image");

var figure = $("<figure>");
figure.addClass("image");
figure.addClass("is-4by3");

var img = $("<img>");
img.addClass("restImage");
img.attr("src", response2.results[i].icon);
img.attr("alt", "Placeholder Image");


// appending first div to card div 
figure.append(img);
cardImage.append(figure)

card.append(cardImage)

//contains second div of card div
var cardContent = $("<div>");
cardContent.addClass("card-content");

var restaurantName = $("<div>");
restaurantName.addClass("restaurantName");

var restName = $("<p>");
restName.addClass("title is-4 restName");
restName.html(response2.results[i].geometry.name);

var restAddress = $("<p>");
restAddress.addClass("subtitle is-6 restAddress");

restaurantName.append(restName);
restaurantName.append(restAddress);
cardContent.append(restaurantName);

var happyHoursDiv = $("<div>");
var happyHoursSpan = $("<span>");
happyHoursSpan.attr("id", "happyHours");

happyHoursDiv.append(happyHoursSpan);
cardContent.append(happyHoursDiv);

card.append(cardContent);

$(".results").append(card);
//everything above this appends result card to html 




//functions to get the modals working.
//first function to get the sign in modal to disappear upon clicking login!

//function to get the restaurant information modal to appear once a restaurant card is clicked
function activateRestauarantInfo() {
    var resName = $(this).restaurantName;
    $("#selectedRestaurant").text(ResName);
    $("#selResModal").toggleClass("is-active");
}



//this will invoke the start search to display search in the restaurant cards
$(document).on("click", ".submit", startSearch);
//this invokes the activateRestaurantInfo function on click of a restaurant card
$(document).on("click", ".restaurant-card", activateRestauarantInfo);
//this closes selected restaurant modal
// $(documnet).on("click", "#closeSelResModal", function(){
//    $("#selResModal").toggleClass("is-active");
// });





