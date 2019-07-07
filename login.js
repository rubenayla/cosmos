firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.
		document.getElementById("login-div").style.display = "none";
		document.getElementById("loggedin-div").style.display = "block";

		// Get user data to show
		var user = firebase.auth().currentUser;
		if (user != null){
			var email = user.email;
			document.getElementById("user-welcome").innerHTML = "Welcome " + email;

		}
	} else {
		// No user is signed in.
		document.getElementById("login-div").style.display = "block";
		document.getElementById("loggedin-div").style.display = "none";
	}
});

function login(){

	var email = document.getElementById("email-input").value;
	var pwd = document.getElementById("pwd-input").value;

	firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;

		alert("Error: " + errorMessage);
	});

}

function register(){

	var email = document.getElementById("email-input").value;
	var pwd = document.getElementById("pwd-input").value;

	firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		
		alert("Error: " + errorMessage);
	});
}

function logout(){
	firebase.auth().signOut();
}

function google_login(){
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		alert(error);
	});
}

function twitter_login(){
	var provider = new firebase.auth.TwitterAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		alert(error);
	});
}

function forgotten(){

	var email = document.getElementById("email-input").value;
	var auth = firebase.auth();

	auth.sendPasswordResetEmail(email).then(function() {
		alert("Email sent");
	}).catch(function(error) {
		alert(error);
	});
}