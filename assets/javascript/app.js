//making a global variable to call upon address  
var yRestAddress;
var yRestNumber
var yImageLink;
var yRestName;
var yPrice;
var restId;

var city;
var state;
var zip;
var cuisine;

// ================ Initialize Firebase =========================
var config = {
    apiKey: "AIzaSyAOF_apbWhRflI5RekKNZkrosejZ8FEeWs",
    authDomain: "project-01-1543881106905.firebaseapp.com",
    databaseURL: "https://project-01-1543881106905.firebaseio.com",
    projectId: "project-01-1543881106905",
    storageBucket: "project-01-1543881106905.appspot.com",
    messagingSenderId: "307620256786"
};
firebase.initializeApp(config);



checkPersistantSignIn();

function checkPersistantSignIn(){
    var isEmail = localStorage.getItem("email"); 
    console.log(isEmail);
    if(!isEmail){
        $("#signInModal").addClass("is-active");
    }
}

//start search for restaurants 
function startSearch() {
    city = $("#citySearch").val().trim();
    city = city.trim().replace(/ /g, "+");
    state = $("#stateSearch").val().trim();
    zip = $("#zipSearch").val().trim();
    cuisine = $("#cuisineSearch").val();

    //========================================================================================
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&term=by-" + cuisine + "&location=" + city + "," + state + "," + zip;
    $.ajax({
        url: myurl,
        headers: {
            'Authorization': 'Bearer NHvlP42MwvOCRjHVyCPDGRj0TQ-GnJlBYnZ63U-iJd85a90cehQ9rCSoGhmSRe8bx_Nr1PXb_j2AqafFnSOM2vSg_pUGsjQ0faLnr7GOs_lXWN0stah7PrFdYroFXHYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // console.log(data)

            for (var i = 0; i < 9; i++) {
                //variable to minimize response2.results
                var result = data.businesses[i]
                //create all variables to obtain restaurant info

                //we may have to insert this from yelp because
                //google does not provide images of actual restaurant logo
                // console.log(result.image_url);
                yImageLink = result.image_url;
                // console.log(result.name);
                yRestName = result.name;
                // console.log(result.location.display_address[0]);
                yRestAddress = result.location.display_address[0] + ", " + result.location.display_address[1];
                // console.log(yRestAddress)
                yRestNumber = formatNumber(result.phone);
                // console.log(result.price);
                yPrice = result.price;
                restId = result.id
                //ATTENTION: we may have to insert happy hours from the api that reads pictures to text


                //display all variable in makeRestaurantCard function
                cardCount
                makeRestaurantCard(yImageLink, yRestName, yRestAddress, yPrice, yRestNumber); //add the yPrice
            }
            //========================================================================================
        }
    });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//ATTENTION: THIS IS ALL CALLS UPON GOOGLE PLACES/GOOGLE API
// //function that converts to long/lat and names it with variable "location"
// //which we can actually use geocoding API from google. 
// var queryURLGeocoding = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + state + "&key=" + apiKeyGoogle;
// var long;
// var lati;
// $.ajax({
//     url: queryURLGeocoding,
//     method: 'GET',
// }).then(function (response1) {
//     console.log(response1);
//     console.log(response1.results[0].geometry.location.lng);
//     console.log(response1.results[0].geometry.location.lat);

//     lati = response1.results[0].geometry.location.lat;
//     long = response1.results[0].geometry.location.lng;

//     var cuisine = $("#cuisineSearch").val();
//     var queryURLGoogleMaps = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lati + "," + long + "&radius=8000&type=restaurant&keyword=" + cuisine + "&key=" + apiKeyGoogle;

//     $.ajax({
//         url: queryURLGoogleMaps,
//         method: 'GET',
//     }).then(function (response2) {
//         console.log(response2);

//         for (var i = 0; i < 9; i++) {
//             //variable to minimize response2.results
//             var result = response2.results[i]
//             //create all variables to obtain restaurant info

//             //we may have to insert this from yelp because
//             //google does not provide images of actual restaurant logo
//             console.log(result.icon);
//             var gImageLink = result.icon;
//             console.log(result.name);
//             var gRestName = result.name;
//             console.log(result.vicinity);
//             var gRestAddress = result.vicinity;
//             //we may have to insert happy hours from yelp. 



//             //display all variable in makeRestaurantCard function
//             makeRestaurantCard(gImageLink, gRestName, gRestAddress)
//         }
//     });
// });
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//we need to make a separate ajax calling from yelp to get pcitures and happy hours 
//g stands for getting from google
//y stands for getting from yelp
function makeRestaurantCard(yImageLink, yRestName, yRestAddress, yPrice, yRestNumber) { // yImageLink, yRestName, yRestAddress, yPrice) { // parameters sent to set values
    // imageLink: link of restaurant image
    // restName: str name of restaurant 
    // restAddress: str address
    // happyHours: str happyHours
    // main div card that everything goes into
    $("#selectedRestaurant").text(yRestName);

    activateBasicsTab();

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
    img.attr("src", yImageLink); // img.attr("src", imageLink); 
    img.attr("alt", yRestName); //img.attr("alt", restName)

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

    // create line for restaurant address. add address
    var restAddress = $("<p>");
    restAddress.addClass("subtitle is-6 restAddress");
    restAddress.text(yRestAddress) // delete this when parameters filled in.

    // create line for restaurant Number  . add Number
    var restNumber = $("<p>");
    restNumber.addClass("subtitle is-6 restNumber");
    restNumber.text(yRestNumber) // delete this when parameters filled in.

    var restName = $("<p>");
    restName.addClass("subtitle is-4 restName");
    restName.text(yRestName) // delete this when parameters filled in

    // add value to restaurant basics. then to card content
    restaurantBasics.append(restName);
    restaurantBasics.append(restAddress);
    restaurantBasics.append(restNumber);
    cardContent.append(restaurantBasics);

    // create div for restaurant happy hours
    var priceDiv = $("<div>");
    // var restHappyHours = "08:00 - 09:00"
    var restPrice = $("<span>").text(yPrice);
    // happyHoursSpan.attr("id", "happyHours"); // not sure we need to do a span if we just add the hours in this part

    //  add value to happy hours. then to card content
    priceDiv.append("Price: ");
    priceDiv.append(restPrice);
    cardContent.append(priceDiv);

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


//====== Press ENTER key to submit ===========rom=====

var input = document.getElementById('passwordInput');
var input2 = document.getElementById('usernameInput');
var input3 = document.getElementById('citySearch');
var input4 = document.getElementById('startLocation');


input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('signInSubmit').click();
    }
});
input2.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('signInSubmit').click();
    }
});
input3.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('submitSearch').click();
    }
});
input4.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('directionSubmitButton').click();
    }
});
//=================================================


