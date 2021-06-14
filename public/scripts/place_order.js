washer1 = {
    name: "Amitay Rachman", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
    profile_pic: "../images/amitay_pic.jpg", pics: ["../images/miele.png", "../Profile.png"],
    location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155, 35.215351837826255],
    num_of_reviews: "12", machine_year: "2012",
    model_name: "bosch", capacity: "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!",
    commit: "48 hours", working_hours: { Sunday: [11, 16], Monday: [09, 18], Tuesday: [10, 18], Wednesday: [9, 18], Thursday: [10, 20], Friday: [09, 20], Saturday: [10, 18] },
    clients_who_review: ['client3', 'client5'], properties: { white: true, door_2_door: true, ironing: true, access: true }
};


order123 = {
    orderID: "order123",
    washer: washer1,
    user: user7,
    dueTO: "18/04",
    Price: "30",
    status: "in_process",
    rating_on_washer: 0,
    review_on_washer: "",
    rating_on_user: 0,
    review_on_user: "",
    laundry_pics: []
}

const DEAFULT_PRICE = 30;
const DOOR2DOOR_PRICE = 20;
const IRONING_PRICE = 25;
const DRYER_PRICE = 12;

var due_to_date = "18/06";
var due_to_hour ="12:00";
var loads = 1;
var property = "deafult";
var wash_settings = "deafult";
var price = DEAFULT_PRICE;

async function load_place_order_page(washerID) {
    const washer_doc = await promiseWasherLoaderById(washerID);
    show_profile_header("profile_header",washer_doc);
}

function compute_price(loads, property) {
    var pricing = loads*DEAFULT_PRICE;
    if (property == "door2door") {
        pricing += DOOR2DOOR_PRICE;
    }
    if (property == "ironing") {
        pricing += IRONING_PRICE;
    }
    if (property == "dryer") {
        pricing += DRYER_PRICE;
    }
    return pricing;
}

// on change()
function update_properties_and_price() {
    due_to_date = document.getElementById("due_to_date").value;
    due_to_hour = document.getElementById("due_to_hour").value;
    loads = document.getElementById("loads").value;
    property = document.getElementById("property").value;
    wash_setting = document.getElementById("wash_settings").value;
    price = compute_price(loads,property);
    // Do whatever you want with the value here.
    setting_array = [due_to_date, due_to_hour, loads, property, wash_settings, price];
    sessionStorage.setItem("washing_order", JSON.stringify(setting_array));
    // JSON.stringify(jsArray) converts the jsArray into a string which can be stored in sessionStorage
}




function create_order(washerID, userID) {
    var setting_array = JSON.parse(sessionStorage.getItem("washing_order"));
    cur_due_to_date = setting_array[0] ;
    cur_due_to_hour = setting_array[1] ;
    cur_loads = setting_array[2];
    cur_property = setting_array[3];
    cur_wash_setting = setting_array[4];
    cur_price = setting_array[5] ;

    order123 = {
        washer: washerID,
        user: userID,
        loads: cur_loads,
        wash_settings: wash_settings,
        due_to: 24,
        price: cur_price,
        status: "pending",
        rating_on_washer: 0,
        review_on_washer: "",
        rating_on_user: 0,
        review_on_user: "",
        laundry_pics: []
    }
    add_to_firebase_order_df(order123);
}

function accept_order(price) {
    order = {washer: washer1,
    user: user7,
    dueTO: ,
    Price: "30",
    status: "in_process",
    rating_on_washer: 0,
    review_on_washer: "",
    rating_on_user: 0,
    review_on_user: "",
    laundry_pics: []
    }
}