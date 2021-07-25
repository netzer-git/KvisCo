async function change_status(new_status) {
    var orderID = sessionStorage.getItem("cur_order");
    order_update = { status: new_status }
    await setOrderDetails(order_update, orderID);
    var washerID = sessionStorage.getItem("signed_in_washer");
    await insert_orders_blocks_of_washer("in_process_orders", washerID, "processing"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    await insert_orders_blocks_of_washer("finished_orders", washerID, "finished");   // function in order_blocks_user.js that insert all "finished" into div "finished_orders" 
}



async function display_new_order_for_washer(orderID) {
    sessionStorage.setItem("cur_order", orderID);
    const order_doc = await promiseOrderLoaderById(orderID);
    const user_doc = await promiseUserLoaderById(order_doc.data().user);
    var order_status = order_doc.data().status;
    order_block = '<div class= "order_pink">';
    if (order_status == "pending") {
        order_block += '<table><tr><h2 class="header_24">YOU RECIEVED A NEW ORDER</h2></tr>';
    }
    else {
        order_block += '<table><tr><h2 class="header_24">LAUNDRY IN PROCESS</h2></tr>';
    }
    order_block += '<tr><table class= "order_white">';
    order_block += '<tr><td><img class="rounded-circle" src= "' + user_doc.data().imageUrl + '" alt="profile_pic"></td><td><h4>' + user_doc.data().name + '</h4></td></tr>';
    var date = new Date(order_doc.data().due_to.seconds * 1000);
    var l_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" + date.getMinutes();
    }
    else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours() + ":" + minutes;
    order_block += '<tr><td><div class= "header_61">Date</div></td><td><div class= "header_61">' + l_date + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Drop off hour</div></td><td><div class= "header_61">' + time + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Loads</div></td><td><div class= "header_61">' + order_doc.data().loads + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Wash Settings</div></td><td><div class= "header_61">' + order_doc.data().wash_settings + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Special Services</div></td><td><div class= "header_61">' + order_doc.data().property + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Notes:</div><div class="small_headline_4">' + order_doc.data().comments + '<br/> </div></tr>';
    cur_price = order_doc.data().price.toString() + " NIS"
    order_block += '<tr><th><div class="small-box-2">' + cur_price + '</div></th><th><button class="phone_number">050-4447755</button></td></tr>';
    order_block += '</table>';
    if (order_status == "pending") {
        order_block += '<tr><td><button id="process" value = "process" onclick = "change_status(process.value)" class= "yellow_button_3">Confirm</button></td>';
        order_block += '<td><button id="declined" value = "declined" onclick = "change_status(declined.value)" class= "red_button">decline</button></td></tr>';
    }
    else {
        order_block += '<tr><td><button id="finished" value = "finished" onclick = "change_status(finished.value)" class= "yellow_button_3">Finish</button></td>';
        order_block += '<td><button id="declined" value = "declined" onclick = "change_status(declined.value)" class= "red_button">decline</button></td></tr>';
    }
    order_block += '</table>';
    document.getElementById("washer_order").innerHTML = order_block;
}



var block_num = 0;

/**
 * create pink order-blocks to the washer page with the currect button and save in the button functions that display overlays according to the status 
 * status pending/process - button overlay display_order_status(orderID) - locate in new_order.js
 * status finished - button overlay display_review_on_user_overlay(orderID) - locate in review_on_user.js
 * @param {order object} order 
 * @returns long string of order
 */
async function get_order_block_of_washer(order) {
    const user_doc = await promiseUserLoaderById(order.data().user);
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<div class='flip_box' onclick='flip(event)'>"
    block += '<div class="front" id="front"></div>';
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src='" + user_doc.data().imageUrl + "' alt='profile_pic'></th></tr>";
    block += "<tr><th scope='col' colspan='2'>" + user_doc.data().name + "</th></tr>";
    var date = new Date(order.data().due_to.seconds * 1000);
    var formattedTime = date.getDate() + '/' + (date.getMonth() + 1);
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" + date.getMinutes();
    }
    else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours() + ":" + minutes;
    block += "<tr><td>" + formattedTime + "</td><td>" + order.data().price + " &#8362</td></tr>"
    switch (order.data().status) {
        case 'pending':
        case 'process':
            block += "</tr><th scope='col' colspan='2'><button id = block_num_" + block_num + " value='" + order.id + "' onclick= 'display_order_status(block_num_" + block_num + ".value)' class='button1'> Open  </button></th></tr>";
            break;
        case 'finished':
            if (order.data().review_user == null) {
                block += "</tr><th scope='col' colspan='2'><button id=block_num_" + block_num + " value='" + order.id + "' onclick= 'display_review_on_user_overlay(block_num_" + block_num + ".value)' class='button1'> Review </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button id = block_num_" + block_num + " value='" + order.id + "' onclick= 'display_review_on_user_overlay(block_num_" + block_num + ".value)' class='button1'> Change Review </button></th></tr>";

            }
            break;
    }
    block_num++;
    block += '<div class="back" id="back"></div>';
    block += "</table>";
    block += "</div>";
    block += "</div>";
    block += "</div>";
    return block;
}


