
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
            all_reviews += "<div class='col-6'>";
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-1'>";
            all_reviews += "</div>";
            all_reviews += "<div class='col-2'>";
            all_reviews += "<div class='profile_pic'><a href='#'><img class='rounded-circle-small' src=" + all_orders[j].user.profile_pic + "></a></div>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-6'>";
            all_reviews += "<div class='location'>" + all_orders[j].user.name + "</div>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-3'>";
            all_reviews += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src='../images/Star_yellow.png'>" + all_orders[j].rating_on_washer + "</div>";
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-3'>"
            all_reviews += '</div>';
            all_reviews += "<div class='col-9'>";
            all_reviews += "<div class='reviews_text'>" + all_orders[j].review_on_washer + "</div>";
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += "<div class='col-6'>";
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


// // details_tab
// function get_washer_detailes(tag, washer) {
//     let details_table = "<table class = machine_details>";
//     details_table += "<tr><tr><th>Model Name</th></tr><tr>";
//     details_table += "<td>" + washer.model_name + "</td></tr><tr>";
//     details_table += "<tr><tr><th>Capacity</th></tr><tr>";
//     details_table += "<td>" + washer.capacity + "</td></tr><tr>";
//     details_table += "<tr><tr><th>Purchasing Year</th></tr><tr>";
//     details_table += "<td>" + washer.machine_year + "</td></tr><tr>";
//     details_table += "<tr><tr><th>Special Services</th></tr><tr>";
//     details_table += "<tr><td><img src='../images/check.png' alt=''>Ironing</td></tr>";
//     details_table += "<tr><td><img src='../images/check.png' alt=''>Door 2 Door</td></tr>";
//     details_table += "<tr><td><img src='../images/check.png' alt=''>Dryer</td></tr>";
//     details_table += "</tr></table>";
//     document.getElementById(tag).innerHTML = details_table;
// }

// details_tab
function f_display_washer_details(washer_doc) {
    let details_table = "<table class = machine_details>";
    details_table += "<tr><tr><th>Model Name</th></tr><tr>";
    details_table += "<td>" + washer_doc.data().model_name + "</td></tr><tr>";
    details_table += "<tr><tr><th>Capacity</th></tr><tr>";
    details_table += "<td>" + washer_doc.data().capacity + "</td></tr><tr>";
    details_table += "<tr><tr><th>Purchasing Year</th></tr><tr>";
    details_table += "<td>" + washer_doc.data().purchasing_year + "</td></tr><tr>";
    details_table += "<tr><tr><th>Special Services</th></tr><tr>";
    if (washer_doc.data().properties == "ironing") {
        details_table += "<tr><td><img src='../images/check.png' alt=''>Ironing</td></tr>";
    }
    if (washer_doc.data().properties == "door2door") {
        details_table += "<tr><td><img src='../images/check.png' alt=''>Door 2 Door</td></tr>";
    }
    if (washer_doc.data().properties == "dryer") {
        details_table += "<tr><td><img src='../images/check.png' alt=''>Dryer</td></tr>";
    }
    details_table += "</tr></table>";
    document.getElementById("washer_details").innerHTML = details_table;
}


// function check_if_open(washer) {
//     let date = new Date(); // current time
//     let hours = date.getHours();
//     let day = date.getDay();
//     switch (day) {
//         case 0:
//             if (washer.working_hours.Sunday[0] <= hours && washer.working_hours.Sunday[1] >= hours) {
//                 return true;
//             }
//             break;
//         case 1:
//             if (washer.working_hours.Monday[0] <= hours && washer.working_hours.Monday[1] >= hours) {
//                 return true;
//             }
//             break;
//         case 2:
//             if (washer.working_hours.Tuesday[0] <= hours && washer.working_hours.Tuesday[1] >= hours) {
//                 return true;
//             }
//             break;
//         case 3:
//             if (washer.working_hours.Wednesday[0] <= hours && washer.working_hours.Wednesday[1] >= hours) {
//                 return true;
//             }
//             break;
//         case 4:
//             if (washer.working_hours.Thursday[0] <= hours && washer.working_hours.Thursday[1] >= hours) {
//                 return true;
//             }
//             break;
//         case 5:
//             if (washer.working_hours.Friday[0] <= hours && washer.working_hours.Friday[1] >= hours) {
//                 return true;
//             }
//             break;
//         case 6:
//             if (washer.working_hours.Saturday[0] <= hours && washer.working_hours.Saturday[1] >= hours) {
//                 return true;
//             }
//             break;
//     }
//     return false
// }