// global variables
var cardCount = 0;
var rowCount = 0;
var currRow;

// SIGN IN MODAL form validation
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// SIGN IN MODAL close & submit
$(".closeSignInModal").click(function () {
    var errorMessage = "";
    var fieldsMissing = "";


    if ($("#usernameInput").val() == "") {
        fieldsMissing += "<br>Email";
    };

    if ($("#passwordInput").val() == "") {
        fieldsMissing += "<br>Password";
    };

    if (fieldsMissing != "") {
        errorMessage += "<p>The following field(s) are missing: " + fieldsMissing;
    };

    if (isEmail($("#usernameInput").val()) == false) {
        errorMessage += "<p>Your email address is not valid</p>";
    };

    if (errorMessage != "") {
        $(".modal-card-title").html(errorMessage);
    };

    if (fieldsMissing != "") {
        errorMessage += "<p>The following field(s) are missing: " + fieldsMissing;
    }

    else {
        //if sign in fails, clear form so user can retry
        if (errorMessage == "" && fieldsMissing == "") {

            // ====================user login=====================================

                
                var email = $('#usernameInput').val();
                var password = $('#passwordInput').val();

                if (!email || !password) {
                    return console.log('email and password required');
                }
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('signIn error', error);
                    $('.modal-card-title').html("Login Error Please Try Again");
                    $('#submitTarget').append("<a href='#' id='newAccount'>New? Create Account</a>");
                    $("#signInModal").toggleClass("is-active");

                    // register();
                });                
            

            function register() {

                var email = $('#usernameInput').val();
                var password = $('#passwordInput').val();

                if (!email || !password) {
                    return console.log('email and password required');
                }
                    Event.observe( $('#newAccount'), 'click', function(event) {
                        firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
                            console.log('register error', error);
                            if (error.code === 'auth/email-already-in-use') {
                                var credential = firebase.auth.EmailAuthProvider.credential(email, password);
                            }
                        });
                
                        Event.stop(event);
                    });
                
            };

            // =========================================================
                        
            // Capture and send data to Firebase
            // var database = firebase.database();
            // database.ref().push({
            //     Name: $('#usernameInput').val(),
            //     Password: $('#passwordInput').val()
            // });

            $("#signInModal").toggleClass("is-active");
        }
    };
    
       //prevent page from refresing when form tries to submit itself 
    event.preventDefault();

    var email = $('#usernameInput').val().trim();

    //console log each of the user 
    console.log(email);
    $("welcome").text(email);

    //local storage clear
    localStorage.clear();

    //Store all content into localStorage 
    localStorage.setItem("email", email);

    $("#welcome").text(localStorage.getItem("email"));
});
$("#welcome").text(localStorage.getItem("email"));

