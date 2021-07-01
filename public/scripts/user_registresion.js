
/*
All variables for user to register, start empty and filled in the form with the other functions in this page
*/
var user_location_str;
var user_cover_photo = "";
var user_phone_number;
var user_description;
var is_user_profile_loaded = false;


/**
 * save the location of the new user in user_location_str
 */
function save_location() {
    var city = document.getElementById("city").value;
    var street = document.getElementById("street").value;
    var number = document.getElementById("number").value;
    user_location_str = street + " " + number + ", " + city;
}

/**
 * save the phone number of the new user in user_phone_number
 */
function save_phone_number() {
    user_phone_number = document.getElementById("phone").value;
}

/**
 * save the description of the new user in user_description
 */
function save_description() {
    user_description = document.getElementById("user_description").value;


}

/**
 * save the profile photo of the new user in user_cover_photo and display inicator of photo uploaded in html
 */
function save_photo(event) {
    if (event != null) {
        user_cover_photo = event.target.files[0];
        is_user_profile_loaded = true
        document.getElementById("indicator4").style.display = "block";
        // document.getElementById("checkmark").innerHTML = "<i class='bi bi-check'></i>";
    }
}


/**
 * main function of user_registresion - check that all fields are set, create new user in firebase and put it ID in "current_user_id" storage
 * @returns move to user_profile_final.html
 */
async function create_user() {
    url = await saveImageToUser(user_cover_photo);
    if (url == null || user_location_str == null || user_phone_number == null || user_description == null) {
        alert("PLEASE FILL ALL FIELDS");
        return;
    }
    new_user = {
        name: getUserDisplayName(),
        location_str: user_location_str,
        imageUrl: url,
        phone: user_phone_number,
        description: user_description
    }
    await createNewUser(new_user);
    var userID = getUserToken();
    sessionStorage.setItem("current_user_id", userID);
    window.location.href = "../../html/user_flow/user_profile_final.html";
}

