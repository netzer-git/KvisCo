
async function display_new_order_for_washer(order, orderID) {
    // const order = await promiseOrderArrayByUserIdAndStatus(userID, status)[0];
    const user_doc = await order.data().user.get();
    console.log("the order id is: ", orderID);
    order_block = '<div class= "order_pink">';
    order_block += '<table><tr><h2 class="header_24">YOU RECIEVED A NEW ORDER</h2></tr>';
    order_block += '<tr><table class= "order_white">';
    order_block += '<tr><td><img class="rounded-circle" src= "' + user_doc.data().imageUrl + '" alt="profile_pic"></td><td><h4>'+user_doc.data().name+'</h4></td></tr>';
    var date_not_format = order.data().due_to*1000;
    var date = new Date(date_not_format);
    var l_date = date.getDate()+"/"+(date.getMonth())+"/"+date.getFullYear();
    var time = date.getHours()+":"+ "0" +date.getMinutes();
    order_block += '<tr><td><div class= "header_61">Date</div></td><td><div class= "header_61">'+l_date+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Drop off hour</div></td><td><div class= "header_61">'+time+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Loads</div></td><td><div class= "header_61">'+order.data().loads+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Wash Settings</div></td><td><div class= "header_61">'+order.data().wash_settings+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Special Services</div></td><td><div class= "header_61">'+order.data().property+'</div></td></tr>';
    order_block += '<tr><td><div class= "header_61">Notes:</div><div class="small_headline_4">'+order.data().comments+'<br/> </div></tr>';
    cur_price = order.data().price.toString() + " nis"  
    order_block += '<tr><th><div class="small-box-2">'+cur_price+'</div></th><th><button class="phone_number">050-4447755</button></td></tr>';
    order_block +='</table>';
    order_block += '<tr><td><button id="accept" value = "in_process" onclick = "change_status(this.value,"'+orderID+'")" class= "yellow_button_3">Confirm</button></td>';
    order_block += '<td><button id="decline" value = "declined" onclick = "change_status(this)" class= "red_button">decline</button></td></tr>';
    order_block +='</table>';
    document.getElementById("washer_order").innerHTML = order_block;
}


async function display_new_order_for_user(orderID) {
    const order = await promiseOrderLoaderById(orderID);
    const washer_doc = await order.data().washer.get();
    order_block = '<div class= "order_pink">';
    if (order.data().status == "pending") {
        order_header = washer_doc.data().name + " will see your order soon...";
    }
    if (order.data().status == "process") {
        order_header = "your laundry approved! see you!!";
    }
    if (order.data().status == "declined") {
        order_header = "sorry...the washer can't take your laundry...";
    }
    order_block += "<div class='row'>"
    order_block += "<div class='header_24'>"+order_header+"</div></div>";
    order_block += "<div class='row'><div class='col-1'></div><div class='col-10'><div class= 'order_white'>"; //row open div, col-10 open div, order white open div
    order_block += "<table style='margin-left:2%; margin-top:2%;'><tr><td><img class='rounded-circle' src='" + washer_doc.data().imageUrl + "' alt='profile_pic'></td><td><h4  style='margin-left: 10%;'>"+washer_doc.data().name+"</h4></td></tr></table>";
    var date_not_format = order.data().due_to*1000;
    var date = new Date(date_not_format);
    var l_date = date.getDate()+"/"+(date.getMonth())+"/"+date.getFullYear();
    var time = date.getHours()+":"+ + date.getMinutes();
    order_block += "<table style='margin-left:15%; margin-top:3%;'><tr><td><h6 class='header_61'>Date</h6></td><td><h6 class= 'header_61'>"+l_date+"</h6></td></tr>";
    order_block += '<tr><td><h6 class= "header_61">Drop off hour</h6></td><td><h6 class= "header_61">'+time+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Loads</h6></td><td><h6 class= "header_61">'+order.data().loads+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Wash Settings</h6></td><td><h6 class= "header_61">'+ order.data().wash_settings +'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Special Services</h6></td><td><h6 class= "header_61">'+ order.data().properties +'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Notes:</h6><div class="small_headline_4">'+order.data().comments+'<br/></div></tr>';
    cur_price = order.data().price.toString() + " nis";
    order_block += '<tr><th><div class="small-box-2">'+cur_price+'</div></th><th><button class="phone_number">050-4447755</button></td></tr></table>';
    order_block += "<button style='margin-left: 35%; margin-top: 5%;' class='button1' onclick='back_to_profile()'>back to profile</button>";  
    order_block +="</div></div><div class='col-1'></div></div></div>"; //close of col-10, close of order white, close of all overlay div.
    document.getElementById("user_order").innerHTML = order_block;
}

async function back_to_profile() {
    var userID = await getUserToken();
    sessionStorage.setItem("userid", userID);
    window.location.href="../html/user_flow/user_profile_final.html";
}

async function change_status(new_status, orderID) {
    console.log("u pressed change status!");
    order = {status: new_status}
    console.log(order);
    await setOrderDetails(order, orderID);
    window.location.href = "../html/washer_flow/washer-profile.html";
}


async function display_order_status(blockID) {
    console.log("block id: ",blockID);
    var orderID = blockID.value;
    console.log("order id: ",orderID);
    const order = await promiseOrderLoaderById(orderID);
    console.log("order: ",order.data());
    display_new_order_for_washer(order, orderID);
    document.getElementById("overlay_washer_order").style.display = "block";
}


function off() {
    document.getElementById("overlay_washer_order").style.display = "none";
  }