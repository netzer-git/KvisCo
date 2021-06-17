
async function get_order_block_of_washer(order) {
    const user_doc = await order.data().user.get()
    console.log("user_doc:" ,user_doc.data().name)
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src=" + user_doc.data().imageUrl + " alt='netzer'> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ user_doc.data().name +"</th></tr>";
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