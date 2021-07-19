var block_num = 0;

async function get_order_block_of_user(order_doc, blocks_gap = 5) {
    // const washer_doc = await order_doc.data().washer.get();
    const washer_doc = await promiseWasherLoaderById(order_doc.data().washer);
    block = "";
    block += "<div class='col-"+blocks_gap+"'>";
    // block += "<div class='col_with_padd'>";
    block += "<div class='shadow frame'>";
    block += "<div class='center-order'>";
    block += "<div class='profile'>";
    block += "<div class='image-order'><div class='circle-1'></div><div class='circle-2'></div>";
    block += "<img src=" + washer_doc.data().imageUrl + " class='rounded-circle-xs' alt='profile_pic'></div>";
    block += "<div id = 'w_ref' value='" + washer_doc.id + "' onclick= 'redirect_specific_washer(w_ref.value)' class='name'>"+ washer_doc.data().name +"</div>";
    // Button - changing
    switch (order_doc.data().status) {
        case 'pending':
        case 'process':
            block += "<div class='actions'>";
            block += "<button id = 'block_num_" + block_num + "' value='" + order_doc.id + "' onclick= 'display_order(block_num_" + block_num + ".value)' class='btn-white' style='margin-top:10%;'> Details </button></div>";
            block += "</div>";
          break;
        case 'finished':
            if (window.location.pathname == "/html/welcome.html") {
                block += "<button id = 'block_num_" + block_num + "' value='" + washer_doc.id + "' onclick= 'quick_place_order(block_num_" + block_num + ".value)' class='btn-white' style='margin-top:10%;'> Order Again </button></div>";
            }
            else if (order_doc.data().review_washer == null) {
                // block += "<button class='btn-white'> Review </button></div>";
                block += "<button id=block_num_" + block_num + " value='" + order_doc.id + "' onclick= 'display_review_on_washer_overlay(block_num_" + block_num + ".value)' class='btn-white' style='margin-top:10%;'> Review </button></div>";
            }
            else {
                // block += "<button id = 'user_order' class='btn-white' style='margin-top:10%;'> Change Review </button></div>";
                block += "<button id = block_num_" + block_num + " value='" + order_doc.id + "' class='btn-white' onclick= 'display_review_on_washer_overlay(block_num_" + block_num + ".value)' style='margin-top:10%;'> Change Review </button></div>"
            }
            break;
    }
    // Date and Price blocks 
    var date = new Date(order_doc.data().due_to);
    var formattedTime = date.getDate() + '/' + (date.getMonth()+1);
    if (date.getMinutes().toString().length <= 1) {
        var minutes = "0" +date.getMinutes();
    }
    else {
        var minutes = date.getMinutes();
    }
    var time = date.getHours()+ ":" +minutes;
    block += "<div class='stats'><div class='box-price'>"
    block += "<span class='value'>"+ formattedTime + "</span><span class='parameter'>Date</span></div>";
    block += "<div class='box-price'><span class='value'>" + order_doc.data().price +" &#8362</span><span class='parameter'>Price</span></div></div>"
    
    block += "</div>";
    // block += "</div>";
    block += "</div>";
    block += "</div>";
    block_num++;
    return block;
}

async function quick_place_order(washerID) {
    sessionStorage.setItem("pressed_washer", washerID); // washer that pressed in page map_filter.html
    window.location.href = "../../html/user_flow/place_order.html";
}


async function insert_orders_blocks_of_user(tag, userID, status) {
    if (status == "process") {
        var all_orders = await promiseOrderArrayByUserIdAndStatus(userID, "processing");
    }
    else {
        var all_orders = await promiseOrderArrayByUserIdAndStatus(userID, status);
    }
    let all_blocks = "<div class = 'row'>";
    all_orders = sortOrdersByCreatedAt(all_orders)
    var max_orders = Math.min(2, all_orders.length);
    if (window.location.pathname === "/html/welcome.html") {
        var max_orders = Math.min(3, all_orders.length);
        for (var i = 0; i < max_orders; i++) {
            all_blocks += await get_order_block_of_user(all_orders[i],blocks_gap = 4);
        }
    }
    else {
        for (var i = 0; i < max_orders; i++) {
            all_blocks += await get_order_block_of_user(all_orders[i]);
        }
    }

    if (max_orders < 2 && window.location.pathname !== "/html/welcome.html") {
        for (var i = max_orders; i < 2; i++) {
            all_blocks += get_order_block_of_empty_washer();
        }
    }

    all_blocks += "</div>";
    document.getElementById(tag).innerHTML = all_blocks;
}


function display_order(orderID) {
    display_new_order_for_user(orderID); // cur_order
    document.getElementById("overlay_thank_you").style.display = "block";

}

  
function off() {
    document.getElementById("overlay_thank_you").style.display = "none";
  }


async function load_quick_welcome_page() {
    // var userID = sessionStorage.getItem("connected_userID");
    var userID = getUserToken();
    if (userID != null) {
        await insert_orders_blocks_of_user("welcome_orders_block", userID, "finished"); 
    }
}

/**
 * FIXME: please
 * @param {*} washer_id 
 */
 function redirect_specific_washer(washer_id) {
    sessionStorage.setItem('pressed_washer', washer_id);
    location.href = "./place_order.html";
}

function redirect_to_map() {
    location.href = "./map_filter.html";
}

function get_order_block_of_empty_washer() {
    block = "<div class='col-5'>";
    block += "<div class='shadow frame'>";
    block += "<div class='center-order'>";
    block += "<div class='profile'>";
    block += "<div class='image-order'>";
    block += "<div class='circle-1'></div> <div class='circle-2'></div>";
    block += "<img src='../../images/Profile-yellow.png' class='rounded-circle-xs' alt='profile_pic'></div>";
    block += "<div class='name'>Your Next Order</div>";
    block += "<div class='actions'>";
    block += "<button class='btn-white' onclick='redirect_to_map()'>Order</button></div></div>";
    block += "<div class='stats'><div class='box-price'>";
    block += "<span class='value'>TBD</span><span class='parameter'>Due to</span></div>";
    block += "<div class='box-price'><span class='value'>0 &#8362</span><span class='parameter'>Price</span></div></div>";
    block += "</div>";
    block += "</div>";
    block += "</div>";
    block_num++;
    return block;
}