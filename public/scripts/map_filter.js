current_location = {
    lat: 31.773610027001155,
    lng: 35.235351837826255
} // burger room
////////////////////////////////////////////////////

const MAX_NUMBER_OF_BLOCKS = 5; // max number of blocks in the page
// let current_list_of_washers = create_washer_list(); // the current list of washers, by filter.
const current_user_location = current_location // the current location of the user by user settings

// popup
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const NEAR_ME = ["0", "5", "0.5", "0"];
const RATING = new Array(5);
const SPECIAL_SERVICES = ["Default", "30°C Wash", "60°C Wash", "Fast Wash", "Whites Only", "Delicates", "Ironing"];
// filters global variables
let near_me_dist, rating, special_services;
let active_times= new Array(2);
const NUM_POPUP = 4
let washerDoc_array;

/* handle washers objects */
/**
 * create washer list from Firestore storage
 * @param {String : Number} filters 
 * @returns Washer Objects array
 */
async function create_washer_list(filters) {
    /**
     * creaete washer list from JSON
     */
    washerDoc_array = await getWasherFilterQuery(filters); // get all washers
    return washerDoc_array;
    // washerDoc_array = getWasherFilterQuery({rating: 3.5}); // get washers with filters

    // var cur_loc = getCurrentUserLocation(); // => {lat: num, lng: num} only when user is online, else-null
}


/**
 * get all washers and create each of the washers in block and display them.
 * @param {*} washerDoc 
 */
function insert_washer_blocks(washerDoc) {
    let whole_washers_html_block = '';
    // adjusting page height
    const max_number_of_blocks = Math.min(MAX_NUMBER_OF_BLOCKS, washerDoc.length);

    for (let i = 0; i < max_number_of_blocks; i++) {
        // let washer_block_raw_html = create_one_washer_block(washerDoc[i]);
        whole_washers_html_block += washer_block_raw_html;
    }
    document.getElementById("washers-cards").innerHTML = whole_washers_html_block;

    // add onclick function
    var washer_cards = document.getElementsByClassName("washer-card");
    // for (var i = 0; i < washer_cards.length; i++) {
    //     console.log(washer_cards[i].id);
    //     washer_cards[i].onclick = function(){save_washer_id(washer_cards[i].id)};
    // }
}

/**
    takes wahser object and returns string of html tags and content.
    the content represents one wahser block.

    @param {Washer} washer - washer js
    @return {void}
*/
function create_one_washer_block(washerDoc) {
    console.log("this is the washer id", washerDoc.id.valueOf());
    // let washer_block_raw_html = '<a class="washer-card" id="'+washerDoc.id.valueOf()+'">';
    let washer_block_raw_html = '<div class="washer-card" id="'+washerDoc.id.valueOf()+'" onclick="save_washer_id(this)">';
    // creating html object
    washer_block_raw_html += '<div class="card">';
    washer_block_raw_html += '<img src="../../images/card.svg" class="card-img" alt="..." image-rendering="crisp-edges"/>';
    // washer_block_raw_html += '<svg class="card-img"><use xlink:href="#filter-card"></use></svg>';
    // card profile pic & rating section
    washer_block_raw_html += '<div class="card-img-overlay">\n<div class="card-details row">\n<div class="card-pic-rating col-3">';
    washer_block_raw_html += '<img class="card-profile-img" src=\"'+washerDoc.data().imageUrl+'\"/>';
    washer_block_raw_html += '<div class="card-rating row">\n<div class="col-6" style="float: right;">\n<svg class="rating-star">\n<use xlink:href="#rating-star"></use>\n</svg>\n</div>\n<div class="col-6" style="float: left;">'+getRatingFromDoc(washerDoc, 'washer')+'</div>\n</div>\n</div>';
    // card text
    washer_block_raw_html+= '<div class="card-text col-9">';
    washer_block_raw_html+= '<h5 class="card-title">'+washerDoc.data().name+'</h5>';
    washer_block_raw_html+= '<h6 class="card-subtitle mb-2 text-muted">'+washerDoc.data().description+'</h6>';
    washer_block_raw_html+= '<p class="card-text">' + washerDoc.data().properties + '</p>';
    washer_block_raw_html+= '\n</div>\n</div>\n</div>\n</div>\n</div>';
    // washer_block_raw_html+= '\n</div>\n</div>\n</div>\n</div>\n</a>';

    return washer_block_raw_html;
}

/**
 * FIXME: please
 * @param {*} washer_id 
 */
function redirect_specific_washer(washer_id) {
    sessionStorage.setItem('current_wahser_id', washer_id);
    location.href = "../src/wahser_details.html";
    // window.open(final_url);
}

/**
 * update drop off time after it changed
 */
function update_drop_off_time(e){
    drop_off_time = e.target.value
}


/* handle filters (&update the map section) */
/**
 * refresh all of the filters
 */
function refresh_filters() {
    insert_washer_blocks();
}

/*
    TODO: add Documentation
*/
function filter_washers_by_self_service() {
    // TODO: change for the real purpose
    function is_washer_self_service(washer) {
        return (washer.location == "Jerusalem");
    }

    // insert new blocks and markers
    insert_washer_blocks(is_washer_self_service);
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
function open_popup(ind){
    const targetDiv = document.getElementById("popup-text"+ind);
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
function insert_days_options(){
    let raw_html = '';
    for(i=0; i<DAYS.length; i++){
        raw_html += '<option>'+DAYS[i]+'</option>';
    }
    let select_day = document.getElementById("day");
    select_day.innerHTML = raw_html;
}

/**
 * close active times popup and update day and time filters
 */ 
function update_active_times(){
    //close popup section
    open_popup(1);

    //update day & time filter
    let select_day = document.getElementById("day");
    active_times[0]= select_day.value;

    let select_time = document.getElementById("startTime");
    active_times[1]= select_time.value;

    //TODO: update changes on search results
}

/**
 * init near me range (slider)
 */
function init_near_me_range(){
    range_elm = document.getElementById('dist-range');
    const range = new mdb.Range(range_elm);
    x = 0
}

/**
 * 
 */
async function on_load_page(){

    //initialize search bar and get set results
    search_res = get_search_bar("search-bar");
    search_res['myDay'] = search_res["myDate"].getDay();
    //initialize washers list
    washerDoc = await create_washer_list(search_res);
    //insert washers cards
    insert_washer_blocks(washerDoc);
    //initialize filters btn
    insert_days_options();
    init_near_me_range();
}


/**
 * save washer id when click the washer card
 * @param {Number} id 
 */
function save_washer_id(e){
    console.log("this is the id in michal page:",e.id);
    sessionStorage.setItem("pressed_washer", e.id);
    window.location.href = "../user_flow/place_order.html"
}

window.onload = on_load_page;