// SEARCH FORM submit
$(document).on("click", "#submitSearch", function () {
    cardCount = 0;
    rowCount = 0;
    $(".results").empty();
    startSearch();
})

// SEARCH FORM clear
$(document).on("click", "#clearSearch", clearSearchForm);

// RESTAURANT CARD onclick
$(document).on("click", ".restaurant-card", function () {
    // activate selected Restaurant Modal
    $("#selResModal").toggleClass("is-active");
    activateBasicsTab();
    //adds image to main info modal 
    var mainResImage = $("<img>");
    mainResImage.attr("id", "mainResImage");
    mainResImage.attr("src", yImageLink);
    mainResImage.attr("alt", "Restaurant Image");
    $("#resImageHolder").html(mainResImage);
    //add address to main info modal 
    $("#rAddress").html(yRestAddress);
    //add phone number to main info modal
    $("#rNumber").html(yRestNumber)
    //add price to main info 
    $("#rPrice").html(yPrice);
    // console.log(yPrice);

    //add link to menu

    //add link to restaurant
    // $("rWebLink").attr("href", )
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + restId;
    $.ajax({
        url: myurl,
        headers: {
            'Authorization': 'Bearer NHvlP42MwvOCRjHVyCPDGRj0TQ-GnJlBYnZ63U-iJd85a90cehQ9rCSoGhmSRe8bx_Nr1PXb_j2AqafFnSOM2vSg_pUGsjQ0faLnr7GOs_lXWN0stah7PrFdYroFXHYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (response2) {
            // console.log(response2);
            //this diplays the hours in the main rest info modal 
            $("#rHours").html(response2.hours[0].open[0].start + "-" + response2.hours[0].open[0].end)
        }
    });

});

// RESTAURANT MODAL close
$(document).on("click", "#closeSelResModal", function () {
    $("#selResModal").toggleClass("is-active");
});



function clearSearchForm() {
    $("#citySearch").val("");
    $("#stateSearch").val("");
    $("#zipSearch").val("");
    $("#cuisineSearch").val("");
    $(".results").empty();
}



// makeRestaurantCard();


// MAIN MODAL basic
$(document).on("click", "#selResBasics", activateBasicsTab);

function activateBasicsTab(){
    // if ($("#selResPictures").hasClass("is-active")){
    //     $("#selResPictures").toggleClass("is-active");
    // }
    // else if ($("#selResMenu").hasClass("is-active")){
    //     $("#selResMenu").toggleClass("is-active");
    // }

    // deactivate other tab. hide other tab content
    if ($("#selResPictures").hasClass("is-active")) {
        $("#selResPictures").toggleClass("is-active");
        $("#picturesTabContent").attr("style", "display:none")
    }
    else if ($("#selResMenu").hasClass("is-active")) {
        $("#selResMenu").toggleClass("is-active");
        $("#menuTabContent").attr("style", "display:none")
    }
    else if ($("#selResDirections").hasClass("is-active")) {
        $("#selResDirections").toggleClass("is-active");
        $("#directionsTabContent").attr("style", "display:none")
    }
    // if this tab is active, just return
    else if ($("#selResBasic").hasClass("is-active")) {
        return;
    }

    // activate this tab.
    $("#selResBasic").toggleClass("is-active");

    // show tab content
    $("#basicTabContent").removeAttr("style");

};


// MAIN MODAL pictures
$(document).on("click", "#selResPictures", activatePicturesTab);

