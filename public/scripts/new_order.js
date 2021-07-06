
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
    order_block += '<tr><td><img class="rounded-circle" src= "' + user_doc.data().imageUrl + '" alt="profile_pic"></td><td><h4>'+user_doc.data().name+'</h4></td></tr>';
    var date = new Date(order_doc.data().due_to.seconds*1000);
    var l_date = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" +date.getMinutes();
    }
    else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours()+ ":" +minutes;
    order_block += '<tr><td><div class= "header_61">Date</div></td><td><div class= "header_61">'+l_date+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Drop off hour</div></td><td><div class= "header_61">'+time+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Loads</div></td><td><div class= "header_61">'+order_doc.data().loads+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Wash Settings</div></td><td><div class= "header_61">'+order_doc.data().wash_settings+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Special Services</div></td><td><div class= "header_61">'+order_doc.data().property+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Notes:</div><div class="small_headline_4">'+order_doc.data().comments+'<br/> </div></tr>';
    cur_price = order_doc.data().price.toString() + " &#8362"  
    order_block += '<tr><th><div class="small-box-2">'+cur_price+'</div></th><th><button class="phone_number">050-4447755</button></td></tr>';
    order_block +='</table>';
    if (order_status == "pending") {
        order_block += '<tr><td><button id="process" value = "process" onclick = "change_status(process.value)" class= "yellow_button_3">Confirm</button></td>';
        order_block += '<td><button id="declined" value = "declined" onclick = "change_status(declined.value)" class= "red_button">decline</button></td></tr>';    
    }
    else {
        order_block += '<tr><td><button id="finished" value = "finished" onclick = "change_status(finished.value)" class= "yellow_button_3">Finish</button></td>';
        order_block += '<td><button id="declined" value = "declined" onclick = "change_status(declined.value)" class= "red_button">decline</button></td></tr>';  
    }
    order_block +='</table>';
    document.getElementById("washer_order").innerHTML = order_block;
}


// async function display_new_order_for_washer(orderID) {
//     sessionStorage.setItem("cur_order", orderID);
//     const order_doc = await promiseOrderLoaderById(orderID);
//     const user_doc = await promiseUserLoaderById(order_doc.data().user);
//     var order_status = order_doc.data().status;
//     if (order_status == "pending") {
//         block += '<h2 class="header_24">YOU RECIEVED A NEW ORDER</h2>';
//     }
//     else {
//         block += '<h2 class="header_24">LAUNDRY IN PROCESS</h2>';
//     }
//     block = "<div class='col-lg-4'>";
//     // block += '<div class="overlay_review"><div id="user_review_block"></div></div>';
//     block += "<div class='col_with_padd'>";
//     block += "<table class='Background_box_open'>";
//     block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src='" + user_doc.data().imageUrl + "' alt='profile_pic'></th></tr>";
//     block += "<tr><th scope='col' colspan='2'>" + user_doc.data().name + "</th></tr>";
//     var date = new Date(order_doc.data().due_to.seconds*1000);
//     var formattedTime = date.getDate() + '/' + (date.getMonth()+1);
//     if (date.getMinutes().toString().length <= 1) {
//         var minutes = "0" +date.getMinutes();
//     }
//     else {
//         var minutes = date.getMinutes();
//     }
//     var time = date.getHours()+ ":" +minutes;
//     // block += "<tr><td>"+ formattedTime + "  " + time + "</td><tr>"
//     // block += order_doc.data().price +" &#8362</td></tr>"
//     block += "<tr><td>"+ formattedTime +"</td>"
//     block += "<td>"+ order_doc.data().price +" &#8362</td></tr>"
//     block += "<tr><td>"+ time + "</td>"
//     block += "<td>"+ order_doc.data().loads + "loads</td></tr>"
//     block += "<tr><td scope='col' colspan='2'>"+ order_doc.data().wash_settings + " services</td><tr>"
//     block += "<tr><td scope='col' colspan='2'>"+ order_doc.data().property + " special property</td><tr>"
//     block += '<tr><td><div class= "header_61">Notes:</div><div class="small_headline_4">'+order_doc.data().comments+'<br/> </div></tr>';
//     block += "</table>";
//     if (order_status == "pending") {
//         block += '<button id="process" value = "process" onclick = "change_status(process.value)" class= "yellow_button_3">Confirm</button>';
//         block += '<button id="declined" value = "declined" onclick = "change_status(declined.value)" class= "red_button">decline</button>';    
//     }
//     else {
//         block += '<button id="finished" value = "finished" onclick = "change_status(finished.value)" class= "yellow_button_3">Finish</button>';
//         block += '<button id="declined" value = "declined" onclick = "change_status(declined.value)" class= "red_button">decline</button>';  
//     }
//     block += "</div>";
//     block += "</div>";

