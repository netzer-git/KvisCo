// import * as mdb from '../../mdb-ui-kit'; // lib
// import { Input } from '../../mdb-ui-kit'; // module

// washers list
let current_list_of_washers = [
    {
        'Document ID': 1,  
        name: "Netzer Epstein",
        rating_sum: 10,
        rating_num: 2,
        imageUrl: "../images/tal_e_pic.png",
        location_cor: {"lat": 31.779610027001155, "lng": 35.210351837826255},
        pics: ["../images/netzer pic.png","../images/netzer pic.png"],
        location_str: "Jerusalem,King George,15",
        machine_type: "Bosch F5690",
        description:  "we need some place details or short intro, one to two rows top. no more than that?",
        commitment: 60
      },
      {
        'Document ID': 2,  
        name: "Netzer Epstein",
        rating_sum: 10,
        rating_num: 2,
        imageUrl: "../images/tal_e_pic.png",
        location_cor: {"lat": 31.779610027001155, "lng": 35.210351837826255},
        pics: ["../images/netzer pic.png","../images/netzer pic.png"],
        location_str: "Jerusalem,King George,15",
        machine_type: "Bosch F5690",
        description:  "we need some place details or short intro, one to two rows top. no more than that?",
        commitment: 60
      },
      {
        'Document ID': 3,  
        name: "Netzer Epstein",
        rating_sum: 10,
        rating_num: 2,
        imageUrl: "../images/tal_e_pic.png",
        location_cor: {"lat": 31.779610027001155, "lng": 35.210351837826255},
        pics: ["../images/netzer pic.png","../images/netzer pic.png"],
        location_str: "Jerusalem,King George,15",
        machine_type: "Bosch F5690",
        description:  "we need some place details or short intro, one to two rows top. no more than that?",
        commitment: 60
      },
      {
        'Document ID': 4,  
        name: "Netzer Epstein",
        rating_sum: 10,
        rating_num: 2,
        imageUrl: "../images/tal_e_pic.png",
        location_cor: {"lat": 31.779610027001155, "lng": 35.210351837826255},
        pics: ["../images/netzer pic.png","../images/netzer pic.png"],
        location_str: "Jerusalem,King George,15",
        machine_type: "Bosch F5690",
        description:  "we need some place details or short intro, one to two rows top. no more than that?",
        commitment: 60
      },
      {
        'Document ID': 5,  
        name: "Netzer Epstein",
        rating_sum: 10,
        rating_num: 2,
        imageUrl: "../images/tal_e_pic.png",
        location_cor: {"lat": 31.779610027001155, "lng": 35.210351837826255},
        pics: ["../images/netzer pic.png","../images/netzer pic.png"],
        location_str: "Jerusalem,King George,15",
        machine_type: "Bosch F5690",
        description:  "we need some place details or short intro, one to two rows top. no more than that?",
        commitment: 60
      }
];
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

async function create_washer_list(filters) {
    /**
     * creaete washer list from JSON
     */
    washerDoc_array = await getWasherFilterQuery(filters); // get all washers
    return washerDoc_array;
    // washerDoc_array = getWasherFilterQuery({rating: 3.5}); // get washers with filters

    // var cur_loc = getCurrentUserLocation(); // => {lat: num, lng: num} only when user is online, else-null
}

function insert_washer_blocks(washerDoc) {
    /**
     *     currently - use all of the washers (query from server?) and take a filter function, than create each of the washers in block and display them.
        FIXME: hard to order-by by location\rating, maybe will take a lot of time to load but DB
    */
    let whole_washers_html_block = '';
    // adjusting page height
    const max_number_of_blocks = Math.min(MAX_NUMBER_OF_BLOCKS, washerDoc.length);

    for (let i = 0; i < max_number_of_blocks; i++) {
        let washer_block_raw_html = create_one_washer_block(washerDoc[i]);
        whole_washers_html_block += washer_block_raw_html;
    }
    document.getElementById("washers-cards").innerHTML = whole_washers_html_block;
}

/**
    takes wahser object and returns string of html tags and content.
    the content represents one wahser block.

    @param {Washer} washer - washer js
    @return {void}
*/
function create_one_washer_block(washerDoc) {
    console.log("this is the washer id", washerDoc.id.valueOf());
    let washer_block_raw_html = '<a class="washer-card col-12" href="#" onclick="save_washer_id("'+washerDoc.id.valueOf()+'")">';
    // creating html object
    washer_block_raw_html += '<div class="card">';
    washer_block_raw_html += '<img src="../images/card.svg" class="card-img" alt="..." image-rendering="crisp-edges"/>';
    // card profile pic & rating section
    washer_block_raw_html += '<div class="card-img-overlay">\n<div class="card-details row">\n<div class="card-pic-rating col-3">';
    washer_block_raw_html += '<img class="card-profile-img" src=\"'+washerDoc.data().imageUrl+'\"/>';
    washer_block_raw_html += '<div class="card-rating row">\n<div class="col-6" style="float: right;">\n<svg class="rating-star">\n<use xlink:href="#rating-star"></use>\n</svg>\n</div>\n<div class="col-6" style="float: left;">5</div>\n</div>\n</div>';
    // card text
    washer_block_raw_html+= '<div class="card-text col-9">';
    washer_block_raw_html+= '<h5 class="card-title">'+washerDoc.data().name+'</h5>';
    washer_block_raw_html+= '<h6 class="card-subtitle mb-2 text-muted">'+washerDoc.data().description+'</h6>';
    washer_block_raw_html+= '<p class="card-text">' + washerDoc.data().properties + '</p>';
    washer_block_raw_html+= '\n</div>\n</div>\n</div>\n</div>\n</a>';

    return washer_block_raw_html;
    /*washer_block_raw_html += '<div class="container-fluid washer_block">';
    washer_block_raw_html += '<div class="row">';
    washer_block_raw_html += '<div class="col-md-6">';
    washer_block_raw_html += '<img class="washer_img" src="' + washer.img_src + '" alt="Mister Washer" aria-hidden="true">';
    washer_block_raw_html += '</div>';
    washer_block_raw_html += '<div class="col-md-6">';
    washer_block_raw_html += '<div class="washer_text" onclick="redirect_specific_washer(' + washer.id + ')">';
    if (washer.white) {
        washer_block_raw_html += '<p>White and Colored in ' + washer.location + '</p>';
    } else {
        washer_block_raw_html += '<p>Colored in ' + washer.location + '</p>';
    }
    washer_block_raw_html += '<h2>' + washer.name + '</h2>';
    washer_block_raw_html += '<p>' + washer.description + '</p>';
    washer_block_raw_html += '</div></div></div></div>';*/
}
/**
 * FIXME: please
 * @param {*} washer_id 
 */
