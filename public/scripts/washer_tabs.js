//*************** inner js help functions  ***************//

/**
 * return new time stamp of the currect date and hour
 * @param {Date} fullDate full Date object
 * @param {String} time time in format "hh:mm"-"10:00"
 * @returns 
 */
function toFullTimestamp(fullDate, time) {
    year = fullDate.getFullYear();
    month = fullDate.getMonth();
    day = fullDate.getDate();
    if (time.length == 4) {
        hour = time.substring(0, 1);
    } else {
        hour = time.substring(0, 2);
    }
    minute = time.substring(3, 5);
    second = "00";
    return new Date(Date.UTC(year, month, day, hour - 3, minute, second));
}


//*************** functions that called into html by washer_details.js and place_order.js  ***************//

/**
 * check if the washer is open now, and return green "working now" if he is and red "closed now" if not
 * @param {washer Object} washer_doc the washer  
 */
function f_checkOpeningTimes(washer_doc) {
    if (check_if_washer_open_now(washer_doc.data().opening_times)) {
        document.getElementById("openorclosed").innerHTML = '<p id="openClosedColor">working now</p>';
        document.getElementById("openClosedColor").style.color = "green";
        document.getElementById("openClosedColor").style.fontSize = "20px";
        document.getElementById("openClosedColor").style.fontFamily = "Montserrat";
    } else {
        document.getElementById("openorclosed").innerHTML = '<p id="openClosedColor">closed now</p>';
        document.getElementById("openClosedColor").style.color = "red";
        document.getElementById("openClosedColor").style.fontSize = "20px";
        document.getElementById("openClosedColor").style.fontFamily = "Montserrat";


    }
}


/**
 * display all the opening times table of the washer
 * @param {washer object} washer_doc the washer 
 */
function f_get_opening_hours_table(washer_doc) {
    opening_times = '<table style="font-size: 20px;" class="opening-hours-table" id="opening-hours-table">';
    if (washer_doc.data().opening_times.Sunday !== undefined) {
        opening_times += '<tr id="Sunday" itemprop="openingHours" title="Open Sunday"><td>Sunday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Sunday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Sunday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Monday !== undefined) {
        opening_times += '<tr id="Monday" itemprop="openingHours" title="Open Monday"><td>Monday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Monday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Monday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Tuesday !== undefined) {
        opening_times += '<tr id="Tuesday" itemprop="openingHours" title="Open Tuesday"><td>Tuesday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Tuesday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Tuesday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Wednesday !== undefined) {
        opening_times += '<tr id="Wednesday" itemprop="openingHours" title="Open Wednesday"><td>Wednesday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Wednesday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Wednesday[1] + '</td>';
        opening_times += '</tr>';
    }

    if (washer_doc.data().opening_times.Thursday !== undefined) {
        opening_times += '<tr id="Thursday" itemprop="openingHours" title="Open Thursday"><td>Thursday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Thursday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Thursday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Friday !== undefined) {
        opening_times += '<tr id="Friday" itemprop="openingHours" title="Open Friday"><td>Friday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Friday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Friday[1] + '</td>';
        opening_times += '</tr>';
    }
    if (washer_doc.data().opening_times.Saturday !== undefined) {
        opening_times += '<tr id="Saturday" itemprop="openingHours" title="Open Saturday"><td>Saturday</td>';
        opening_times += '<td class="opens">' + washer_doc.data().opening_times.Saturday[0] + '</td><td>-</td>';
        opening_times += '<td class="closes">' + washer_doc.data().opening_times.Saturday[1] + '</td>';
        opening_times += '</tr>';
    }
    opening_times += '</table>';
    document.getElementById("openorclosedTable").innerHTML = opening_times;
}


/**
 * display inner blocks of reviews on washer
 * @param {array of orders objects} all_orders all reviews on specific washer with status "finished"
 */
async function f_display_washer_reviews(washerID) {
    const all_orders = await promiseOrderArrayByWasherIdAndStatus(washerID, "finished"); // get all the people that reviewed this washer from orders
    all_reviews = "";
    for (var j = 0; j < all_orders.length; j++) {
        if (all_orders[j].data().review_washer != null && all_orders[j].data().rating_washer != null &&
            all_orders[j].data().review_user != null && all_orders[j].data().rating_user != null) {
            const user_that_review = await promiseUserLoaderById(all_orders[j].data().user);
            // here start block of review
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-6'>";
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-1'>";
            all_reviews += "</div>";
            all_reviews += "<div class='col-2'>";
            all_reviews += "<div class='profile_pic'><a href='#'><img class='rounded-circle-xs' src=" + user_that_review.data().imageUrl + "></a></div>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-6'>";
            all_reviews += "<div class='location'>" + user_that_review.data().name + "</div>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-3'>";
            all_reviews += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src='../../images/Star_yellow.png'>" + all_orders[j].data().rating_washer + "</div>";
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
            all_reviews += '<hr style="border: 1px solid #000000">';
        }
    }
    if (all_reviews == "") {
        all_reviews += "<h4 class='header_49'> There are no reviews yet </h4>";
        all_reviews += '<img class= "ironing-person-2" src="/images/ironing_person.svg">'
    }
    all_reviews += '</div>';
    document.getElementById("my_reviews").innerHTML = all_reviews;
}

/**
 * return the washer details block - as model name, capacity and more
 * @param {washer object} washer_doc the washer 
 */
function f_display_washer_details(washer_doc) {
    let details_table = "<table class = machine_details>";
    details_table += "<tr><tr><th>Model Name</th></tr><tr>";
    details_table += "<td>" + washer_doc.data().model_name + "</td></tr><tr>";
    details_table += "<tr><tr><th>Capacity</th></tr><tr>";
    details_table += "<td>" + washer_doc.data().capacity + " KG</td></tr><tr>";
    details_table += "<tr><tr><th>Purchasing Year</th></tr><tr>";
    details_table += "<td>" + washer_doc.data().year_purchased + "</td></tr><tr>";
    details_table += "<tr><tr><th>Special Services</th></tr><tr>";
    if (washer_doc.data().properties == "Ironing") {
        details_table += "<tr><td><img src='../../images/check.png' alt=''>Ironing</td></tr>";
    }
    if (washer_doc.data().properties == "Door2door") {
        details_table += "<tr><td><img src='../../images/check.png' alt=''>Door 2 Door</td></tr>";
    }
    if (washer_doc.data().properties == "Dryer") {
        details_table += "<tr><td><img src='../../images/check.png' alt=''>Hanging Drying</td></tr>";
    }
    details_table += "</tr></table>";
    document.getElementById("washer_details").innerHTML = details_table;
}