//     block += "</div>";
//     document.getElementById("washer_order").innerHTML = block;
// }


async function display_new_order_for_user(orderID) {
    sessionStorage.setItem("cur_order", orderID);
    const order_doc = await promiseOrderLoaderById(orderID);
    const washer_doc = await promiseWasherLoaderById(order_doc.data().washer);
    order_block = '<div class= "order_pink">';
    var order_status = order_doc.data().status;
    if (order_status == "pending") {
        order_header = washer_doc.data().name + " will see your order soon...";
    }
    if (order_status == "process") {
        order_header = "your laundry approved! see you!!";
    }
    if (order_status == "declined") {
        order_header = "sorry...the washer can't take your laundry...";
    }
    order_block += "<div class='row'>"
    order_block += "<div class='header_24'>"+order_header+"</div></div>";
    order_block += "<div class='row'><div class='col-1'></div><div class='col-10'><div class= 'order_white'>"; //row open div, col-10 open div, order white open div
    order_block += "<table style='margin-left:2%; margin-top:2%;'><tr><td><img class='rounded-circle' src='" + washer_doc.data().imageUrl + "' alt='profile_pic'></td><td><h4  style='margin-left: 10%;'>"+washer_doc.data().name+"</h4></td></tr></table>";
    var date_not_format = order_doc.data().due_to*1000;
    var date = new Date(date_not_format);
    var l_date = date.getDate()+"/"+(date.getMonth())+"/"+date.getFullYear();
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" + date.getMinutes();
    }
    else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours()+ ":" +minutes;
    order_block += "<table style='margin-left:15%; margin-top:3%;'><tr><td><h6 class='header_61'>Date</h6></td><td><h6 class= 'header_61'>"+l_date+"</h6></td></tr>";
    order_block += '<tr><td><h6 class= "header_61">Drop off hour</h6></td><td><h6 class= "header_61">'+time+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Loads</h6></td><td><h6 class= "header_61">'+order_doc.data().loads+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Wash Settings</h6></td><td><h6 class= "header_61">'+ order_doc.data().wash_settings +'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Special Services</h6></td><td><h6 class= "header_61">'+ order_doc.data().properties +'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Notes:</h6><div class="small_headline_4">'+order_doc.data().comments+'<br/></div></tr>';
    cur_price = order_doc.data().price.toString() + " &#8362";
    order_block += '<tr><th><div class="small-box-2">'+cur_price+'</div></th><th><button class="phone_number">050-4447755</button></td></tr></table>';
    order_block += "<button style='margin-left: 35%; margin-top: 5%;' class='button1' onclick='back_to_profile()'>back to profile</button>";  
    order_block +="</div></div><div class='col-1'></div></div></div>"; //close of col-10, close of order white, close of all overlay div.
    document.getElementById("user_order").innerHTML = order_block;
}

async function back_to_profile() {
    window.location.href="../../html/user_flow/user_profile_final.html";
}

async function change_status(new_status) {
    var orderID = sessionStorage.getItem("cur_order");
    order_update = {status: new_status}
    await setOrderDetails(order_update, orderID);
    var washerID = sessionStorage.getItem("signed_in_washer");
    await insert_orders_blocks_of_washer("in_process_orders", washerID, "processing"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    await insert_orders_blocks_of_washer("finished_orders", washerID, "finished");   // function in order_blocks_user.js that insert all "finished" into div "finished_orders" 
}

// TO FIX - sent the value (orderID) to the block - and not the blockID 
// currently the value come with the famous tab problem
async function display_order_status(orderID) {
    const order = await promiseOrderLoaderById(orderID);
    display_new_order_for_washer(orderID);
    document.getElementById("overlay_washer_order").style.display = "block";
}


function off() {
    document.getElementById("overlay_washer_order").style.display = "none";
  }