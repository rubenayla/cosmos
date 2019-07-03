(function(){
	// Initialize Firebase
	const firebaseConfig = {
		apiKey: "AIzaSyBCJRWfOUYPxd1367IUla1JH5BiIEleUe8",
		authDomain: "cosmos-urjc.firebaseapp.com",
		databaseURL: "https://cosmos-urjc.firebaseio.com",
		projectId: "cosmos-urjc",
		storageBucket: "cosmos-urjc.appspot.com",
		messagingSenderId: "454555846199",
		appId: "1:454555846199:web:e5f7e0e14450b7b5"
	};
	firebase.initializeApp(firebaseConfig);

	// Get elements
	const preObject = document.getElementById('object');

	// Create references
	const dbRefObject = firebase.database().ref().child('object');

	// Sync object changes
	dbRefObject.on('value', snap => {
		preObject.innerText = JSON.stringify(snap.val(),null,3);
	});
}());