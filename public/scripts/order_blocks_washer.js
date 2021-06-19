/**
 * 
 * @param {order object} order 
 * @returns long string of order
 */
async function get_order_block_of_washer(order) {
    const user_doc = await order.data().user.get()
    console.log("user_doc:" ,user_doc.data().name)
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src='" + user_doc.data().imageUrl + "' alt='netzer'> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ user_doc.data().name +"</th></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";

    let unix_timestamp = order.data().due_to['seconds']
    var date = new Date(unix_timestamp * 1000);
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = day + '/' + month;

    block += "<tr><td>"+ formattedTime +"</td><td>"+ order.data().price +" nis</td></tr>"
    switch (order.data().status) {
        case 'pending':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Accept </button></th></tr>";
          break;
        case 'process':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Finish </button></th></tr>";
          break;
        case 'finished':
            if (order.data().review_on_user == "") {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Review </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Change Review </button></th></tr>";
            }
        break;
    }
    block += "</table>";
    block += "</div>";
    block += "</div>";
    return block;
}


async function insert_orders_blocks_of_washer(tag, washerID, status) {
    all_orders = await promiseOrderArrayByWasherIdAndStatus(washerID, status);
    let all_blocks = "";
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
            all_blocks += await get_order_block_of_washer(all_orders[i]);
    }
    document.getElementById(tag).innerHTML = all_blocks;
}

async function load_order_blocks_of_washer(washerID) {
    // const washer_doc = await promiseWasherLoaderById(washerID);
    // console.log(washer_doc);
    // insert_orders_blocks_of_user("in_process_orders", washer_doc, "processing");
    insert_orders_blocks_of_washer("in_process_orders", washerID, "finished");
    insert_orders_blocks_of_washer("finished_orders", washerID, "process");
    
}

clicks = 0
function get_washer_working_hours(washer_doc){
    oldDays = "<table id='working-hours'><tr><td>Day</td><td>From</td><td>To</td><td>Keep weekly</td></tr>"
    if (washer_doc.data().opening_times == {}){
        clicks = 1
        oldDays += "<tr><td><div class='set-date'><select id='day"+ clicks + "'>"
        oldDays += "<option value='Sunday'>Sunday</option>"
        oldDays += "<option value='Monday'>Monday</option>"
        oldDays += "<option value='Tuesday'>Tuesday</option>"
        oldDays += "<option value='Wednesday'>Wednesday</option>"
        oldDays += "<option value='Thursday'>Thursday</option>"
        oldDays += "<option value='Friday'>Friday</option>"
        oldDays += "<option value='Satuday'>Saturday</option>"
        oldDays += "<option value='"+ day + "' selected>" + day + "</option></select></div></td>"
        oldDays += "<td><input class='set-time' type='time' id='startTime"+ clicks + "' value='" + hours[0] + "'></td>"
        oldDays += "<td><input class='set-time' type='time' id='endTime"+ clicks + "' value='" + hours[1] + "'></td>"
        oldDays += "<td><input id='cbx" + clicks +"' type='checkbox'/><label class='cbx"+clicks+"' for='cbx"+clicks+"'><div class='flip'><div class='front'></div><div class='back'><svg width='16' height='14' viewBox='0 0 16 14'><path d='M2 8.5L6 12.5L14 1.5'></path></svg></div></div></label></td></tr></tables>"
    }
    else{
    for(const [day, hours] of Object.entries(washer_doc.data().opening_times)) {
        clicks += 1
        oldDays += "<tr><td><div class='set-date'><select id='day"+ clicks + "'>"
        oldDays += "<option value='Sunday'>Sunday</option>"
        oldDays += "<option value='Monday'>Monday</option>"
        oldDays += "<option value='Tuesday'>Tuesday</option>"
        oldDays += "<option value='Wednesday'>Wednesday</option>"
        oldDays += "<option value='Thursday'>Thursday</option>"
        oldDays += "<option value='Friday'>Friday</option>"
        oldDays += "<option value='Satuday'>Saturday</option>"
        oldDays += "<option value='"+ day + "' selected>" + day + "</option></select></div></td>"
        oldDays += "<td><input class='set-time' type='time' id='startTime"+ clicks + "' value='" + hours[0] + "'></td>"
        oldDays += "<td><input class='set-time' type='time' id='endTime"+ clicks + "' value='" + hours[1] + "'></td>"
        oldDays += "<td><input id='cbx" + clicks +"' type='checkbox'/><label class='cbx"+clicks+"' for='cbx"+clicks+"'><div class='flip'><div class='front'></div><div class='back'><svg width='16' height='14' viewBox='0 0 16 14'><path d='M2 8.5L6 12.5L14 1.5'></path></svg></div></div></label></td></tr></tables>"
    }
}
    document.getElementById("old-days").innerHTML = oldDays;
}

function duplicate() {
    if(clicks > 6){
        return
    }
    clicks += 1
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
}


var working_times = {};
function saveHour() {
    document.getElementById("demo").innerHTML = "Saved!";
    for (var i = 0; i < clicks; i++){
        if (i==0){
            day1 = document.getElementById("day1").value;
            startHour1 = document.getElementById("startTime1").value;
            endHour1 = document.getElementById("endTime1").value;
            working_times[day1] = [startHour1, endHour1];
        }
        if (i == 1){
            day2 = document.getElementById("day2").value;
            startHour2 = document.getElementById("startTime2").value;
            endHour2 = document.getElementById("endTime2").value;
            working_times[day2] = [startHour2, endHour2];
        }
        if (i == 2){
            day3 = document.getElementById("day3").value;
            startHour3 = document.getElementById("startTime3").value;
            endHour3 = document.getElementById("endTime3").value;
            working_times[day3] = [startHour3, endHour3];
        }
        if (i == 3){
            day4 = document.getElementById("day4").value;
            startHour4 = document.getElementById("startTime4").value;
            endHour4 = document.getElementById("endTime4").value;
            working_times[day4] = [startHour4, endHour4];
        }
        if (i == 4){
            day5 = document.getElementById("day5").value;
            startHour5 = document.getElementById("startTime5").value;
            endHour5 = document.getElementById("endTime5").value;
            working_times[day5] = [startHour5, endHour5];
        }
        if (i == 5){
            day6 = document.getElementById("day6").value;
            startHour6 = document.getElementById("startTime6").value;
            endHour6 = document.getElementById("endTime6").value;
            working_times[day6] = [startHour6, endHour6];
        }
        if (i == 6){
            day7 = document.getElementById("day7").value;
            startHour7 = document.getElementById("startTime7").value;
            endHour7 = document.getElementById("endTime7").value;
            working_times[day7] = [startHour7, endHour7];
        }
    }
    console.log(working_times);
    setOrderDetails(working_times, washerID);
    setWasherOpenTimes(working_times, washerId);
}