function redirect_specific_washer(washer_id) {
    // let current_washer = null;
    // for (i in current_user_location) {
    //     if (washer_id == current_user_location[i].id) {
    //         current_washer = current_user_location[i];
    //     }
    // } 
    // let url_params = new URLSearchParams();
    // const base_url = "wahser_details.html";
    // const final_url = base_url //+ JSON.stringify(current_washer);
    sessionStorage.setItem('current_wahser_id', washer_id);
    location.href = "../src/wahser_details.html";
    // window.open(final_url);
}

function update_drop_off_time(e){
    /**
     * update drop off time after it changed
     */
    drop_off_time = e.target.value
}

/* map section */
function initMap(filter = () => true) {
    /*
    initialzie google maps object and sets markers in the washers location.
    */
    // The map, centered at current location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: current_user_location,
    });

    
    // adding markers for the washers (after filter)
    /*for (i in current_list_of_washers) {
        if (filter(current_list_of_washers[i])) {
            const marker = new google.maps.Marker({
                position: {
                    lat: current_list_of_washers[i].lat,
                    lng: current_list_of_washers[i].lng
                },
                animation: google.maps.Animation.DROP,
                map: map,
                washer: current_list_of_washers[i],
            })
            marker.addListener("click", () => {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
                // filter by washer location
                filter_washers_by_distance_from_point(marker.washer.lat, marker.washer.lng);
            })
        }
    }*/
    /*//ofir sction
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            };

            user_pos= pos;

            UpdateUserLocation("/update_user_location");
            map.setCenter(pos);
        },
        () => {
            handleLocationError(true, infoWindow, map.getCenter());
        }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        map.setCenter({
        lat: 31.771959,
        lng: 35.217018,
        });
    }
    //end ofir*/
}

/* handle filters (&update the map section) */
function refresh_filters() {
/*
    refresh all of the filters
*/
    insert_washer_blocks();
    initMap();
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
    initMap(is_washer_self_service);
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
    initMap();
}

/**
 * @param {Washer} washer washer object
 * @param {Point} point specific point with lat\lng
 * @returns the distance between the washer and the point
 */
function dist(washer, middle_point) {
    return Math.sqrt((washer.lat - middle_point.lat) ** 2 + (washer.lng - middle_point.lng) ** 2)
}

function GetElementInsideContainer(containerID, childID) {
    /**
     * returns inside element in other element
     */
    var elm = document.getElementById(childID);
    var parent = elm ? elm.parentNode : {};
    return (parent.id && parent.id === containerID) ? elm : {};
}

function open_popup(ind){
    /**
     * open filter button pop up section
     * @param {Number} ind popup's index 
     */
    const targetDiv = document.getElementById("popup-text"+ind);
    if (targetDiv.style.visibility != "hidden") {
        targetDiv.style.visibility = "hidden";
        targetDiv.style.overflow = "hidden";
    } else {
        targetDiv.style.visibility = "visible";
        targetDiv.style.overflow = "visible";
    }
}

function insert_days_options(){
    /**
     * insert days options tags into days select tag (dropdown form)
     */
    let raw_html = '';
    for(i=0; i<DAYS.length; i++){
        raw_html += '<option>'+DAYS[i]+'</option>';
    }
    let select_day = document.getElementById("day");
    select_day.innerHTML = raw_html;
}

function update_active_times(){
    /**
     * close actvie times popup and update day and time filters
     */
    //close popup section
    open_popup(1);

    //update day & time filter
    let select_day = document.getElementById("day");
    active_times[0]= select_day.value;

    let select_time = document.getElementById("startTime");
    active_times[1]= select_time.value;

    //TODO: update changes on search results
}

function init_near_me_range(){
    /**
     * init near me range (slider)
     */
    range_elm = document.getElementById('dist-range');
    const range = new mdb.Range(range_elm);
    x = 0
}

async function on_load_page(){
    /**
     * 
     */
    //initialize search bar and get set results
    search_res = get_search_bar("search-bar");
    //initialize washers list
    washerDoc = await create_washer_list(search_res);
    //insert washers cards
    insert_washer_blocks(washerDoc);
}

function save_washer_id(id){
    /**
     * save washer id when click the washer card
     */
    console.log("this is the id in michal page:",id);
    sessionStorage.setItem("washer_id", id);
    window.location.href = "../html/place-order.html"
}