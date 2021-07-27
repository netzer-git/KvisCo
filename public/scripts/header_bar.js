/**
 * checks if the user is signed in - either signIn or signOut
 */
function log_in_or_out() {
    if (!isUserSignedIn()) {
        signIn();
    } else {
        var sPath = window.location.pathname;
        var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        if (sPage != "../../html/welcome.html") {
            window.location.href = "../../html/welcome.html"
        }
        signOut();
    }
}

/**
 * checks if the user has washer profile - either signIn, create washer profile or go to washer profile
 */
async function become_a_washer() {
    if (!isUserSignedIn()) {
        signIn();
        return;
    }
    var washerID = getUserToken();
    washer_doc = await promiseWasherLoaderById(washerID);
    if (washer_doc == null) {
        window.location.href = "../../html/washer_flow/washer_registration.html";
        return;
    }
    sessionStorage.setItem("signed_in_washer", washerID)
    window.location.href = "../../html/washer_flow/washer_profile.html"
}

/**
 * checks if the user has user profile - either signIn, create user profile or go to user profile
 */
async function become_a_user() {
    if (!isUserSignedIn()) {
        signIn();
        return;
    }
    var userID = getUserToken();
    if (!await promiseUserLoaderById(userID)) {
        window.location.href = "../../html/user_flow/user_registration.html";
        return;
    }
    sessionStorage.setItem("current_user_id", userID);
    window.location.href = "../../html/user_flow/user_profile_final.html"

}