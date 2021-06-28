
var block_num = 0;

/**
 * create pink order block to the washer with the currect button and save in the button functions that display overlays according to the status 
 * status pending/process - button overlay display_order_status(orderID) - locate in new_order.js
 * status finished - button overlay display_review_on_user_overlay(orderID) - locate in review_on_user.js
 * @param {order object} order 
 * @returns long string of order
 */
async function get_order_block_of_washer(order) {
    const user_doc = await promiseUserLoaderById(order.data().user);
    block = "<div class='col-lg-4'>";
    block += '<div class="overlay_review"><div id="user_review_block"></div></div>';
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src='" + user_doc.data().imageUrl + "' alt='netzer'> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>" + user_doc.data().name + "</th></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";
    let unix_timestamp = order.data().due_to;
    var date = new Date(unix_timestamp * 1000);
    var formattedTime = date.getDate() + '/' + date.getMonth();

    block += "<tr><td>" + formattedTime + "</td><td>" + order.data().price + "</td></tr>"
    switch (order.data().status) {
        case 'pending':
        case 'process':
            block += "</tr><th scope='col' colspan='2'><button id = block_num_" + block_num + " value='" + order.id + "' onclick= 'display_order_status(block_num_" + block_num + ")' class='button1'> Open  </button></th></tr>";
            break;
        case 'finished':
            if (order.data().review_user == null) {
                block += "</tr><th scope='col' colspan='2'><button id=block_num_" + block_num + " value='" + order.id + "' onclick= 'display_review_on_user_overlay(block_num_" + block_num + ")' class='button1'> Review </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button id = block_num_" + block_num + " value='" + order.id + "' onclick= 'display_review_on_user_overlay(block_num_" + block_num + ")' class='button1'> Change Review </button></th></tr>";

            }
            break;
    }
    block_num++;
    block += "</table>";
    block += "</div>";
    block += "</div>";
    return block;
}


async function insert_orders_blocks_of_washer(tag, washerID, status) {
    const all_orders = await promiseOrderArrayByWasherIdAndStatus(washerID, status);
    let all_blocks = "";
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
        all_blocks += await get_order_block_of_washer(all_orders[i]);
    }
    document.getElementById(tag).innerHTML = all_blocks;
}