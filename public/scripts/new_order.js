


async function display_new_order_for_washer(orderID) {
    // const order = await promiseOrderArrayByUserIdAndStatus(userID, status)[0];
    const order = await promiseOrderLoaderById(orderID);
    const user_doc = await order.data().user.get();
    order_block = '<div class= "order_pink">';
    order_block += '<table><tr><h2 class="header_24">YOU RECIEVED A NEW ORDER</h2></tr>';
    order_block += '<tr><table class= "order_white">';
    order_block += '<tr><td><img class="rounded-circle" src= "' + user_doc.data().imageUrl + '" alt="profile_pic"></td><td><h4>'+user_doc.data().name+'</h4></td></tr>';
    var date_not_format = order.data().due_to['seconds']*1000;
    var date = new Date(date_not_format);
    var l_date = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    var time = date.getHours()+":"+ "0" +date.getMinutes();
    order_block += '<tr><td><h6 class= "header_61">Date</h6></td><td><h6 class= "header_61">'+l_date+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Drop off hour</h6></td><td><h6 class= "header_61">'+time+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Loads</h6></td><td><h6 class= "header_61">'+order.data().loads+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Wash Settings</h6></td><td><h6 class= "header_61">'+order.data().wash_settings+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Special Services</h6></td><td><h6 class= "header_61">'+order.data().property+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Notes:</h6><div class="small_headline_4">'+order.data().comments+'<br/> </div></tr>';
    cur_price = order.data().price.toString() + " nis"  
    order_block += '<tr><th><div class="small-box-2">'+cur_price+'</div></th><th><button class="phone_number">050-4447755</button></td></tr>';
    order_block +='</table>';
    order_block += '<tr><td><button id="accept" value = "in_process" onclick = "change_status(this)" class= "yellow_button_3">Confirm</button></td>';
    order_block += '<td><button id="decline" value = "declined" onclick = "change_status(this)" class= "red_button">decline</button></td></tr>';
    order_block +='</table>';
    document.getElementById("washer_order").innerHTML = order_block;
}


async function display_new_order_for_user(orderID) {
    const order = await promiseOrderLoaderById(orderID);
    const washer_doc = await order.data().washer.get();
    order_block = '<div class= "order_pink">';
    if (order.data().status == "pending") {
        order_header = washer_doc.name + "will see your order soon...";
    }
    if (order.data().status == "process") {
        order_header = "your laundry approved! see you!!";
    }
    if (order.data().status == "declined") {
        order_header = "sorry...the washer can't take your laundry...";
    }
    order_block += '<table><tr><h2 class="header_24">'+order_header+'</h2></tr>';
    order_block += '<tr><table class= "order_white">';
    order_block += '<tr><td><img class="rounded-circle" src="' + washer_doc.data().imageUrl + '" alt="profile_pic"></td><td><h4>'+washer_doc.data().name+'</h4></td></tr>';
    var date_not_format = order.data().due_to['seconds']*1000;
    var date = new Date(date_not_format);
    var l_date = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    var time = date.getHours()+":"+ "0" +date.getMinutes();
    order_block += '<tr><td><h6 class= "header_61">Date</h6></td><td><h6 class= "header_61">'+l_date+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Drop off hour</h6></td><td><h6 class= "header_61">'+time+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Loads</h6></td><td><h6 class= "header_61">'+order.data().loads+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Wash Settings</h6></td><td><h6 class= "header_61">'+order.data().wash_settings+'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Special Services</h6></td><td><h6 class= "header_61">'+ order.data().properties +'</h6></td></tr>';
    order_block += '<tr><td><h6 class= "header_61">Notes:</h6><div class="small_headline_4">'+order.data().comments+'<br/></div></tr>';
    cur_price = order.data().price.toString() + " nis"  
    order_block += '<tr><th><div class="small-box-2">'+cur_price+'</div></th><th><button class="phone_number">050-4447755</button></td></tr>';
    order_block += '<tr><th scope="col" colspan="2"><a href="../html/final_pages/user_profile_final.html" class="btn btn-info">back to profile</a></th>';  
    order_block +='</table></table>';
    document.getElementById("user_order").innerHTML = order_block;
}


function change_status(new_status) {
    order = {status: new_status.value}
    console.log(order);
    setOrderDetails(order, orderID);
    // change_in_firebase_order_df(order);
    // window.history.back();
}