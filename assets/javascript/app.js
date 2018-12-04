//need a function to call upon ajax. 
//this portion needs to call upon google maps, not yelp. 
function startSearch () {
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
    }).then(function(response1) {
        console.log(response1);
        console.log(response1.results[0].geometry.location.lng);
        console.log(response1.results[0].geometry.location.lat);

        lati = response1.results[0].geometry.location.lat;
        long = response1.results[0].geometry.location.lng;

        var cuisine = $("option").val();
        var queryURLGoogleMaps = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lati + "," + long + "&radius=8000&type=restaurant&keyword=" + cuisine + "&key=" + apiKeyGoogle;

        $.ajax({
            url: queryURLGoogleMaps,
            method: 'GET',       
        }).then(function(response2) {
            console.log(response2);
        })
    });

   
    //radius is set to 8000 meters which is about 5 miles 
    // var queryURLGoogleMaps1 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + lat + "," + lng + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + apiKeyGoogle;
   

    
}














function makeRestaurantCard() { // yImageLink, yRestName, yRestAddress, yRestHappyHours) { // parameters sent to set values
    // imageLink: link of restaurant image
    // restName: str name of restaurant 
    // restAddress: str address
    // happyHours: str happyHours
    var card = $("<div>");
    // main div card that everything goes into
    card.addClass("card restaurant-card");

    var cardImage = $("<div>");
    // creates portion of restaurant card with the image.

    figure.addClass("image is-4by3");

    cardImage.addClass("card-image");
    var figure = $("<figure>");
    // set up picture (placeholder for now) for image portion
    var img = $("<img>");
    img.addClass("restImage");
    img.attr("src", "https://bulma.io/images/placeholders/1280x960.png"); // img.attr("src", imageLink); 
    img.attr("alt", "Placeholder Image"); //img.attr("alt", restName)
    // add restaurant card to page

    // add picture to image portion.
    figure.append(img);
    cardImage.append(figure);
    // add image portion to card

    card.append(cardImage)

    //create second portion of card (restaurant name, address, and happy hours)
    var cardContent = $("<div>");
    cardContent.addClass("card-content");
    // create div for restaurant basic info

    var restaurantBasics = $("<div>");
    restaurantBasics.addClass("restaurantBasics");

    // create line for restaurant name add name
    var restName = $("<p>");
    restName.text("restName"); // delete this when parameters filled in.
    restName.addClass("title is-4 restName");

    // add value to restaurant basics. then to card content
    // create line for restaurant address. add address
    var restAddress = $("<p>");
    restAddress.addClass("subtitle is-6 restAddress");
    restAddress.text("restAddress") // delete this when parameters filled in.

    restaurantBasics.append(restAddress);
    restaurantBasics.append(restName);
    cardContent.append(restaurantBasics);

    // create div for restaurant happy hours
    var happyHoursDiv = $("<div>");
    // happyHoursSpan.attr("id", "happyHours"); // not sure we need to do a span if we just add the hours in this part
    // var happyHoursSpan = $("<span>");
    var restHappyHours = "08:00 - 09:00"
    happyHoursDiv.append(restHappyHours);
    //  add value to happy hours. then to card content

    happyHoursDiv.append("Happy Hours: ");
    cardContent.append(happyHoursDiv);

}
    addRestCard(card);
    card.append(cardContent);
    // add card content to restaurant card


    // new row
    cardCount++;

function addRestCard(restCard) {
        rowCount++;
        var rowClass = "rowNum" + rowCount;
        currRow = $("<div>");
        currRow.addClass("columns");
    if ((cardCount % 3) === 1) {
        currRow.addClass(rowClass);
        $(".results").append(currRow);

    }
    var newCard = $("<div>");
    newCard.addClass("column is-one-third");
    currRow.append(newCard);

    newCard.append(restCard);
}
// global variables
var cardCount = 0;
var rowCount = 0;
var currRow;
$(".closeSignInModal").click(function () {
// SIGN IN MODAL close & submit
    // if sign in fails, clear form so user can retry
    $("#signInModal").toggleClass("is-active");
});
// SEARCH FORM submit


$(document).on("click", "#submitSearch", function () {
    startSearch();
})
// SEARCH FORM clear

$(document).on("click", "#clearSearch", clearSearchForm);

// RESTAURANT CARD onclick
$(document).on("click", ".restaurant-card", function(){
    // activate selected Restaurant Modal
    $("#selResModal").toggleClass("is-active");

});
// RESTAURANT MODAL close
$(document).on("click", "#closeSelResModal", function(){
    $("#selResModal").toggleClass("is-active");
});
makeRestaurantCard();