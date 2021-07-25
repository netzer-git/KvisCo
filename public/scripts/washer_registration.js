var washer_machine_pic;
var washer_laundry_pic;
var washer_profile_pic;
var washer_location_str;
var washer_machine_type;
var washer_description;
var washer_commitment;
var washer_properties;
var washer_phone_number;
var washer_capacity;
var washer_year_purchased;
var is_profile_loaded = false;
var is_land_loaded = false;
var is_mach_loaded = false;


function save_location() {
    var city = document.getElementById("city").value;
    var street = document.getElementById("street").value;
    var number = document.getElementById("number").value;
    washer_location_str = street + " " + number + ", " + city;
}

function save_phone_number() {
    washer_phone_number = document.getElementById("phone").value;
}

function save_commit() {
    washer_commitment = document.getElementById("commit").value;
    console.log("new commit ", document.getElementById("commit").value);
}

function save_laundry_details() {
    washer_machine_type = document.getElementById("mudule").value;
    washer_capacity = document.getElementById("capacity").value;
    washer_year_purchased = document.getElementById("purchasing_year").value;
}

function save_description() {
    washer_description = document.getElementById("washer_description").value;
}

function save_profile_pic(event) {
    if (event != null) {
        washer_profile_pic = event.target.files[0];
        document.getElementById("indicator1").style.display = "block";
        document.getElementById("indicator1").hidden = false;
    }
}

function save_laundry_pic(event) {
    if (event != null) {
        washer_laundry_pic = event.target.files[0];
        document.getElementById("indicator2").style.display = "block";
    }
}

function save_machine_pic(event) {
    if (event != null) {
        washer_machine_pic = event.target.files[0];
        document.getElementById("indicator3").style.display = "block";
    }
}

function save_special_service(choice) {
    washer_properties = choice.value;
}


async function create_washer() {
    if (washer_commitment == null) {
        washer_commitment = document.getElementById("commit").value;
    }
    try {
        profile_pic_url_details = await saveImageToWasher(washer_profile_pic);
    } catch {
        profile_pic_url_details = [null, null]
    }
    if (profile_pic_url_details == null || washer_location_str == null || washer_phone_number == null || washer_description == null ||
        washer_properties == null || washer_capacity == null || washer_machine_type == null || washer_year_purchased == null) {
        alert("Please Fill All The Fields");
        return;
    }
    try {
        first_pic_details = await saveImageToWasher(washer_laundry_pic)
    } catch {
        first_pic_details = [null, null]
    }
    try {
        second_pic_details = await saveImageToWasher(washer_machine_pic)
    } catch {
        second_pic_details = [null, null]
    }
    pics_urls = [first_pic_details[0], second_pic_details[0]];
    image_path = [profile_pic_url_details[1], first_pic_details[1], second_pic_details[1]]
    new_washer = {
        name: getUserDisplayName(),
        imageUrl: profile_pic_url_details[0],
        imagePath: image_path,
        pics: pics_urls,
        location_str: washer_location_str,
        model_name: washer_machine_type,
        description: washer_description,
        commitment: Number(washer_commitment),
        properties: washer_properties,
        phone: washer_phone_number,
        capacity: washer_capacity,
        year_purchased: washer_year_purchased,
    }
    await createNewWasher(new_washer);
    var washerID = getUserToken();
    sessionStorage.setItem("signed_in_washer", washerID);
    window.location.href = "../../html/washer_flow/washer_profile.html";
}


function display_washer_name() {
    document.getElementById("washer_name").innerHTML = getUserDisplayName();
}