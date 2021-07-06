/*
* Deafult properties prices 
*/
const DEAFULT_PRICE = 30;
const DOOR2DOOR_PRICE = 20;
const IRONING_PRICE = 25;
const DRYER_PRICE = 12;
const FAST_PTICE = 10;

var opening_times;
var msg;

var due_to_date;
var due_to_hour;
var full_date = new Date();
var loads = 1;
var property = "deafult";
var wash_settings = "deafult";
var price = DEAFULT_PRICE;
var comments = "";

// /**
//  * 
//  * @param {string} washerID still not usable
//  */
// async function load_place_order_page(washerID) {
//     const washer_doc = await promiseWasherLoaderById(washerID);
//     show_profile_header("profile_header",washer_doc);
// }


/**
 * 
 * @param {*} date date in format of "mm/dd"
 * @param {*} time time in format of "hh/mm"
 * @returns timstamp in a seconds format
 */
function toTimestamp(date,time){
    year = date.substring(0,4);
    month = date.substring(5,7);
    day = date.substring(8,10);
    hour = time.substring(0,2);
    minute = time.substring(3,5);
    second = "00";
    var datum = new Date(Date.UTC(year,month-1,day,hour-3,minute,second));
    return datum.getTime();
}

/**
 * function to conpute the price
 * @param {int} loads how many loads 0-inf
 * @param {string} property door2door,ironing,dryer
 * @param {string} wash_settings can be many options, only Fast Wash change price
 * @returns 
 */
function compute_price(loads, property, wash_settings) {
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
    if (wash_settings == "Fast Wash") {
        pricing += 10;
    }
    cur_price = " " + price + " &#8362 ";
    document.getElementById("price").innerHTML = cur_price;
    return pricing;
}


/**
 * this function called in every change and update the memory and price so we can use the properties  
 */
function update_properties_and_price() {
    due_to_date = document.getElementById("date").value;
    due_to_hour = document.getElementById("startTime").value;
    full_date = toTimestamp(due_to_date,due_to_hour);
    loads = document.getElementById("loads").value;
    property = document.getElementById("property").value;
    wash_settings = document.getElementById("wash_settings").value;
    var last_price = price;
    open_indicator(opening_times,full_date);
    price = compute_price(loads,property, wash_settings);
    if (last_price != price) {
        update_properties_and_price()
    }
    comments = document.getElementById('notes_for_laundry').value;
}

/**
 * this function called when "submit request" pressed 
 * check if terms accepted, create order object and open "thank you"
 * @param {string} washerID the id of the washer
 */
async function create_order() {
    var washerID = sessionStorage.getItem("pressed_washer"); // washer that pressed in page map_filter.html
    var washerID = "1LhDqVKzSkZdsnSC6wFrVG5jte93";
    const cb = document.getElementById('terms');
    if (cb.checked != true) {
        alert("PLEASE ACCEPT OUR TERMS");
        return;
    }
    if (!check_if_washer_open(opening_times, full_date)) {
        alert(msg);
        return;
    }
    if (!isUserSignedIn()) {
        signIn();
        return;
    }
    var userID = getUserToken();
    if (!await promiseUserLoaderById(userID)) {
        window.location.href="../../html/user_flow/user_registration.html";
        return;
    }
    sessionStorage.setItem("current_user_id", userID);
    cur_order = {
        comments: comments,
        washer: washerID,
        user: userID,
        loads: loads,
        wash_settings: wash_settings,
        due_to: full_date,
        price: price,
        properties: property,
    }
    var orderID = await createNewOrder(cur_order);    
    display_new_order_for_user(orderID); //orderID
    document.getElementById("overlay_thank_you").style.display = "block";
}

  
function off() {
    document.getElementById("overlay_thank_you").style.display = "none";
}


function nextDay(day_str){
    
    var x = CreateDayDictionary()[day_str];
    var now = new Date();    
    now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
    return now.toISOString().substring(0, 10);
}

function CreateDayDictionary() {
    var days = new Array();
    days['Sunday'] = 1;
    days['Monday'] = 2;
    days['Tuesday'] = 3;
    days['Wednesday'] = 4;
    days['Thursday'] = 5;
    days['Friday'] = 6;
    days['Saturday'] = 7;
    return days
    }



function open_indicator(opening_times,full_date) {
    icon_text = ""
    if (check_if_washer_open(opening_times, full_date)) {
        icon_text +='<div class="open_ind"><img style="margin-left: 10%; margin-right: 5%; margin-bottom: 2%;" src="../../images/open_ind.svg">Open</div>'
    }
    else {
        icon_text += '<div class="close_ind"><img style="margin-left: 10%; margin-right: 5%; margin-bottom: 2%;" src="../../images/closed_ind.svg">Close</div>';
    }
    document.getElementById("open_ind").innerHTML = icon_text;
}

// main function of place order page!!!!
async function load_place_order_page() {
    var washerID = sessionStorage.getItem("pressed_washer"); // washer that pressed in page map_filter.html
    var washerID = "1LhDqVKzSkZdsnSC6wFrVG5jte93";

    const washer_doc = await promiseWasherLoaderById(washerID); 
    // const all_orders = await promiseOrderArrayByWasherIdAndStatus(washerID, "finished"); // all finished orders of washer for his reviews
    load_profile_header_of_washer(washer_doc); // in profile_header.js
    
    // functions for place_order page tabs, in washer_tabs.js 
    f_checkOpeningTimes(washer_doc);
    f_get_opening_hours_table(washer_doc);
    f_display_washer_details(washer_doc);
    f_display_washer_reviews(washerID);

    opening_times = washer_doc.data().opening_times;
    // var first_opening_time = getWasherFirstOpeningTime(washer_doc);
    // open_day = nextDay(first_opening_time[0]);
    // open_hour = first_opening_time[1];
    open_day = nextDay("Sunday");
    open_hour = "10:00"
    document.getElementById("date").value =  open_day;
    document.getElementById("startTime").value = open_hour;
    update_properties_and_price();
    msg = "please order your laundry to an hour where " +washer_doc.data().name + " is working"
}
