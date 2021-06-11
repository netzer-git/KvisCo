washer1 = {
    name: "Amitay Rachman", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
    profile_pic: "../images/amitay_pic.jpg", pics: ["../images/miele.png", "../Profile.png"],
    location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155, 35.215351837826255],
    num_of_reviews: "12", machine_year: "2012",
    model_name: "bosch", capacity: "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!",
    commit: "48 hours", working_hours: { Sunday: [11, 16], Monday: [09, 18], Tuesday: [10, 18], Wednesday: [9, 18], Thursday: [10, 20], Friday: [09, 20], Saturday: [10, 18] },
    clients_who_review: ['client3', 'client5'], properties: { white: true, door_2_door: true, ironing: true, access: true }
};


washer2 = {
    name: "Tal Eliram", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
    profile_pic: "../images/tal_e_pic.png", img_src: "../images/laundry-room-1.jpg", pics: ["../images/laundry-room-1.jpg", "../Profile.png"],
    location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155, 35.215351837826255],
    num_of_reviews: "12", machine_year: "2012",
    model_name: "bosch", capacity: "9KG", description: "Hello! I’m Tal, and I love to Fold laundry perfectly!",
    commit: "48 hours", working_hours: { Sunday: [11, 16], Monday: [09, 18], Tuesday: [10, 18], Wednesday: [9, 18], Thursday: [10, 20], Friday: [13, 20], Saturday: [10, 18] },
    clients_who_review: ['client3', 'client5'], properties: { white: true, door_2_door: true, ironing: true, access: true }
};

washer3 = {
    name: "Tal Rozentzvi", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
    profile_pic: "../images/tal_r_pic.png", img_src: "../images/laundry-room-1.jpg", pics: ["../images/tal_r_laundry.jpg", "../Profile.png"],
    location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155, 35.215351837826255],
    num_of_reviews: "12", machine_year: "2012",
    model_name: "bosch", capacity: "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!",
    commit: "48 hours", working_hours: { Sunday: [11, 16], Monday: [09, 18], Tuesday: [10, 18], Wednesday: [9, 18], Thursday: [10, 20], Friday: [09, 20], Saturday: [10, 18] },
    clients_who_review: ['client3', 'client5'], properties: { white: true, door_2_door: true, ironing: true, access: true }
};

user7 = {
    name: "Netzer Epstein", drop_off_time: [11, 14], rating: 4.5, location: { lat: 31.773610027001155, lng: 35.215351837826255 },
    wash_setting: { degree: 50, smell: "icy pear" },
    favorites: [washer1, washer2, washer3, washer2, washer2, washer2],
    profile_pic: "../images/netzer_pic.png", description: "Hi, my name is Netzer and I don't do any sport so my clothes smell OK :)",
    prefer_properties: { white: true, door_2_door: false, ironing: true, access: true }
};

