/*
* Deafult properties prices 
*/
const DEAFULT_PRICE = 30;
const DOOR2DOOR_PRICE = 20;
const IRONING_PRICE = 25;
const DRYER_PRICE = 12;
const FAST_PTICE = 10;

var washer_opening_times;
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
    open_indicator(washer_opening_times,full_date);
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
    const cb = document.getElementById('terms');
    if (cb.checked != true) {
        alert("PLEASE ACCEPT OUR TERMS");
        return;
    }
    if (!check_if_washer_open(washer_opening_times, full_date)) {
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
    display_new_order_for_user(orderID);
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
    days['Sunday'] = 0;
    days['Monday'] = 1;
    days['Tuesday'] = 2;
    days['Wednesday'] = 3;
    days['Thursday'] = 4;
    days['Friday'] = 5;
    days['Saturday'] = 6;
    return days
    }



function open_indicator(washer_opening_times,full_date) {
    icon_text = ""
    console.log(washer_opening_times,full_date);
    if (check_if_washer_open(washer_opening_times, full_date)) {
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
    const washer_doc = await promiseWasherLoaderById(washerID); 
    load_profile_header_of_washer(washer_doc); // in profile_header.js
    
    // functions for place_order page tabs, in washer_tabs.js 
    f_checkOpeningTimes(washer_doc);
    f_get_opening_hours_table(washer_doc);
    f_display_washer_details(washer_doc);
    f_display_washer_reviews(washerID);

    washer_opening_times = washer_doc.data().opening_times;
    // if (opening_time == "empty") {
    var first_opening_time = getWasherFirstOpeningTime(washer_opening_times);
    // }
    // else {
    //     var first_opening_time = ["Sunday", "08:00"];
    // }
    document.getElementById("date").value =  nextDay(first_opening_time[0]);
    document.getElementById("startTime").value = first_opening_time[1];
    update_properties_and_price();
    msg = "please order your laundry to an hour where " +washer_doc.data().name + " is working"
}


function getWasherFirstOpeningTime(washer_opening_times) {  
    var week_days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var cur_date = new Date();
    var day_num = cur_date.getDay();
    var tz_offset = cur_date.getTimezoneOffset() * 60000; // offset in milliseconds
    var localTime = (new Date(Date.now() - tz_offset)).toISOString().slice(11, 16);
    // => '2015-01-26T06:40:36.181'
    if (washer_opening_times[week_days[day_num]] !== undefined) {
        open_time = '01/01/2011 ' + washer_opening_times[week_days[day_num]][0];
        close_time = '01/01/2011 ' + washer_opening_times[week_days[day_num]][1];
        cur_time = '01/01/2011 ' + localTime;
        if (Date.parse(open_time) > Date.parse(cur_time)) {
            return [week_days[day_num], washer_opening_times[week_days[day_num]][0]];
        }
        if (Date.parse(cur_time) < Date.parse(close_time)) {
            return [week_days[day_num], localTime];
        }
        else {
            day_num++;
        }
    }
    while (washer_opening_times[week_days[day_num]] === undefined) {
        day_num++;
        if (day_num == 7) {
            day_num = 0;
        }
    }
    return [week_days[day_num], washer_opening_times[week_days[day_num]][0]];
}

async function insertPlaceOrderBox(ev) { 
    var washerID = sessionStorage.getItem("pressed_washer");
    console.log("insert washer place order block", washerID)
    // var washerID = "1LhDqVKzSkZdsnSC6wFrVG5jte93";
    const washer_doc = await promiseWasherLoaderById(washerID); 

    // The col-5 can be changed.
    //po_block = '<div class="place-order col-5" style="margin-top: 2%;">';
    // The SVG is neccessery to be included in the page, where the bodey begins.
    po_block = '<svg><use xlink:href="#order-box-svg"></use></svg>';
    // Topic
    po_block += '<div class="row" style="z-index: 1; margin-top: -135px;">';
    po_block += '<h7>PLACE ORDER</h7>';
    po_block += '<div class="row">';
    po_block += '<div class = "description" style="margin-left: 5%;"> from '+ washer_doc.data().name.split(" ")[0] + "</div>";
    po_block += '</div>'
    // Start of input table zone
    po_block += '<table class="place_order_table">';
    // First row- labels of dropoff day and special services.
    po_block += '<tr style="color: black;">';
    po_block += '<td>Drop off day</td>';
    po_block += '<td style="margin-left: -100px;">Special services</td></tr>';
    // Second row- input fields of dropoff time and special services.
    po_block += '<tr><td style="width: 250px;">';
    po_block += '<div class="box select">';
    po_block += '<input class="choose_location" type="date" id="date" value="2021-06-21" onchange="update_properties_and_price()"></div>'; // the function updates the price in the box at the buttom.
    po_block += '<script>document.getElementById("date").value = new Date().toISOString().substring(0, 10);</script>'; // function that saves the inserted date
    po_block += '</td><td><div class="box select">';
    po_block += '<select id="property" onchange="update_properties_and_price()">';
    po_block += '<option value="Default" selected>Default</option><option value="Ironing">Ironing(+25)</option>';
    po_block += '<option value="Door2Door">Door-2-Door(+20)</option>';
    po_block += '<option value="Dryer">Hanging Drying(+12)</option></select></div></td></tr>';
    // Labels of Drop off time and loads
    po_block += '<tr style="color: black;"><td style="padding-top: 3%;">Drop off time</td>';
    po_block += '<td style="margin-left: 0; padding-top: 3%;">Loads</td></tr>';
    // input fields of time and  
    po_block += '<tr><td>';
    po_block += '<input class="choose_location" type="time" id="startTime"value="08:00" onchange="update_properties_and_price()"></td>';
    po_block += '<td style="margin-left: 0;"><input class="choose_location" type="number" id="loads"value="1" onchange="update_properties_and_price()"></td></tr>';
    po_block += '<tr style="color: black;"><td><div id="open_ind"></div></td>';
    po_block += '<td style="padding-top: 3%;">Wash settings</td>';
    po_block += '</tr><tr><td></td>';
    po_block += '<td><div class="box select"><select id="wash_settings" onchange="update_properties_and_price()">';
    po_block += '<option value="Default" selected>Default</option>';
    po_block += '<option value="30°C Wash">30°C Wash</option><option value="60°C Wash">60°C Wash</option>';
    po_block += '<option value="Fast Wash">Fast Wash(+10)</option>';
    po_block += '<option value="Whites Only">Whites Only</option>';
    po_block += '<option value="Delicates">Delicates</option>';
    po_block += '</select></div></td></tr></table>'
    po_block += '<textarea class="note" id="notes_for_laundry" name="note" rows="4" cols="50" placeholder="Special requests and comments..."onchange="update_properties_and_price()"></textarea>';
    po_block += '<label class="cont">I agree to terms and conditions<input type="checkbox" id="terms"><span class="checkmark"></span></label>';
    po_block += '<div class="row"><div class="col-5">';
    po_block += '<div class="col-5"><tr><td><div class="small-box" id="price"></div>';
    po_block += '<script>update_properties_and_price()</script></td></tr></table></div>';
    po_block += '<div class="col-7"><div style="margin-left: 15%; margin-top: -3%;">';
    po_block += '<div id="overlay_register" onclick="off()">';
    po_block += '<div id="register_block"></div></div>';
    po_block += '<div><button onclick="create_order()"class="button1">Send Request</button></div>';
    po_block += '</div></div></div></div>';
    document.getElementById("place-order").innerHTML = po_block;

    washer_opening_times = washer_doc.data().opening_times;
    var first_opening_time = getWasherFirstOpeningTime(washer_opening_times);
    document.getElementById("date").value =  nextDay(first_opening_time[0]);
    document.getElementById("startTime").value = first_opening_time[1];
    update_properties_and_price();
    msg = "please order your laundry to an hour where " + washer_doc.data().name + " is working";


}