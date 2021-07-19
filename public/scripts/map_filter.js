current_location = {
    lat: 31.773610027001155,
    lng: 35.235351837826255
} // burger room
////////////////////////////////////////////////////

const MAX_NUMBER_OF_BLOCKS = 15; // max number of blocks in the page
var current_user_location; // the current location of the user by user settings

const SPECIAL_SERVICES = ["Default", "30°C Wash", "60°C Wash", "Fast Wash", "Whites Only", "Delicates", "Ironing"];
// filters global variables
let near_me_dist, rating, special_services;
let active_times = new Array(2);
let washer_doc_array;

async function show_only_open_now() {
    if (document.getElementById("filter-btn").classList.contains("active")) {
        document.getElementById("filter-btn").classList.remove("active");
        document.getElementById("filter-btn").style.color = "black";
        on_load_page();
    } else {
        document.getElementById("filter-btn").classList.add("active");
        document.getElementById("filter-btn").style.color = "green";
        washer_doc_array_temp = [];
        for (i = 0; i < washer_doc_array.length; i++) {
            cur_opening_times = washer_doc_array[i].data().opening_times;
            if (check_if_washer_open_now(cur_opening_times)) {
                washer_doc_array_temp.push(washer_doc_array[i])
            }
        }
        washer_doc_array = washer_doc_array_temp;
        // search_res = get_search_bar("search-bar");
        await insert_washer_blocks(washer_doc_array, new Date().toLocaleString('en-us', {  weekday: 'long' }));
        document.getElementById("place-order").hidden = true;
    }
}


/* handle washers objects */

/**
 * create washer list from Firestore storage
 * @param {String : Number} filters 
 * @returns Washer Objects array
 */
async function create_washer_list(filters, current_user_location) {
    /**
     * create washer list from JSON
     */
    filters.currentPoint = current_user_location;
    washer_doc_array = await getWasherFilterQuery(filters); // get all washers
    return washer_doc_array;

}


/**
 * get all washers and create each of the washers in block and display them.
 * @param {*} washer_doc 
 * @param {String} day - day field of the search result
 */
async function insert_washer_blocks(washer_doc, day) {
    let whole_washers_html_block = '';
    if (washer_doc.length == 0) {
        whole_washers_html_block += "<h5>There are no washers working this day,</h5>\n<h5>please try other one :)</h5>"
    }
    // adjusting page height
    const max_number_of_blocks = Math.min(MAX_NUMBER_OF_BLOCKS, washer_doc.length);

    for (let i = 0; i < max_number_of_blocks; i++) {
        let washer_block_raw_html = await create_one_washer_block(washer_doc[i], day);
        whole_washers_html_block += washer_block_raw_html;
    }
    document.getElementById("washers-cards").innerHTML = whole_washers_html_block;

    // add onclick function
    var washer_cards = document.getElementsByClassName("washer-card");
}

/**
 * takes wahser object and returns string of html tags and content.
    the content represents one wahser block.
 * @param {{Washer} washer_doc 
 * @param {String} day - day field of the search result
 * @returns washer card HTML element
 */
async function create_one_washer_block(washer_doc, day) {
    rating = await getRatingFromDoc(washer_doc, 'washer');
    console.log("this is the washer id", washer_doc.id.valueOf());
    let washer_block_raw_html = '<div class="washer-card" id="' + washer_doc.id.valueOf() + '">';
    // creating html object
    washer_block_raw_html += '<div class="shadow-none card">';
    washer_block_raw_html += '<img src="../../images/card.svg" class="card-img" alt="' + washer_doc.data().name + '" image-rendering="crisp-edges"/>';
    // card profile pic & rating section
    washer_block_raw_html += '<div class="card-img-overlay">\n';
    washer_block_raw_html += '<div class="card-details row">\n';

    washer_block_raw_html += '<div class="card-pic-rating col-3">';
    washer_block_raw_html += '<div class="card-profile-img-border"><img class="card-profile-img" src=\"' + washer_doc.data().imageUrl + '\"></div>\n</div>';
    // card text
    // name
    washer_block_raw_html += '<div class="card-text col-9">\n';
    washer_block_raw_html += '<div class="row"><button class = "unstyle_name" id="' + washer_doc.id.valueOf() + '" onclick="save_washer_id(this)"><h5 class="card-title">' + washer_doc.data().name + '</h5></button></div>';
    //opening hours
    var hours = washer_doc.data().opening_times[day][0] + '-' + washer_doc.data().opening_times[day][1];
    washer_block_raw_html += '<div class="row">\n<div class="col-icon col-1"><i class="bi bi-clock"></i></div>\n<div class="col-10"><p class="card-text">' + hours + '</p></div>\n</div>';
    // distance
    var dist = getDistanceFromLatLonInKm(current_user_location, washer_doc.data().location_cor).toFixed(1);
    washer_block_raw_html += '<div class="row"><div class="col-icon col-1"><i class="bi bi-geo-alt-fill" style="color:var(--color-4)"></i></div>\n<div class="col-2"><p class="card-text">' + dist + '</p></div>';
    // add rating in case rating > 0
    if (rating == 0) {
        washer_block_raw_html += '<div class="col-icon col-1"><i class="bi bi-star-fill" style="color:var(--color-2);visibility:hidden"></i></div>\n<div class="col-2" style="visibility:hidden"><p class="card-text">' + rating + '</p></div>';
    } else {
        washer_block_raw_html += '<div class="col-icon col-1"><i class="bi bi-star-fill" style="color:var(--color-2)"></i></div>\n<div class="col-3"><p class="card-text">' + rating + '</p></div>';
    }
    washer_block_raw_html += '<div class="row">\n<div class="col-7"><p class="card-text">' + washer_doc.data().properties + ' | ' + washer_doc.data().commitment + ' hours</p></div>\n';
    washer_block_raw_html += '<div class="col-4"><button id="' + washer_doc.id.valueOf() + '" onclick="insertPlaceOrderBox(this)" class="button1" style="width: 120px;" >Quick Order</button></div>\n</div>';
    washer_block_raw_html += '\n</div>\n</div>\n</div></div>\n</div></div>';
    return washer_block_raw_html;

}

