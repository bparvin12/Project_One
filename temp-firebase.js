// add 2 collections to firebase (users and restaurants)

// edit lines 323-329


  
  var database = firebase.database();
  

    event.preventDefault();
  
    // Grabs user input
    var userName = $("#usernameInput").val().trim();
    var userPassword = $("#passwordInput").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newUser = {
      Name: userName,
      Password: userPassword,
      likedRestaurants: {}
    };
  
    // Uploads employee data to the database
    database.ref("Users/").push(newUser);
  
    // Logs everything to console
    console.log(newUser.Name);
    console.log(newUser.Password);

    // snapshopt
    database.ref().on("value", function(snapshot) {
        // get key of 
        currUserKey = snapshot.key;
    });

  });


  

  var uLiked = firebase.database().ref("Users/likedRestaurants");

  playersRef.set ({
     John: {
        number: 1,
        age: 30
     },
      
     Amanda: {
        number: 2,
        age: 20
     }
  });