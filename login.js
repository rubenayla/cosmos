firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.
		document.getElementById("main-div").style.display = "none";
		document.getElementById("loggedin-div").style.display = "block";

		// Get user data to show
		var user = firebase.auth().currentUser;
		if (user != null){
			var email = user.email;
			document.getElementById("user-welcome").innerHTML = "Welcome " + email;

		}
	} else {
		// No user is signed in.
		document.getElementById("main-div").style.display = "block";
		document.getElementById("loggedin-div").style.display = "none";
	}
});

function login(){

	var email = document.getElementById("email-input").value;
	var pass = document.getElementById("pass-input").value;

	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  alert("Error: " + errorMessage);
	});

}

function logout(){
	firebase.auth().signOut();
}