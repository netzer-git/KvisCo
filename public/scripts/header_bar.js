async function become_a_washer() {
    if (!isUserSignedIn()) {
        await signIn();
    }
    // else {
    window.location.href = "../html/washer-profile.html"
    // }
}

async function become_a_user() {
    if (!isUserSignedIn()) {
        signIn();
    }
    else {
        window.location.href = "../html/user_profile_final.html"
    }
}