function toFullTimestamp(fullDate,time){
    year = fullDate.getFullYear();
    month = fullDate.getMonth();
    day = fullDate.getDate();
    hour = time.substring(0,2);
    minute = time.substring(3,5);
    second = "00";
    return new Date(Date.UTC(year,month,day,hour,minute,second));
    // return datum.getTime()/1000;
}


function check_if_washer_open(washer_doc) {
    var cur_date = new Date(); // current time
    var day = cur_date.getDay();
    switch (day) {
        case 0:
            opening_time = washer_doc.data().opening_times.Sunday[0];
            closing_time = washer_doc.data().opening_times.Sunday[1];
            break;
        case 1:
            opening_time = washer_doc.data().opening_times.Monday[0];
            closing_time = washer_doc.data().opening_times.Monday[1];
            break;
        case 2:
            opening_time = washer_doc.data().opening_times.Tuesday[0];
            closing_time = washer_doc.data().opening_times.Tuesday[1];
            break;
        case 3:
            opening_time = washer_doc.data().opening_times.Wednesday[0];
            closing_time = washer_doc.data().opening_times.Wednesday[1];
            break;
        case 4:
            opening_time = washer_doc.data().opening_times.Thursday[0];
            closing_time = washer_doc.data().opening_times.Thursday[1];
            break;
        case 5:
            opening_time = washer_doc.data().opening_times.Friday[0];
            closing_time = washer_doc.data().opening_times.Friday[1];
            break;
        case 6:
            opening_time = washer_doc.data().opening_times.Saturday[0];
            closing_time = washer_doc.data().opening_times.Saturday[1];
            break;
    }
    if (opening_time == -1 || closing_time == -1) {
        return false;
    }
    opening_time = toFullTimestamp(cur_date, opening_time);
    closing_time = toFullTimestamp(cur_date, closing_time);
    if ((cur_date > opening_time) && (cur_date < closing_time)) {
        return true;
    }
    return false
}


// working hours functions



// function get_opening_hours_table(tag, washer) {
//     working_hours = '<table class="opening-hours-table" id="opening-hours-table">';
//     working_hours += '<tr id="Sunday" itemprop="openingHours" title="Open Sunday"><td>Sunday</td>';
//     working_hours += '<td class="opens">' + washer.working_hours.Sunday[0] + ':00</td><td>-</td>';
//     working_hours += '<td class="closes">' + washer.working_hours.Sunday[1] + ':00</td>';
//     working_hours += '</tr>';
//     working_hours += '<tr id="Monday" itemprop="openingHours" title="Open Monday"><td>Monday</td>';
//     working_hours += '<td class="opens">' + washer.working_hours.Monday[0] + ':00</td><td>-</td>';
//     working_hours += '<td class="closes">' + washer.working_hours.Monday[1] + ':00</td>';
//     working_hours += '</tr>';
//     working_hours += '<tr id="Tuesday" itemprop="openingHours" title="Open Tuesday"><td>Tuesday</td>';
//     working_hours += '<td class="opens">' + washer.working_hours.Tuesday[0] + ':00</td><td>-</td>';
//     working_hours += '<td class="closes">' + washer.working_hours.Tuesday[1] + ':00</td>';
//     working_hours += '</tr>';
//     working_hours += '<tr id="Wednesday" itemprop="openingHours" title="Open Wednesday"><td>Wednesday</td>';
//     working_hours += '<td class="opens">' + washer.working_hours.Wednesday[0] + ':00</td><td>-</td>';
//     working_hours += '<td class="closes">' + washer.working_hours.Wednesday[1] + ':00</td>';
//     working_hours += '</tr>';
//     working_hours += '<tr id="Thursday" itemprop="openingHours" title="Open Thursday"><td>Thursday</td>';
//     working_hours += '<td class="opens">' + washer.working_hours.Thursday[0] + ':00</td><td>-</td>';
//     working_hours += '<td class="closes">' + washer.working_hours.Thursday[1] + ':00</td>';
//     working_hours += '</tr>';
//     working_hours += '<tr id="Friday" itemprop="openingHours" title="Open Friday"><td>Friday</td>';
//     working_hours += '<td class="opens">' + washer.working_hours.Friday[0] + ':00</td><td>-</td>';
//     working_hours += '<td class="closes">' + washer.working_hours.Friday[1] + ':00</td>';
//     working_hours += '</tr>';
//     working_hours += '<tr id="Saturday" itemprop="openingHours" title="Open Saturday"><td>Saturday</td>';
//     working_hours += '<td class="opens">' + washer.working_hours.Saturday[0] + ':00</td><td>-</td>';
//     working_hours += '<td class="closes">' + washer.working_hours.Saturday[1] + ':00</td>';
//     working_hours += '</tr>';
//     working_hours += '</table>';
//     document.getElementById(tag).innerHTML = working_hours;
// }


