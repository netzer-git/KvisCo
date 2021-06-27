
function get_order_block_of_washer(order) {
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src=" + order.washer.profile_pic + " alt=''> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ order.washer.name +"</th></tr>";
    block += "<tr><td scope='col' colspan='2'>"+ order.orderID +"</td></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";
    block += "<tr><td>"+ order.dueTO +"</td><td>"+ order.Price +" nis</td></tr>"
    switch (order.status) {
        case 'in_process':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Watch detailes </button></th></tr>";
          break;
        case 'finished':
            if (order.review_on_washer == "") {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Review </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Order again </button></th></tr>";
            }
        break;
    }
    block += "</table>";
    block += "</div>";
    block += "</div>";
    return block
}

function get_order_block_of_user(order) {
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src=" + order.data().user.imageUrl + " alt='netzer'> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ order.data().user.name +"</th></tr>";
    block += "<tr><td scope='col' colspan='2'>"+ order.orderID +"</td></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";
    block += "<tr><td>"+ order.dueTO +"</td><td>"+ order.Price +" nis</td></tr>"
    switch (order.status) {
        case 'in_process':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Watch detailes </button></th></tr>";
          break;
        case 'finished':
            if (order.review_on_user == "") {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Review </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Watch review </button></th></tr>";
            }
        break;
    }
    block += "</table>";
    block += "</div>";
    block += "</div>";
    return block
}



function insert_orders_blocks_of_washer(tag, washerID, status) {
    const washer_doc = await promiseWasherLoaderById(washerID);
    all_orders = promiseOrderArrayByWasherIdAndStatus(washerID, status);
    all_blocks = "";
    // to fix?
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
            all_blocks += get_order_block_of_washer(all_orders[i]);
    }
    document.getElementById(tag).innerHTML = all_blocks;
}


function insert_orders_blocks_of_user(tag, user, status) {
    all_orders = promiseOrderArrayByWasherIdAndStatus(washerID, status);
    all_blocks = "";
    // to fix?
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
        if (all_orders[i].user == user && all_orders[i].status == status) {
            all_blocks += get_order_block_of_user(all_orders[i]);
        }
    }
    // all_blocks += "</div>";
    document.getElementById(tag).innerHTML = all_blocks;
}

var clicks = 1
function duplicate() {
    if(clicks > 6){
        return
    }
    var table = document.getElementById("working-hours");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
    cell1.innerHTML = "<div class='set-date'><select id='day"+clicks+"'><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></div>";
    cell2.innerHTML = "<input class='set-time' type='time' id='startTime"+clicks+"' value='08:00'>";
    cell3.innerHTML = "<input class='set-time' type='time' id='endTime"+clicks+"' value='08:00'>";
    cell4.innerHTML = "<input id='cbx"+clicks+"' type='checkbox'/><label class='cbx"+clicks+"' for='cbx"+clicks+"'><div class='flip'><div class='front'></div><div class='back'><svg width='16' height='14' viewBox='0 0 16 14'><path d='M2 8.5L6 12.5L14 1.5'></path></svg></div></div></label>";
    clicks += 1
}


async function load_order_blocks_of_washer(washerID) {
    const washer_doc = await promiseWasherLoaderById(washerID);
    console.log(washer_doc);
    // insert_orders_blocks_of_user("in_process_orders", washer_doc, "processing");
    insert_orders_blocks_of_user("in_process_orders", washerID, "process");
}



var working_times = {};
function saveHour() {
    day1 = document.getElementById("day").value;
    startHour1 = document.getElementById("startTime").value;
    endHour1 = document.getElementById("endTime").value;
    working_times[day1] = [startHour1, endHour1];
    document.getElementById("demo").innerHTML = "Saved!";
    for (var i = 0; i < clicks; i++){
        if (i == 0){
            day2 = document.getElementById("day1").value;
            startHour2 = document.getElementById("startTime1").value;
            endHour2 = document.getElementById("endTime1").value;
            working_times[day2] = [startHour2, endHour2];
        }
        if (i == 1){
            day3 = document.getElementById("day2").value;
            startHour3 = document.getElementById("startTime2").value;
            endHour3 = document.getElementById("endTime2").value;
            working_times[day3] = [startHour3, endHour3];
        }
        if (i == 2){
            day4 = document.getElementById("day3").value;
            startHour4 = document.getElementById("startTime3").value;
            endHour4 = document.getElementById("endTime3").value;
            working_times[day4] = [startHour2, endHour2];
        }
        if (i == 3){
            day5 = document.getElementById("day4").value;
            startHour5 = document.getElementById("startTime4").value;
            endHour5 = document.getElementById("endTime4").value;
            working_times[day5] = [startHour5, endHour5];
        }
        if (i == 4){
            day6 = document.getElementById("day5").value;
            startHour6 = document.getElementById("startTime5").value;
            endHour6 = document.getElementById("endTime5").value;
            working_times[day6] = [startHour6, endHour6];
        }
        if (i == 5){
            day7 = document.getElementById("day6").value;
            startHour7 = document.getElementById("startTime6").value;
            endHour7 = document.getElementById("endTime6").value;
            working_times[day7] = [startHour7, endHour7];
        }
    }
    console.log(working_times);
}
