async function display_new_order_for_user(orderID) {
    const order_doc = await promiseOrderLoaderById(orderID);
    const washer_doc = await promiseWasherLoaderById(order_doc.data().washer);
    sessionStorage.setItem("cur_order", orderID);
    order_block = '<div class= "order_pink">';
    var order_status = order_doc.data().status;
    if (order_status == "pending") {
        order_header = "Our washer recieved your order";
    }
    if (order_status == "process") {
        order_header = "Laundry is approved!";
    }
    if (order_status == "declined") {
        order_header = "Sorry...The washer can't take your laundry...";
    }
    order_block += "<div class='row'>"
    order_block += "<div class='header_24' style='text-align: center;'>" + order_header + "</div></div>";
    order_block += "<div class='row'><div class='col-1'></div><div class='col-10'><div class= 'order_white'><div class='col-1'></div>"; //row open div, col-10 open div, order white open div
    order_block += "<table style='margin-left:15%; margin-top:2%;'><tr><td><img class='rounded-circle-2' src='" + washer_doc.data().imageUrl + "' alt='profile_pic'></td><td><h4 class='header_44' style='margin-left: 10%;'>" + washer_doc.data().name + "</h4></td></tr></table>";
    var date = new Date(order_doc.data().due_to);
    var l_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" + date.getMinutes();
    } else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours() + ":" + minutes;
    order_block += "<table style='margin-left:15%; margin-top:3%;'>";
    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + l_date + '</h6></td></tr>';
    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + time + '</h6></td></tr>';
    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + order_doc.data().loads + '<class= "header_61"> Loads</h6></td></tr>';
    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + order_doc.data().wash_settings + '<class= "header_61"> Setting</h6></td></tr>';
    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + order_doc.data().properties + '<class= "header_61"> Service</h6></td></tr>';
    // order_block += '<tr><td style="text-align:center"><h6 class= "header_61"></h6><div class="small_headline_4">'+order_doc.data().comments+'<br/></div></tr>';
    cur_price = order_doc.data().price.toString() + " &#8362";
    order_block += '<tr><td><div class="small-box-2" style="margin-left: 40%; margin-top: 5%;">' + cur_price + '</div></td></tr>';
    if (order_doc.data().status != "pending") {
        order_block += '<tr><td style="text-align:center"><button class="phone_number">' + washer_doc.data().phone + '</button></td></tr>';
    } else {
        order_block += '<tr><td style="text-align:center; font-family:"Montserrat"">Phone will be displayed after ' + washer_doc.data().name.split(" ")[0] + '\'s approval</td></tr>';
    }
    order_block += "</table>";
    // order_block += "<button style='margin-top: 20%; margin-left: 31%;' class='button1' onclick='back_to_profile()'>Back to profile</button>";  
    order_block += "<div class='row'>"
    order_block += "<div class='col-1'></div>"
    order_block +=  "<div class='col-4'>"
    order_block += '<button id="process" value = "process" onclick="back_to_profile()" class= "button1">Back to Profile</button>';
    order_block += "</div>"
    order_block +=  "<div class='col-2'></div>"
    order_block +=  "<div class='col-4'>"
    order_block += '<button id="declined" value = "declined" onclick = "change_status_for_user(declined.value)" class= "red-btn">Cancel Order</button>';
    order_block += "<div class='col-1'></div>"
    order_block +="</div></div></div><div class='col-1'></div></div></div>"; //close of col-10, close of order white, close of all overlay div.
    document.getElementById("user_order").innerHTML = order_block;
}


