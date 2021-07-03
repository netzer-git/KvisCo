async function get_order_block_of_user(order) {
    // const washer_doc = await order.data().washer.get();
    const washer_doc = await promiseWasherLoaderById(order.data().washer);
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src='" + washer_doc.data().imageUrl + "' alt='profile_pic'> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ washer_doc.data().name +"</th></tr>";
    // block += "<tr><td scope='col' colspan='2'>"+ order.orderID +"</td></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";
    let unix_timestamp = order.data().due_to;
    var date = new Date(unix_timestamp * 1000);
    var formattedTime = date.getDate() + '/' + date.getMonth();
    block += "<tr><td>"+ formattedTime +"</td><td>"+ order.data().price +" NIS</td></tr>"
    switch (order.data().status) {
        case 'pending':
        case 'process':
            block += "</tr><th scope='col' colspan='2'>";
            block += "<div id='overlay' onclick='off()'>";
            block += "<div id='user_order'></div></div><div>";
            block += "<div><button onclick='display_order()' class='button1'> Details </button></div></th></tr>";
          break;
        case 'finished':
            if (order.data().review_washer == "") {
                
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Review </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button id = 'user_order' class='button1'> Watch Review </button><div id='myModal' class='modal'></th></tr>";
            }
        break;
    }
    block += "</table>";
    block += "</div>";
    block += "</div>";
    return block;
}


async function insert_orders_blocks_of_user(tag, userID, status) {
    if (status == "process") {
        var all_orders = await promiseOrderArrayByUserIdAndStatus(userID, "processing");
    }
    else {
        var all_orders = await promiseOrderArrayByUserIdAndStatus(userID, status);
    }
    let all_blocks = "";
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
        console.log("id of blocks: ", all_orders[i].id)
        all_blocks += await get_order_block_of_user(all_orders[i]);
    }
    
    document.getElementById(tag).innerHTML = all_blocks;
}


function display_order() {
    display_new_order_for_user('u3HAO6QZ6S9i3hUAO7pJ'); // cur_order
    document.getElementById("overlay").style.display = "block";
    // add_to_firebase_order_df(order123);
    // overlay thank you page
}

  
function off() {
    document.getElementById("overlay").style.display = "none";
  }