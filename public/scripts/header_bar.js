$(".checkbox-dropdown").click(function () {
    $(this).toggleClass("is-active");
});

$(".checkbox-dropdown ul").click(function(e) {
    e.stopPropagation();
});



async function become_a_washer() {
    if (!isUserSignedIn()) {
        await signIn();
        return;
    }
    sessionStorage.setItem("washer_that_register", getUserToken())
    window.location.href = "../html/washer_flow/washer_profile.html"
}

async function become_a_user() {
    if (!isUserSignedIn()) {
        signIn();
    }
    else {
        let userID = await getUserToken();
        const user_doc = await promiseUserLoaderById(userID); //get the washer from the firebase
        if (!user_doc) {
            window.location.href = "../html/user_flow/user_registration.html";
            return;
        }
        window.location.href = "../html/user_flow/user_profile_final.html"
    }
}