async function display_new_order_for_washer(orderID) {
    sessionStorage.setItem("cur_order", orderID);
    const order_doc = await promiseOrderLoaderById(orderID);
    const user_doc = await promiseUserLoaderById(order_doc.data().user);
    order_block = '<div class= "order_pink">';
    var order_status = order_doc.data().status;
    if (order_status == "pending") {
        order_header = "You received new order!";
    }
    if (order_status == "process") {
        order_header = "laundry in process";
    }
    order_block += "<div class='row'>"
    order_block += "<div class='header_24' style='margin-left:-1%;'>" + order_header + "</div></div>";
    order_block += "<div class='row'><div class='col-1'></div><div class='col-10'><div class= 'order_white' style='margin-left: auto; margin-right:auto;'>"; //row open div, col-10 open div, order white open div
    order_block += "<table style='margin-left:10%; margin-top:-2%;'><tr><td><img class='rounded-circle-2' style='margin-top: 15%;' src='" + user_doc.data().imageUrl + "' alt='profile_pic'></td><td><h4 class='header_44' style='margin-left: 10%;'>" + user_doc.data().name + "</h4></td></tr></table>";
    var date = new Date(order_doc.data().due_to);
    var l_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" + date.getMinutes();
    } else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours() + ":" + minutes;
    order_block += "<table style='margin-left: auto; margin-right:auto; margin-top:-4%;'>";
    
    const rating = await getRatingFromDoc(user_doc, 'user');
    if (rating > 0) {
        console.log(rating);
       order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + rating + '<img src="../../images/Star_yellow.png" class="rating-star"></h6></td></tr>';
    }

    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + l_date + '</h6></td></tr>';
    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + time + '</h6></td></tr>';
    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + order_doc.data().loads + '<class= "header_61"> Loads</h6></td></tr>';
    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + order_doc.data().wash_settings + '<class= "header_61"> Setting</h6></td></tr>';
    order_block += '<tr><td style="text-align:center"><h6 class= "header_61">' + order_doc.data().properties + '<class= "header_61"> Service</h6></td></tr>';
    // order_block += '<tr><td style="text-align:center"><h6 class= "header_61"></h6><div class="small_headline_4">'+order_doc.data().comments+'<br/></div></tr>';
    cur_price = order_doc.data().price.toString() + " &#8362";
    order_block += '<tr><td><div class="small-box-2" style="margin-left: 40%; margin-top: 5%;">' + cur_price + '</div></td></tr>';
    order_block += '<tr><td style="text-align:center"><button class="phone_number">' + user_doc.data().phone + '</button></td></tr>';
    order_block += "</table></div>";
    order_block += "<div class='row'>"
    if (order_status == "pending") {
        order_block += "<div class='col-1'></div>"
        order_block +=  "<div class='col-4'>"
        order_block += '<button id="process" value = "process" onclick = "change_status_for_washer(process.value)" class= "button1">Confirm</button>';
        order_block += "</div>"
        order_block +=  "<div class='col-2'></div>"
        order_block +=  "<div class='col-4'>"
        order_block += '<button id="declined" value = "declined" onclick = "change_status_for_washer(declined.value)" class= "red-btn">Decline</button>';
        order_block += "<div class='col-1'></div>"
        order_block += "</div>"
    } else {
        order_block += "<div class='col-1'></div>"
        order_block +=  "<div class='col-4'>"
        order_block += '<button id="finished" value = "finished" onclick = "change_status_for_washer(finished.value)" class= "button1">Finish</button>';
        order_block += "</div>"
        order_block +=  "<div class='col-2'></div>"
        order_block +=  "<div class='col-4'>"
        order_block += '<button id="declined" value = "declined" onclick = "change_status_for_washer(declined.value)" class= "red-btn">Decline</button>';  
        order_block += "<div class='col-1'></div>"
        order_block += "</div>"
    }
    // order_block += "<button style='margin-left: 27%; margin-top: 9%;' class='button1' onclick='back_to_profile()'>Back to profile</button>";  
    order_block += "</div></div><div class='col-1'></div></div></div>"; //close of col-10, close of order white, close of all overlay div.
    document.getElementById("washer_order").innerHTML = order_block;
}

async function back_to_profile() {
    if (window.location.pathname == "/html/user_flow/user_profile_final.html") {
        off();
    } else {
        window.location.href = "../../html/user_flow/user_profile_final.html";
    }
}

async function change_status_for_washer(new_status) {
    var orderID = sessionStorage.getItem("cur_order");
    order_update = {
        status: new_status
    }
    await setOrderDetails(order_update, orderID);
    var washerID = sessionStorage.getItem("signed_in_washer");
    await insert_orders_blocks_of_washer("in_process_orders", washerID, "processing"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    await insert_orders_blocks_of_washer("finished_orders", washerID, "finished"); // function in order_blocks_user.js that insert all "finished" into div "finished_orders" 
}

async function change_status_for_user(new_status) {
    console.log(window.location.pathname)
    var orderID = sessionStorage.getItem("cur_order");
    order_update = {status: new_status}
    await setOrderDetails(order_update, orderID);
    if (window.location.pathname == "/html/user_flow/user_profile_final.html") {
    var userID = sessionStorage.getItem("current_user_id"); // come from getUserToken() in the page before (user_registresion/place_order/header_bar)
    await insert_orders_blocks_of_user("in_process_orders", userID, "processing"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    await insert_orders_blocks_of_user("finished_orders", userID, "finished"); // function in order_blocks_user.js that insert all "finished" into div "finished_orders"
    }
}

// TO FIX - sent the value (orderID) to the block - and not the blockID 
// currently the value come with the famous tab problem
async function display_order_status(orderID) {
    display_new_order_for_washer(orderID);
    document.getElementById("overlay_washer_order").style.display = "block";
}


function close_order() {
    document.getElementById("overlay_washer_order").style.display = "none";
}