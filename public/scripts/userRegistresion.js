

var user_location_str;
var user_cover_photo = "";
var user_phone_number;
var user_description;

function save_location() {
    var city = document.getElementById("city").value;
    var street = document.getElementById("street").value;
    var number = document.getElementById("number").value;
    user_location_str = street + " " + number + ", " + city;
}

function save_phone_number() {
    user_phone_number = document.getElementById("phone").value;
}

function save_description() {
    user_description = document.getElementById("user_description").value;
}


function save_photo(event) {
    if (event != null) {
        user_cover_photo = event.target.files[0];
        // document.getElementById("checkmark").innerHTML = "<i class='bi bi-check'></i>";
    }
}


async function create_user() {
    url = await saveImageToUser(user_cover_photo);
    if (user_location_str == null || user_phone_number == null || user_description == null) {
        alert("PLEASE FILL ALL FIELDS");
        return;
    }
    new_user = {
        name: getUserDisplayName(),
        location_str: user_location_str,
        cover_photo: url,
        phone: user_phone_number,
        description: user_description
    }
    console.log(new_user);
    createNewUser(new_user);
    window.location.href = "../html/washer-profile.html";
}


function display_user_name() {
    document.getElementById("user_name").innerHTML = getUserDisplayName();
}


