

var user_name = "BAR";
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


async function create_user() {
    if (user_name == null || user_location_str == null || user_phone_number == null || user_description == null) {
        alert("PLEASE FILL ALL FIELDS");
        return;
    }
    new_user = {
        name: user_name,
        location_str: user_location_str,
        cover_photo: user_cover_photo,
        phone_number: user_phone_number,
        description: user_description
    }
    console.log(new_user);
    // createNewUser(new_user);
    // window.location.href = "../html/user_profile_final.html";
}


