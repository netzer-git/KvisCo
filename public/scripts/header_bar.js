$(".checkbox-dropdown").click(function () {
    $(this).toggleClass("is-active");
});

$(".checkbox-dropdown ul").click(function(e) {
    e.stopPropagation();
});



function log_in_or_out() {
    if(!isUserSignedIn()) {
        signIn();
        document.getElementById("log_in_out_msg").innerHTML = "Log Out";
    }
    else {
        var sPath = window.location.pathname;
        var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        if(sPage != "../../html/welcome.html")  {
            window.location.href = "../../html/welcome.html"
        }
        signOut();
        document.getElementById("log_in_out_msg").innerHTML = "Log In";
    }
}

document.getElementById("log_in_out_msg").addEventListener("load", display_log_in_or_out);


function display_log_in_or_out() {
    if(!isUserSignedIn()) {
        document.getElementById("log_in_out_msg").innerHTML = "Log In";
    }
    else {
        document.getElementById("log_in_out_msg").innerHTML = "Log Out";
    }
}


async function become_a_washer() {
    if (!isUserSignedIn()) {
        await signIn();
        return;
    }
    var washerID = getUserToken();
    if (!await promiseUserLoaderById(washerID)) {
        window.location.href = "../../html/washer_flow/washer_registration.html";
        return;
    }
    sessionStorage.setItem("signed_in_washer", washerID)
    window.location.href = "../../html/washer_flow/washer_profile.html"
}

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