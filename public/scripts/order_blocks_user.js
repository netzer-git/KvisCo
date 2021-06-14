
async function get_order_block_of_user(order) {
    const washer_doc = await order.data().washer.get()
    console.log("user_doc:" ,washer_doc.data().name)
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src=" + washer_doc.data().imageUrl + " alt='netzer'> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ washer_doc.data().name +"</th></tr>";
    // block += "<tr><td scope='col' colspan='2'>"+ order.orderID +"</td></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";
    let unix_timestamp = order.data().due_to['seconds']
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    block += "<tr><td>"+ formattedTime +"</td><td>"+ order.data().price +" nis</td></tr>"
    switch (order.data().status) {
        case 'pending':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Accept </button></th></tr>";
          break;
        case 'process':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Finish </button></th></tr>";
          break;
        case 'finished':
            if (order.data().review_on_washer == "") {
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


async function insert_orders_blocks_of_user(tag, userID, status) {
    all_orders = await promiseOrderArrayByUserIdAndStatus(userID, status);
    console.log(all_orders[0].data());
    console.log("len is:" , all_orders.length);
    let all_blocks = "";
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
            all_blocks += await get_order_block_of_user(all_orders[i]);
    }
    document.getElementById(tag).innerHTML = all_blocks;
}

async function load_order_blocks_of_user(userID) {
    insert_orders_blocks_of_user("in_process_orders", userID, "process");
    insert_orders_blocks_of_user("finished_orders", userID, "finished");
    
}