/**
 * FIXME: please
 * @param {*} washer_id 
 */
function redirect_specific_washer(washer_id) {
    sessionStorage.setItem('current_wahser_id', washer_id);
    location.href = "../src/wahser_details.html";
}

/**
 * update drop off time after it changed
 */
function update_drop_off_time(e) {
    drop_off_time = e.target.value
}


/* handle filters (&update the map section) */

/**
 * refresh all of the filters
 */
function refresh_filters() {
    insert_washer_blocks();
}

/**
 * change the order of the washers array by their distance to specified point
 * @param {Number} lat the point latitude
 * @param {Number} lng the point longitude
 */
function filter_washers_by_distance_from_point(lat, lng) {
    middle_point = {
        lat: lat,
        lng: lng
    }
    // sort by distance comparison
    current_list_of_washers.sort((washer_a, washer_b) => {
        return dist(washer_a, middle_point) - dist(washer_b, middle_point) > 0 ? 1 : -1;
    });
    insert_washer_blocks();
}

/**
 * @param {Washer} washer washer object
 * @param {Point} point specific point with lat\lng
 * @returns the distance between the washer and the point
 */
function dist(washer, middle_point) {
    return Math.sqrt((washer.lat - middle_point.lat) ** 2 + (washer.lng - middle_point.lng) ** 2)
}

/**
 * open filter button pop up section
 * @param {Number} ind popup's index 
 */
function open_popup(ind) {
    const targetDiv = document.getElementById("popup-text" + ind);
    if (targetDiv.style.visibility != "hidden") {
        targetDiv.style.visibility = "hidden";
        targetDiv.style.overflow = "hidden";
    } else {
        targetDiv.style.visibility = "visible";
        targetDiv.style.overflow = "visible";
    }
}

/**
 * insert days options tags into days select tag (dropdown form)
 */
// function insert_days_options(){
//     let raw_html = '';
//     for(i=0; i<DAYS.length; i++){
//         raw_html += '<option>'+DAYS[i]+'</option>';
//     }
//     let select_day = document.getElementById("day");
//     select_day.innerHTML = raw_html;
// }

/**
 * close active times popup and update day and time filters
 */
function update_active_times() {
    //close popup section
    open_popup(1);

    //update day & time filter
    let select_day = document.getElementById("day");
    active_times[0] = select_day.value;

    let select_time = document.getElementById("startTime");
    active_times[1] = select_time.value;

    //TODO: update changes on search results
}

/**
 * init near me range (slider)
 */
function init_near_me_range() {
    range_elm = document.getElementById('dist-range');
    const range = new mdb.Range(range_elm);
    x = 0
}

/**
 * 
 * @param {*} search_res takes the JSON of the search bar
 * @returns the current user location by priority
 */
async function get_current_user_location(search_res) {
    // 1 - take the place from the search bar
    if (search_res.address !== undefined && search_res.address !== '') {
        let data = await forwardGeocodePromise(search_res.address);
        return {
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng
        };
    }
    // 2 - take the current user location
    current_user = await promiseUserLoaderById(sessionStorage.getItem("connected_userID"));
    if (current_user) {
        return current_user.data().location_cor;
    }
    // 3 - take the current computer location from google
    // TODO
    // 4 - take the burger room coordinates
    return current_location
}


/**
 * save washer id when click the washer card
 * @param {Number} id 
 */
 function save_washer_id(e) {
    console.log("this is the id in michal page:", e.id);
    sessionStorage.setItem("pressed_washer", e.id);
    window.location.href = "../user_flow/place_order.html"
}

/**
 * 
 */
async function on_load_page() {

    //initialize search bar and get set results
    search_res = get_search_bar("search-bar");
    current_user_location = await get_current_user_location(search_res);
    //initialize washers list
    washer_doc_array = await create_washer_list(search_res, current_user_location);
    //insert washers cards
    await insert_washer_blocks(washer_doc_array, search_res["myDay"]);
    document.getElementById("place-order").hidden = true;
    document.getElementById("distanceSlider").value = "2";
    //initialize filters btn
    // insert_days_options();
    // init_near_me_range();
}

window.onload = on_load_page;

async function go_closer() {
    if (document.getElementById("distanceSlider").value == "1") {
        document.getElementById("distanceSlider").value = "2";
    }
    else if (document.getElementById("distanceSlider").value == "2") {
        document.getElementById("distanceSlider").value = "3";
    }
    else if (document.getElementById("distanceSlider").value == "3") {
        return
    }
    await filter_by_slider();
}

async function go_better() {
    if (document.getElementById("distanceSlider").value == "3") {
        document.getElementById("distanceSlider").value = "2";
    }
    else if (document.getElementById("distanceSlider").value == "2") {
        document.getElementById("distanceSlider").value = "1";
    }
    else if (document.getElementById("distanceSlider").value == "1") {
        return
    }
    await filter_by_slider();
}

async function filter_by_slider() {
    search_res = get_search_bar("search-bar");
    search_res.currentPoint = current_user_location
    washer_doc_array = await getBetterCloserWashers(document.getElementById("distanceSlider").value, search_res);
    await insert_washer_blocks(washer_doc_array, search_res["myDay"]);
    document.getElementById("place-order").hidden = true;
}