function activatePicturesTab(){
    // deactivate other tab. hide other tab content
    if ($("#selResBasic").hasClass("is-active")) {
        $("#selResBasic").toggleClass("is-active");
        $("#basicTabContent").attr("style", "display:none")
    }
    else if ($("#selResMenu").hasClass("is-active")) {
        $("#selResMenu").toggleClass("is-active");
        $("#menuTabContent").attr("style", "display:none")
    }
    else if ($("#selResDirections").hasClass("is-active")) {
        $("#selResDirections").toggleClass("is-active");
        $("#directionsTabContent").attr("style", "display:none")
    }
    // if this tab is active, just return
    else if ($("#selResPictures").hasClass("is-active")) {
        return;
    }


    fillPicturesContent(); // get the pictures links of food pictures


    // activate this tab.
    $("#selResPictures").toggleClass("is-active");

    // show tab content
    $("#picturesTabContent").removeAttr("style");

}

// MAIN MODAL menu
$(document).on("click", "#selResMenu", activateMenuTab);

function activateMenuTab(){
    // deactivate other tab. hide other tab content
    if ($("#selResBasic").hasClass("is-active")) {
        $("#selResBasic").toggleClass("is-active");
        $("#basicTabContent").attr("style", "display:none")
    }
    else if ($("#selResPictures").hasClass("is-active")) {
        $("#selResPictures").toggleClass("is-active");
        $("#picturesTabContent").attr("style", "display:none")
    }
    else if ($("#selResDirections").hasClass("is-active")) {
        $("#selResDirections").toggleClass("is-active");
        $("#directionsTabContent").attr("style", "display:none")
    }
    // if this tab is active, just return
    else if ($("#selResMenu").hasClass("is-active")) {
        return;
    }

    // activate this tab.
    $("#selResMenu").toggleClass("is-active");

    // show tab content
    $("#menuTabContent").removeAttr("style");
}


$(document).on("click", "#selResDirections", activateDirectionsTab);

function activateDirectionsTab(){
    // deactivate other tab. hide other tab content
    if ($("#selResBasic").hasClass("is-active")) {
        $("#selResBasic").toggleClass("is-active");
        $("#basicTabContent").attr("style", "display:none")
    }
    else if ($("#selResPictures").hasClass("is-active")) {
        $("#selResPictures").toggleClass("is-active");
        $("#picturesTabContent").attr("style", "display:none")
    }
    else if ($("#selResMenu").hasClass("is-active")) {
        $("#selResMenu").toggleClass("is-active");
        $("#menuTabContent").attr("style", "display:none")
    }
    // if this tab is active, just return
    else if ($("#selResDirections").hasClass("is-active")) {
        return;
    }

    // activate this tab.
    $("#selResDirections").toggleClass("is-active");

    // show tab content
    $("#directionsTabContent").removeAttr("style");

}



$(document).on("click", "#directionsSubmitButton", function () {
});



function fillPicturesContent() {
    $(".displayPictures").empty();
    cardCount = 0;
    rowCount = 0;
    // temporary values assigned to stuff for now only temporarily
    var foodImageLinkArg = "https://bulma.io/images/placeholders/640x480.png";
    var foodImageAltArg = "alt alt alt";

    makeFoodImageCard(foodImageLinkArg, foodImageAltArg);
    makeFoodImageCard("http://www.studyabroadcorner.com/wp-content/uploads/2015/06/Fast-food.jpg", "a");

    makeFoodImageCard("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Eggs-as-food.jpg/1200px-Eggs-as-food.jpg", "b");

    makeFoodImageCard("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Momo_nepal.jpg/1200px-Momo_nepal.jpg", "c");

    makeFoodImageCard("http://thenextweb.com/wp-content/blogs.dir/1/files/2012/10/Food.jpg", "d");
    makeFoodImageCard(foodImageLinkArg, "e");
    makeFoodImageCard(foodImageLinkArg, "f");
    makeFoodImageCard(foodImageLinkArg, "g");
    makeFoodImageCard(foodImageLinkArg, "h");
    makeFoodImageCard(foodImageLinkArg, "i");
    makeFoodImageCard(foodImageLinkArg, "j");
    makeFoodImageCard(foodImageLinkArg, "k");
    makeFoodImageCard(foodImageLinkArg, "l");

}