async function insert_orders_blocks_of_washer(tag, washerID, status) {
    if (status == "process") {
        var all_orders = await promiseOrderArrayByWasherIdAndStatus(washerID, "processing");
    }
    else {
        var all_orders = await promiseOrderArrayByWasherIdAndStatus(washerID, status);
    }
    let all_blocks = "";
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
        all_blocks += await get_order_block_of_washer(all_orders[i]);
    }
    document.getElementById(tag).innerHTML = all_blocks;
}


async function flip(event) {
    var orderID = 'S9QrV8c1QihaP76iFrIW';
    const order_doc = await promiseOrderLoaderById(orderID);
    var element = event.currentTarget;
    if (element.className === "flip_box") {
        if (element.style.transform == "rotateY(180deg)") {
            element.style.transform = "rotateY(0deg)";
            get_order_block_of_washer(order_doc)
        }
        else {
            element.style.transform = "rotateY(180deg)";
            show_back(order_doc)
        }
    }
};

async function show_front() {

    document.getElementById("front").innerHTML = front;
}

async function show_back(order_doc) {
    const user_doc = await promiseUserLoaderById(order_doc.data().user);
    var order_status = order_doc.data().status;
    order_block = '<div class= "order_pink">';
    if (order_status == "pending") {
        order_block += '<table><tr><h2 class="header_24">YOU RECIEVED A NEW ORDER</h2></tr>';
    }
    else {
        order_block += '<table><tr><h2 class="header_24">LAUNDRY IN PROCESS</h2></tr>';
    }
    order_block += '<tr><table class= "order_white">';
    order_block += '<tr><td><img class="rounded-circle" src= "' + user_doc.data().imageUrl + '" alt="profile_pic"></td><td><h4>' + user_doc.data().name + '</h4></td></tr>';
    var date = new Date(order_doc.data().due_to.seconds * 1000);
    var l_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" + date.getMinutes();
    }
    else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours() + ":" + minutes;
    order_block += '<tr><td><div class= "header_61">Date</div></td><td><div class= "header_61">' + l_date + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Drop off hour</div></td><td><div class= "header_61">' + time + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Loads</div></td><td><div class= "header_61">' + order_doc.data().loads + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Wash Settings</div></td><td><div class= "header_61">' + order_doc.data().wash_settings + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Special Services</div></td><td><div class= "header_61">' + order_doc.data().property + '</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Notes:</div><div class="small_headline_4">' + order_doc.data().comments + '<br/> </div></tr>';
    cur_price = order_doc.data().price.toString() + " NIS"
    order_block += '<tr><th><div class="small-box-2">' + cur_price + '</div></th><th><button class="phone_number">050-4447755</button></td></tr>';
    order_block += '</table>';
    if (order_status == "pending") {
        order_block += '<tr><td><button id="process" value = "process" onclick = "change_status(process.value)" class= "yellow_button_3">Confirm</button></td>';
        order_block += '<td><button id="declined" value = "declined" onclick = "change_status(declined.value)" class= "red_button">decline</button></td></tr>';
    }
    else {
        order_block += '<tr><td><button id="finished" value = "finished" onclick = "change_status(finished.value)" class= "yellow_button_3">Finish</button></td>';
        order_block += '<td><button id="declined" value = "declined" onclick = "change_status(declined.value)" class= "red_button">decline</button></td></tr>';
    }
    order_block += '</table>';
    document.getElementById("back").innerHTML = order_block;
}


async function show_blocks() {
    var washerID = "5IMy2kMSbheOriFPxqKmKTNWOJ92"
    await insert_orders_blocks_of_washer("in_process_orders", washerID, "processing"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    await insert_orders_blocks_of_washer("finished_orders", washerID, "finished");   // function in order_blocks_user.js that insert all "finished" into div "finished_orders" 
}