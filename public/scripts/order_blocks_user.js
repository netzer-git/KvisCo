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
    block += "<div class='name'>"+ washer_doc.data().name +"</div>";
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
            else if (order_doc.data().review_washer == "") {
                block += "<button class='btn-white'> Review </button></div>";
            }
            else {
                block += "<button id = 'user_order' class='btn-white' style='margin-top:10%;'> Watch Review </button></div>";
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
    if (window.location.pathname == "/html/welcome.html") {
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
    console.log(" Here is a big bug but no time now will do tomooroow")
    var userID = sessionStorage.getItem("connected_userID");
    if (userID != null) {
        await insert_orders_blocks_of_user("welcome_orders_block", userID, "finished"); 
    }
    // try {
    //     var userID = sessionStorage.getItem("connected_userID");
    // }
    // catch {
    //     return;
    // }
    // await insert_orders_blocks_of_user("finished_orders", userID, "finished"); 

}