// working hours functions


function f_get_opening_hours_table(washer_doc) {
    opening_times = '<table class="opening-hours-table" id="opening-hours-table">';
    if (washer_doc.data().opening_times.Sunday[0] != -1) {
        opening_times += '<tr id="Sunday" itemprop="openingHours" title="Open Sunday"><td>Sunday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Sunday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Sunday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Monday[0] != -1) {
        opening_times += '<tr id="Monday" itemprop="openingHours" title="Open Monday"><td>Monday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Monday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Monday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Tuesday[0] != -1) {
        opening_times += '<tr id="Tuesday" itemprop="openingHours" title="Open Tuesday"><td>Tuesday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Tuesday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Tuesday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Wednesday[0] != -1) {
        opening_times += '<tr id="Wednesday" itemprop="openingHours" title="Open Wednesday"><td>Wednesday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Wednesday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Wednesday[1] + '</td>';       
        opening_times += '</tr>';
    }

    if (washer_doc.data().opening_times.Thursday[0] != -1) {
        opening_times += '<tr id="Thursday" itemprop="openingHours" title="Open Thursday"><td>Thursday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Thursday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Thursday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Friday[0] != -1) {
        opening_times += '<tr id="Friday" itemprop="openingHours" title="Open Friday"><td>Friday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Friday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Friday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Saturday[0] != -1) {
        opening_times += '<tr id="Saturday" itemprop="openingHours" title="Open Saturday"><td>Saturday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Saturday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Saturday[1] + '</td>';
        opening_times += '</tr>';
    }
    opening_times += '</table>';
    document.getElementById("openorclosedTable").innerHTML = opening_times;
    // color_today();
}

// function checkOpeningTimes(washer) {
//     if (check_if_open(washer)) {
//         document.getElementById("openorclosed").innerHTML = '<p id="openClosedColor">working now</p>';
//         document.getElementById("openClosedColor").style.color = "green";
//     }
//     else {
//         document.getElementById("openorclosed").innerHTML = '<p id="openClosedColor">closed now</p>';
//         document.getElementById("openClosedColor").style.color = "red";
//     }
// }

function f_checkOpeningTimes(washer_doc) {
    if (check_if_washer_open(washer_doc)) {
        document.getElementById("openorclosed").innerHTML = '<p id="openClosedColor">working now</p>';
        document.getElementById("openClosedColor").style.color = "green";
    }
    else {
        document.getElementById("openorclosed").innerHTML = '<p id="openClosedColor">closed now</p>';
        document.getElementById("openClosedColor").style.color = "red";
    }
}


function color_today() {
    let date = new Date(); // current time
    let day = date.getDay();
    let table = document.getElementById("opening-hours-table")
    let rows = table.getElementsByTagName("tr");
    rows[day].style.color = '#FFC636';
}



async function f_display_washer_reviews(all_orders) {
    all_reviews = "";
    for (var j = 0; j < all_orders.length; j++) {
        if (all_orders[j].data().review_washer != null && all_orders[j].data().rating_washer != null) {
            const user_that_review = await all_orders[j].data().user.get();
            // here start block of review
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-6'>";
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-1'>";
            all_reviews += "</div>";
            all_reviews += "<div class='col-2'>";
            all_reviews += "<div class='profile_pic'><a href='#'><img class='rounded-circle-small' src=" + user_that_review.data().imageUrl + "></a></div>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-6'>";
            all_reviews += "<div class='location'>" + user_that_review.data().name + "</div>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-3'>";
            all_reviews += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src='../images/Star_yellow.png'>" + all_orders[j].data().rating_washer + "</div>";
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-3'>"
            all_reviews += '</div>';
            all_reviews += "<div class='col-9'>";
            all_reviews += "<div class='reviews_text'>" + all_orders[j].data().review_washer + "</div>";
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += "<div class='col-6'>";
            if (all_orders[j].data().laundry_pics != null) {
                all_reviews += "<img class='img-rounded-small' src=" + all_orders[j].data().laundry_pic + " alt='Mister Washer' aria-hidden='true'>";
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
    document.getElementById("my_reviews").innerHTML = all_reviews;
}
