// close signInModal when manually closed or information submitted.
$(".closeSignInModal").click(function () {
    // if sign in fails, clear form so user can retry
    $("#signInModal").toggleClass("is-active");
});

$(document).on("click", "#submitSearch", function () {
    startSearch();
})

$(document).on("click", "#clearSearch", clearSearchForm);

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

    // maybe use google to make sure that this location exists before sending to yelp?
        // if it doesn't exist, we could write a little error message above a cleared 

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