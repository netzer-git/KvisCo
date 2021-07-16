var block_num = 0;

/**
 * create pink order-blocks to the washer page with the currect button and save in the button functions that display overlays according to the status 
 * status pending/process - button overlay display_order_status(orderID) - locate in new_order.js
 * status finished - button overlay display_review_on_user_overlay(orderID) - locate in review_on_user.js
 * @param {order object} order 
 * @returns long string of order
 */
async function get_order_block_of_washer(order_doc) {
    const user_doc = await promiseUserLoaderById(order_doc.data().user);
    block = "<div class='col-5'>";
    // block += '<div class="overlay_review"><div id="user_review_block"></div></div>';
    block += "<div class='shadow frame'>";
    block += "<div class='center-order'>";
    block += "<div class='profile'>"; // stopped here
    block += "<div class='image-order'><div class='circle-1'></div><div class='circle-2'></div>";
    block += "<img src=" + user_doc.data().imageUrl + " class='rounded-circle-xs' alt='profile_pic'></div>";
    block += "<div class='name'>"+ user_doc.data().name +"</div>";
    // Button - changing
    
    switch (order_doc.data().status) {
        case 'pending':
        case 'process':
            block += "<div class='actions'>";
            block += " <button id = block_num_" + block_num + " value='" + order_doc.id + "' class='btn-white' onclick= 'display_order_status(block_num_" + block_num + ".value)'>Open</button></div></div>";
            break;
        case 'finished':
            if (order_doc.data().review_user == null) {
                block += "<button id=block_num_" + block_num + " value='" + order_doc.id + "' onclick= 'display_review_on_user_overlay(block_num_" + block_num + ".value)' class='btn-white' style='margin-top:10%;'> Review </button></div>";
                // block += "</tr><th scope='col' colspan='2'><button id=block_num_" + block_num + " value='" + order_doc.id + "' onclick= 'display_review_on_user_overlay(block_num_" + block_num + ".value)' class='button1'> Review </button></th></tr>";
            }
            else {
                block += "<button id = block_num_" + block_num + " value='" + order_doc.id + "' class='btn-white' onclick= 'display_review_on_user_overlay(block_num_" + block_num + ".value)' style='margin-top:10%;'> Change Review </button></div>"
                // block += "</tr><th scope='col' colspan='2'><button id = block_num_" + block_num + " value='" + order_doc.id + "' onclick= 'display_review_on_user_overlay(block_num_" + block_num + ".value)' class='button1'> Change Review </button></th></tr>";

            }
            break;
    }
    // Date and Price blocks 
    var date = new Date(order_doc.data().due_to*1000);
    var formattedTime = date.getDate() + '/' + (date.getMonth()+1);
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" +date.getMinutes();
    }
    else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours()+ ":" +minutes;
    block += "<div class='stats'><div class='box-price'>";
    block += "<span class='value'>"+ formattedTime + "</span><span class='parameter'>Due to</span></div>";
    // block += "<tr><td>"+ formattedTime + "</td><td>"+ order_doc.data().price +" &#8362</td></tr>"
    block += "<div class='box-price'><span class='value'>" + order_doc.data().price +" &#8362</span><span class='parameter'>Price</span></div></div>";
    block += "</div>";
    // block += "</div>";
    block += "</div>";
    block += "</div>";
    block_num++;
    return block;
}


async function insert_orders_blocks_of_washer(tag, washerID, status) {
    if (status == "process") {
        var all_orders = await promiseOrderArrayByWasherIdAndStatus(washerID, "processing");
    }
    else {
        var all_orders = await promiseOrderArrayByWasherIdAndStatus(washerID, status);
    }
    let all_blocks = "<div class = 'row'>";
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
        all_blocks += await get_order_block_of_washer(all_orders[i]);
    }
    document.getElementById(tag).innerHTML = all_blocks;
}