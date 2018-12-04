//need a function to call upon ajax. 
function startSearch () {
    var apiKey = "NHvlP42MwvOCRjHVyCPDGRj0TQ-GnJlBYnZ63U-iJd85a90cehQ9rCSoGhmSRe8bx_Nr1PXb_j2AqafFnSOM2vSg_pUGsjQ0faLnr7GOs_lXWN0stah7PrFdYroFXHYx"
    var city = $("#citySearch").val();
    var state = $("#stateSearch").val();
    var zip = $("#zipSearch").val();

    var queryURL = "https://api.yelp.com/v3/businesses/search?term=by-chloe&location=boston";

    $.ajax({
        url: queryURL,
        method: 'GET',       
    }).then(function(response) {
        console.log(response);
    })

    
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
img.attr("src", "https://bulma.io/images/placeholders/1280x960.png");
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
$(document).on("click", ".submit", startSearch());
//this invokes the activateRestaurantInfo function on click of a restaurant card
$(document).on("click", ".restaurant-card", activateRestauarantInfo());
//this closes selected restaurant modal
$(documnet).on("click", "#closeSelResModal", function(){
   $("#selResModal").toggleClass("is-active");
});





