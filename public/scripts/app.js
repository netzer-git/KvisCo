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

// returns the user displayName by google account
function getUserDisplayName() {
  return auth.currentUser.displayName;
}

function getUserFirstName() {
  return getUserDisplayName().split(' ')[0];
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
async function authStateObserver(user) {
  if (user) { // User is signed-in
    console.log("in " + getUserToken());
    // user_doc = await promiseUserLoaderByCurrentUserID();
    // document.getElementById("log_in_indicator").innerHTML = user_doc.data().name;
    document.getElementById("log_in_indicator").innerHTML = 'Hi, ' + getUserFirstName();
    document.getElementById("log_in_indicator").hidden = false;
    document.getElementById("log_in_out_msg").innerHTML = "Log Out";
    // specific page Ids
    document.getElementById("welcome_orders_block").hidden = false;
    await load_quick_welcome_page()
  } else { // User is signed out!
    console.log("out " + getUserToken());
    document.getElementById("log_in_indicator").hidden = true;
    document.getElementById("log_in_indicator").innerHTML = "Anonymous";
    document.getElementById("log_in_out_msg").innerHTML = "Log In";
    sessionStorage.setItem("connected_userID", null);
    // specific page Ids
    document.getElementById("welcome_orders_block").hidden = true;
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
 
// Checks that Firebase has been imported.
checkSetup();

// initialize Firebase
initFirebaseAuth();

firebase.performance();
 