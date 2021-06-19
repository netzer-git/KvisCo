 'use strict';
 var auth = firebase.auth();

// Signs-in Friendly Chat.
// on activation, creates pop-up window with google authentication.
// check authStateObserver function to see what happens after signing in
function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

// Signs-out of Friendly Chat.
// on activation - sign out automatically.
// check authStateObserver function to see what happens after signing out
function signOut() {
  // Sign out of Firebase.
  auth.signOut();
}

// Initiate firebase auth.
// connects the auth onAuthStateChanged with our state change function - authStateObserver
function initFirebaseAuth() {
  // Listen to auth state changes.
  auth.onAuthStateChanged(authStateObserver);
}

// Returns the signed-in user's ID token.
function getUserToken() {
  return isUserSignedIn() ? auth.currentUser.uid : null;
}

// Returns true if a user is signed-in. self explanatory I hope.
function isUserSignedIn() {
  return !!auth.currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) { // User is signed-in
    console.log("in " + getUserToken());

    myOnlyOneElement.innerHTML = "Out";

  } else { // User is signed out!
    console.log("out " + getUserToken());
  }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

var myOnlyOneElement = document.getElementById('only-one');
 
// Checks that Firebase has been imported.
checkSetup();

// initialize Firebase
initFirebaseAuth();

firebase.performance();
 