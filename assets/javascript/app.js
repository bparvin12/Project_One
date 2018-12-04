// global variables
var cardCount = 0;
var rowCount = 0;
var currRow;


// SIGN IN MODAL close & submit
$(".closeSignInModal").click(function () {
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



function clearSearchForm() {
    $("#citySearch").val("");
    $("#stateSearch").val("");
    $("#zipSearch").val("");
    $("#cuisineSearch").val("");
}




function startSearch() {
    // API Key for when we actually access yelp
    // var yelpAPIKey = "NHvlP42MwvOCRjHVyCPDGRj0TQ-GnJlBYnZ63U-iJd85a90cehQ9rCSoGhmSRe8bx_Nr1PXb_j2AqafFnSOM2vSg_pUGsjQ0faLnr7GOs_lXWN0stah7PrFdYroFXHYx";
    var city = $("#citySearch").val();
    var state = $("#stateSearch").val();
    var zip = $("#zipSearch").val();
    var cuisine = $("#cuisineSearch").val();

    // reset cardCount and rowCount global variables
    cardCount = 0;
    rowCount = 0;

    // maybe use google to make sure that this location exists before sending to yelp?
    // if it doesn't exist, we could write a little error message above a cleared search form

    // more stuff for when we actually access yelp
    // var queryURL = "https://api.yelp.com/v3/businesses/search?term=by-chloe&location=boston";
    // $.ajax({
    //     url: queryURL,
    //     method: 'GET',       
    // }).then(function(response) {
    //     console.log(response);
    // })

    console.log("city: " + city + " state: " + state + " zip: " + zip + " cuisine: " + cuisine);
}

function makeRestaurantCard() { // yImageLink, yRestName, yRestAddress, yRestHappyHours) { // parameters sent to set values
    // imageLink: link of restaurant image
    // restName: str name of restaurant 
    // restAddress: str address
    // happyHours: str happyHours
    // main div card that everything goes into
    var card = $("<div>");
    card.addClass("card restaurant-card");

    // creates portion of restaurant card with the image.
    var cardImage = $("<div>");
    cardImage.addClass("card-image");

    var figure = $("<figure>");
    figure.addClass("image is-4by3");

    // set up picture (placeholder for now) for image portion
    var img = $("<img>");
    img.addClass("restImage");
    img.attr("src", "https://bulma.io/images/placeholders/1280x960.png"); // img.attr("src", imageLink); 
    img.attr("alt", "Placeholder Image"); //img.attr("alt", restName)

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
    restName.addClass("title is-4 restName");
    restName.text("restName"); // delete this when parameters filled in.

    // create line for restaurant address. add address
    var restAddress = $("<p>");
    restAddress.addClass("subtitle is-6 restAddress");
    restAddress.text("restAddress") // delete this when parameters filled in.

    // add value to restaurant basics. then to card content
    restaurantBasics.append(restName);
    restaurantBasics.append(restAddress);
    cardContent.append(restaurantBasics);

    // create div for restaurant happy hours
    var happyHoursDiv = $("<div>");
    var restHappyHours = "08:00 - 09:00"
    // var happyHoursSpan = $("<span>");
    // happyHoursSpan.attr("id", "happyHours"); // not sure we need to do a span if we just add the hours in this part

    //  add value to happy hours. then to card content
    happyHoursDiv.append("Happy Hours: ");
    happyHoursDiv.append(restHappyHours);
    cardContent.append(happyHoursDiv);

    // add card content to restaurant card
    card.append(cardContent);

    // add restaurant card to page
    addRestCard(card);

}

function addRestCard(restCard) {
    cardCount++;
    // new row
    if ((cardCount % 3) === 1) {
        rowCount++;
        currRow = $("<div>");
        currRow.addClass("columns");
        var rowClass = "rowNum" + rowCount;
        currRow.addClass(rowClass);
        $(".results").append(currRow);

    }

    var newCard = $("<div>");
    newCard.addClass("column is-one-third");
    newCard.append(restCard);
    currRow.append(newCard);

}

makeRestaurantCard();
