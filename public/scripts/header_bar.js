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
        let userID = await getUserToken();
        const user_doc = await promiseUserLoaderById(userID); //get the washer from the firebase
        if (!user_doc) {
            window.location.href = "../html/user_registration.html";
            return;
        }
        window.location.href = "../html/user_profile_final.html"
    }
}