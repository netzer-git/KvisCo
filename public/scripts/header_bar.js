async function become_a_washer() {
    if (!isUserSignedIn()) {
        signIn();
    }
    else {
        window.location.href = "../html/washer-profile.html"
    }
}