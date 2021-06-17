var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("user_order");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


async function get_order_block_of_user(order) {
    const washer_doc = await order.data().washer.get()
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src=" + washer_doc.data().imageUrl + " alt='profile_pic'> </th></tr>";
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
    var formattedTime = hours + ':' + minutes.substr(-2);
    block += "<tr><td>"+ formattedTime +"</td><td>"+ order.data().price +" nis</td></tr>"
    switch (order.data().status) {
        case 'pending':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Detailes </button></th></tr>";
          break;
        case 'process':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Detailes </button></th></tr>";
          break;
        case 'finished':
            if (order.data().review_on_washer == "") {
                
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
    all_orders = await promiseOrderArrayByUserIdAndStatus(userID, status);
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