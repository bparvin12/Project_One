// main div card that everything goes into
var card = $("<div>");
card.addClass("card");

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
happyHoursSpan.addId("happyHours");

happyHoursDiv.append(happyHoursSpan);
cardContent.append(happyHoursDiv);

card.append(cardContent);

$(".results").append(card)
//everything above this appends result card to html 