user9 = {
    name: "Shelly bendor", drop_off_time: [11, 14], rating: 4.5, location: { lat: 31.773610027001155, lng: 35.215351837826255 },
    wash_setting: { degree: 50, smell: "icy pear" },
    favorites: [washer1, washer2, washer3, washer2, washer2, washer2],
    profile_pic: "../images/netzer_pic.png", description: "Hi, my name is Netzer and I don't do any sport so my clothes smell OK :)",
    prefer_properties: { white: true, door_2_door: false, ironing: true, access: true }
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

order111 = {
    orderID: "order111",
    washer: washer1,
    user: user7,
    dueTO: "18/04",
    Price: "30",
    status: "finished",
    rating_on_washer: 3,
    review_on_washer: "great lemon smell, very soft and also handsome bag! I'm reccomending",
    rating_on_user: 4,
    review_on_user: "a lot of socks which can be hard to connect toghther",
    laundry_pics: ["../images/folded/folded1.jpg", "../images/folded/folded2.jpg"]
}

order144 = {
    orderID: "order144",
    washer: washer1,
    user: user9,
    dueTO: "18/04",
    Price: "30",
    status: "finished",
    rating_on_washer: 3,
    review_on_washer: "great laundry",
    rating_on_user: 4,
    review_on_user: "orgnaize guy, came excactly on time",
    laundry_pics: ["../images/folded/folded2.jpg"]
}

order155 = {
    orderID: "order155",
    washer: washer1,
    user: user7,
    dueTO: "18/04",
    Price: "30",
    status: "finished",
    rating_on_washer: 5,
    review_on_washer: "amazing",
    rating_on_user: 0,
    review_on_user: "amazing",
    laundry_pics: ["../images/folded/folded3.jpg"]
}

order122 = {
    orderID: "order122",
    washer: washer1,
    user: user7,
    dueTO: "18/04",
    Price: "30",
    status: "finished",
    rating_on_washer: 4,
    review_on_washer: "great washer",
    rating_on_user: 0,
    review_on_user: "",
    laundry_pics: []
}



all_orders = [order111, order122, order155, order111, order122, order123, order111, order155, order144]






// reviews tabs
function get_reviews_on_user(tag, user) {
    all_reviews = "";
    for (let j = 0; j < all_orders.length; j++) {
        if (all_orders[j].user == user && all_orders[j].status == "finished" && all_orders[j].rating_on_user != "") {
            // here start block of review
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-lg-2'>";
            all_reviews += "<div class='profile_pic'><a href='#'><img class='rounded-circle-small' src=" + all_orders[j].washer.profile_pic + "></a></div>";
            all_reviews += "<h5>" + all_orders[j].washer.name + "</h5>";
            all_reviews += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src='../images/Star.png'>" + all_orders[j].rating_on_user + "</div></div>";
            all_reviews += "<div class='col-lg-4'>";
            all_reviews += "<p>" + all_orders[j].review_on_user + "</p>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-lg-6'>";
            for (let k = 0; k < all_orders[j].laundry_pics.length; k++) {
                all_reviews += '<img class="img-rounded-small" src="' + all_orders[j].laundry_pics[k] + '" alt="Mister Washer" aria-hidden="true">';
            }
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += '<hr style="border: 2px solid #000000">';
        }
    }
    if (all_reviews == "") {
        all_reviews += "<h4> there are no reviews yet </h4>";
    }
    all_reviews += '</div>';
    document.getElementById(tag).innerHTML = all_reviews;
}

// reviews tabs
function get_reviews_on_washer(tag, washer) {
    all_reviews = "";
    for (let j = 0; j < all_orders.length; j++) {
        if (all_orders[j].washer == washer && all_orders[j].status == "finished" && all_orders[j].rating_on_washer != "") {
            // here start block of review
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-lg-2'>";
            all_reviews += "<div class='profile_pic'><a href='#'><img class='rounded-circle-small' src=" + all_orders[j].user.profile_pic + "></a></div>";
            all_reviews += "<h5>" + all_orders[j].user.name + "</h5>";
            all_reviews += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src='../images/Star.png'>" + all_orders[j].rating_on_washer + "</div></div>";
            all_reviews += "<div class='col-lg-4'>";
            all_reviews += "<p>" + all_orders[j].review_on_washer + "</p>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-lg-6'>";
            for (let k = 0; k < all_orders[j].laundry_pics.length; k++) {
                all_reviews += '<img class="img-rounded-small" src="' + all_orders[j].laundry_pics[k] + '" alt="Mister Washer" aria-hidden="true">';
            }
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += '<hr style="border: 2px solid #000000">';
        }
    }
    if (all_reviews == "") {
        all_reviews += "<h4> there are no reviews yet </h4>";
    }
    all_reviews += '</div>';
    document.getElementById(tag).innerHTML = all_reviews;
}


// details_tab
function get_washer_detailes(tag, washer) {
    let details_table = "<table class = machine_details>";
    details_table += "<tr><tr><th>Model Name</th></tr><tr>";
    details_table += "<td>" + washer.model_name + "</td></tr><tr>";
    details_table += "<tr><tr><th>Capacity</th></tr><tr>";
    details_table += "<td>" + washer.capacity + "</td></tr><tr>";
    details_table += "<tr><tr><th>Purchasing Year</th></tr><tr>";
    details_table += "<td>" + washer.machine_year + "</td></tr><tr>";
    details_table += "<tr><tr><th>Special Services</th></tr><tr>";
    details_table += "<tr><td><img src='../images/check.png' alt=''>Ironing</td></tr>";
    details_table += "<tr><td><img src='../images/check.png' alt=''>Door 2 Door</td></tr>";
    details_table += "<tr><td><img src='../images/check.png' alt=''>Dryer</td></tr>";
    details_table += "</tr></table>";
    document.getElementById(tag).innerHTML = details_table;
}


function check_if_open(washer) {
    let date = new Date(); // current time
    let hours = date.getHours();
    let day = date.getDay();
    switch (day) {
        case 0:
            if (washer.working_hours.Sunday[0] <= hours && washer.working_hours.Sunday[1] >= hours) {
                return true;
            }
            break;
        case 1:
            if (washer.working_hours.Monday[0] <= hours && washer.working_hours.Monday[1] >= hours) {
                return true;
            }
            break;
        case 2:
            if (washer.working_hours.Tuesday[0] <= hours && washer.working_hours.Tuesday[1] >= hours) {
                return true;
            }
            break;
        case 3:
            if (washer.working_hours.Wednesday[0] <= hours && washer.working_hours.Wednesday[1] >= hours) {
                return true;
            }
            break;
        case 4:
            if (washer.working_hours.Thursday[0] <= hours && washer.working_hours.Thursday[1] >= hours) {
                return true;
            }
            break;
        case 5:
            if (washer.working_hours.Friday[0] <= hours && washer.working_hours.Friday[1] >= hours) {
                return true;
            }
            break;
        case 6:
            if (washer.working_hours.Saturday[0] <= hours && washer.working_hours.Saturday[1] >= hours) {
                return true;
            }
            break;
    }
    return false
}


// working hours functions
function get_opening_hours_table(tag, washer) {
    working_hours = '<table class="opening-hours-table" id="opening-hours-table">';
    working_hours += '<tr id="Sunday" itemprop="openingHours" title="Open Sunday"><td>Sunday</td>';
    working_hours += '<td class="opens">' + washer.working_hours.Sunday[0] + ':00</td><td>-</td>';
    working_hours += '<td class="closes">' + washer.working_hours.Sunday[1] + ':00</td>';
    working_hours += '</tr>';
    working_hours += '<tr id="Monday" itemprop="openingHours" title="Open Monday"><td>Monday</td>';
    working_hours += '<td class="opens">' + washer.working_hours.Monday[0] + ':00</td><td>-</td>';
    working_hours += '<td class="closes">' + washer.working_hours.Monday[1] + ':00</td>';
    working_hours += '</tr>';
    working_hours += '<tr id="Tuesday" itemprop="openingHours" title="Open Tuesday"><td>Tuesday</td>';
    working_hours += '<td class="opens">' + washer.working_hours.Tuesday[0] + ':00</td><td>-</td>';
    working_hours += '<td class="closes">' + washer.working_hours.Tuesday[1] + ':00</td>';
    working_hours += '</tr>';
    working_hours += '<tr id="Wednesday" itemprop="openingHours" title="Open Wednesday"><td>Wednesday</td>';
    working_hours += '<td class="opens">' + washer.working_hours.Wednesday[0] + ':00</td><td>-</td>';
    working_hours += '<td class="closes">' + washer.working_hours.Wednesday[1] + ':00</td>';
    working_hours += '</tr>';
    working_hours += '<tr id="Thursday" itemprop="openingHours" title="Open Thursday"><td>Thursday</td>';
    working_hours += '<td class="opens">' + washer.working_hours.Thursday[0] + ':00</td><td>-</td>';
    working_hours += '<td class="closes">' + washer.working_hours.Thursday[1] + ':00</td>';
    working_hours += '</tr>';
    working_hours += '<tr id="Friday" itemprop="openingHours" title="Open Friday"><td>Friday</td>';
    working_hours += '<td class="opens">' + washer.working_hours.Friday[0] + ':00</td><td>-</td>';
    working_hours += '<td class="closes">' + washer.working_hours.Friday[1] + ':00</td>';
    working_hours += '</tr>';
    working_hours += '<tr id="Saturday" itemprop="openingHours" title="Open Saturday"><td>Saturday</td>';
    working_hours += '<td class="opens">' + washer.working_hours.Saturday[0] + ':00</td><td>-</td>';
    working_hours += '<td class="closes">' + washer.working_hours.Saturday[1] + ':00</td>';
    working_hours += '</tr>';
    working_hours += '</table>';
    document.getElementById(tag).innerHTML = working_hours;
}

function checkOpeningTimes(tag, washer) {
    if (check_if_open(washer)) {
        document.getElementById(tag).innerHTML = '<p id="openClosed">working now</p>';
        document.getElementById("openClosed").style.color = "green";
    }
    else {
        document.getElementById(tag).innerHTML = '<p id="openClosed">closed now</p>';
        document.getElementById("openClosed").style.color = "red";
    }
}


function color_today() {
    let date = new Date(); // current time
    let day = date.getDay();
    let table = document.getElementById("opening-hours-table")
    let rows = table.getElementsByTagName("tr");
    rows[day].style.color = '#FFC636';
}