function makeFoodImageCard(foodImageLink, foodImageAlt) {
    var card = $("<div>");
    card.addClass("card foodImage");

    // creates portion of restaurant card with the image.
    var cardImage = $("<div>");
    cardImage.addClass("card-image");

    var figure = $("<figure>");
    figure.addClass("image");

    // add image link
    var img = $("<img>");
    img.addClass("foodImage");
    img.attr("src", foodImageLink);
    // if alt was sent with image, assign
    if (foodImageAlt) {
        img.attr("alt", foodImageAlt);
    }

    // add picture to image portion.
    figure.append(img);
    cardImage.append(figure);

    // add image portion to card
    card.append(cardImage)

    // add restaurant card to page
    addFoodImageCard(card, foodImageLink);


}

function addFoodImageCard(foodPicture, fILink) {
    cardCount++;
    var colNumber = cardCount % 4;
    // new row
    if (colNumber === 1) {
        rowCount++;
        currRow = $("<div>");
        currRow.addClass("columns");
        var rowClass = "rowNum" + rowCount;
        currRow.addClass(rowClass);
        $(".displayPictures").append(currRow);

    }

    var newCard = $("<div>");
    newCard.addClass("column is-one-quarter foodImageCard");
    newCard.addClass(cardCount);
    newCard.attr("foodPictureLink", fILink);
    newCard.append(foodPicture);
    currRow.append(newCard);

}


$(document).on("click", ".foodImageCard", function () {
    $("#largeFoodImage").toggleClass("is-active")
    var fPLink = $(this).attr("foodPictureLink");
    // console.log(fPLink);
    $("#displayLargeFood").attr("src", fPLink);
});

$(document).on("click", "#closeLargeFoodModal", function () {
    $("#largeFoodImage").toggleClass("is-active")
});

//this runs the function to get directions
$(document).on("click", "#directionsSubmitButton", function () {
    //api key for google
    var apiKeyGoogle = "AIzaSyDlIhSIHh3DOCgKFekiOXVtnGCzdkGdxlE"
    //destination equal to 
    var destination = yRestAddress
    // console.log(yRestAddress)
    //origin equal to
    var origin = $("#startLocation").val().trim();
    //ajax request for directions
    var googleDirectionsUrl = "https://www.google.com/maps/embed/v1/directions?key=" + apiKeyGoogle + "&origin=" + origin + "&destination=" + destination;

    var imageDiv = $("<div>");
    imageDiv.html("<iframe width='450' height='250' frameborder='0' style='border:0' src='" + googleDirectionsUrl + "' allowfullscreen></iframe>");

    $("#directionsTabContent").append(imageDiv);
})

$(document).ready(function () {
    var carousels = bulmaCarousel.attach(); // carousels now contains an array of all Carousel instances
});

function formatNumber(yelpNum) { // +15622360141 562.236.0141
    var formatNum = [];
    var formatCounter = 0;

    for (i = 2; i < yelpNum.length; i++) {
        var tempNum = yelpNum[i];
        formatNum[formatCounter] = tempNum;
        formatCounter++
        if ((i === 4) || (i === 7)) {
            formatNum[formatCounter] = ".";
            formatCounter++;
        }
    }

    return formatNum.join("");
}

$(document).on("click", "#clearUser", function(){
    localStorage.clear();
    $("#welcome").text("");
    checkPersistantSignIn();
    location.reload();
});

//============================================================================
//create a function with firebase to list thumbs up and thumbs down
  // Initialize Firebase
  function thumbs() {
      var something = {
    apiKey: "AIzaSyAOF_apbWhRflI5RekKNZkrosejZ8FEeWs",
    authDomain: "project-01-1543881106905.firebaseapp.com",
    databaseURL: "https://project-01-1543881106905.firebaseio.com",
    projectId: "project-01-1543881106905",
    storageBucket: "project-01-1543881106905.appspot.com",
    messagingSenderId: "307620256786"
  };
  firebase.initializeApp(something);

  var database = firebase.database()

  var likeCount = 0;
  $("#worthCount").html(likeCount);

  var dislikeCount = 0;
  $("#notWorthCount").html(dislikeCount);

$(document).on('click', '#yesWorth', function() {
    likeCount++;
    $("#worthCount").html(likeCount);

    database.ref("name").set({
        Likes: likeCount
    });
});

$(document).on('click', '#notWorth', function() {
    dislikeCount++;
    $("#notWorthCount").html(dislikeCount);


    database.ref("name").set({
        Dislikes: dislikeCount
    });
});
};
//============================================================================
