firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in, so show the loggedin-div
		document.getElementById("login-div").style.display = "none";
		document.getElementById("loggedin-div").style.display = "block";
		
		// Get user auth and DB data
		var user = firebase.auth().currentUser;

		var name = user.displayName;
		var email = user.email;
		var photoURL= user.photoURL;
		var emailVerified = user.emailVerified;
		var uid = user.uid;

		// Welcome message
		if (name != null) {
			document.getElementById("user-welcome").innerHTML = "Bienvenido/a " + name;
		} else {
			document.getElementById("user-welcome").innerHTML = "Bienvenido/a " + email;
		}
		
		// Imprimir datos de perfil (Auth)
		if (user.photoURL != null){
			document.getElementById("profile-image").innerHTML = "<img src=\"" + photoURL + "\">";
		} else {
			// In case there was an image before and the user has 
			// removed it. It must go away.
			document.getElementById("profile-image").innerHTML = null;
		}
		document.getElementById("name-input").value = name;
		document.getElementById("email-data").innerHTML = email;
		document.getElementById("photourl-input").value = user.photoURL;

		// Imprimir datos de DB
		/*
		//Realtime
		firebase.database().ref('users/' + user.uid + '/bio').on('value',function(snapshot){
			document.getElementById("bio-input").value = snapshot.val();
		});
		*/
		firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot){
			// If the user exists at the DB... 
			// (otherwise wait the register function to create it. It must be first
			// authenticated)
			if(snapshot.val() != null){
				if (snapshot.val().username != undefined){
					document.getElementById("username-input").value = snapshot.val().username;
				}

				if (snapshot.val().surname != undefined){
					document.getElementById("surname-input").value = snapshot.val().surname;
				}

				if (snapshot.val().bio != undefined){
					document.getElementById("bio-input").value = snapshot.val().bio;
				}

				if (snapshot.val().freetext != undefined){
					document.getElementById("freetext-input").value = snapshot.val().freetext;
				}
				
				if (user.emailVerified == false){
					document.getElementById("verify-email").innerHTML = '<button onclick="verifyEmail()">Verificar email</button>';
				}
				// TODO: MAKE THIS SHORT AND ELEGANT
			};
		});

	} else {
		// No user is signed in.
		document.getElementById("login-div").style.display = "block";
		document.getElementById("loggedin-div").style.display = "none";
	}
});


function login(){
	var email = document.getElementById("email-input-login").value;
	var pwd = document.getElementById("pwd-input-login").value;

	firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;

		alert("Error: " + errorMessage);
	});
}
function register(){

	var email = document.getElementById("email-input-login").value;
	var pwd = document.getElementById("pwd-input-login").value;

	firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		
		alert("Error: " + errorMessage);
	});
	// Just after registry, the onAuthStateChanged function will try to show data that 
	// still doesn't exist in the DB, and will show an error. Wait 100ms to have a 
	// registered user, and then update the data to the DB.
	setTimeout(update, 5000);
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
// function twitter_login(){
// 	var provider = new firebase.auth.TwitterAuthProvider();

// 	firebase.auth().signInWithPopup(provider).then(function(result) {
// 		// This gives you a Google Access Token. You can use it to access the Google API.
// 		var token = result.credential.accessToken;
// 		// The signed-in user info.
// 		var user = result.user;
// 		// ...
// 	}).catch(function(error) {
// 		// Handle Errors here.
// 		var errorCode = error.code;
// 		var errorMessage = error.message;
// 		// The email of the user's account used.
// 		var email = error.email;
// 		// The firebase.auth.AuthCredential type that was used.
// 		var credential = error.credential;
// 		// ...
// 		alert(error);
// 	});
// }
function passwordForgotten(){
	var email = document.getElementById('email-input-login').value;
	var auth = firebase.auth();

	auth.sendPasswordResetEmail(email).then(function() {
		alert("Email sent");
	}).catch(function(error) {
		alert(error);
	});
}
function resetPassword(){
	var email = firebase.auth().currentUser.email;
	var auth = firebase.auth();

	auth.sendPasswordResetEmail(email).then(function() {
		alert("Email sent");
	}).catch(function(error) {
		alert(error);
	});
}
function verifyEmail(){
	firebase.auth().currentUser.sendEmailVerification().then(function(){
		alert("Email sent");
	}).catch(function(error){
		alert(error);
	})
}

function deleteAccount() {
	var user = firebase.auth().currentUser;

	user.delete().then(function() {
		// User deleted.
	}).catch(function(error) {
		// An error happened.
		alert(error);
	});
}


function update(){
	// console.log('updating data...');
	var user = firebase.auth().currentUser;
	
	// Update auth data (name and photoURL)
	user.updateProfile({
		displayName: document.getElementById("name-input").value,
		photoURL: document.getElementById("photourl-input").value
	}).then(function() {
		// Update successful.
		// alert("Update successful");
	}).catch(function(error) {
		// An error happened.
		// alert(error);
	});

	// Profile data to DB
	firebase.database().ref('users/' + user.uid).set({
		email: user.email,
		username: document.getElementById("username-input").value,
		name: user.displayName,
		surname: document.getElementById("surname-input").value,
		photo_url: user.photoURL,
		emailVerified: user.emailVerified, // Not secure
		bio: document.getElementById("bio-input").value,
		freetext: document.getElementById("freetext-input").value
	});
}