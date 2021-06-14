washer1 = {name: "Amitay Rachman", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../images/amitay_pic.jpg", pics: ["../images/miele.png", "../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!", 
commit: "48 hours", working_hours: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [09, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};


washer2 = {name: "Tal Eliram", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../images/tal_e_pic.png", img_src: "../images/laundry-room-1.jpg", pics: ["../images/laundry-room-1.jpg", "../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Tal, and I love to Fold laundry perfectly!", 
commit: "48 hours", working_hours: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [13, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};

washer3 = {name: "Tal Rozentzvi", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../images/tal_r_pic.png", img_src: "../images/laundry-room-1.jpg", pics: ["../images/tal_r_laundry.jpg", "../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!", 
commit: "48 hours", working_hours: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [09, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};

user7 = {name: "Netzer Epstein", drop_off_time: [11,14], rating: 4.5, location: {lat: 31.773610027001155, lng: 35.215351837826255},
wash_setting: {degree: 50, smell: "icy pear"},
favorites: [washer1, washer2,washer3, washer2, washer2, washer2],
profile_pic: "../images/netzer_pic.png", description: "Hi, my name is Netzer and I don't do any sport so my clothes smell OK :)",
prefer_properties : {white: true, door_2_door : false, ironing : true, access : true}
};


order123 = {
orderID: "order123", 
washer: washer1, 
user: user7, 
dueTO: "18/04", 
Price: "30",
status: "in_process",
rating_on_washer: 0, 
review_on_washer: "",
rating_on_user: 0, 
review_on_user: "",
laundry_pics: []
}

order111 = {
orderID: "order111",
washer: washer1, 
user: "user7", 
dueTO: "18/04", 
Price: "30",
status: "finished",
rating_on_washer: 3, 
review_on_washer: "great lemon smell, very soft and also handsome bag! I'm reccomending",
rating_on_user: 4, 
review_on_user: "a lot of socks which can be hard to connect toghther",
laundry_pics: ["../images/folded/folded1.jpg","../images/folded/folded2.jpg"]
}

order144 = {
    orderID: "order144",
    washer: washer1, 
    user: "user9", 
    dueTO: "18/04", 
    Price: "30",
    status: "finished",
    rating_on_washer: 3, 
    review_on_washer: "great laundry",
    rating_on_user: 4, 
    review_on_user: "orgnaize guy, came excactly on time",    
    laundry_pics: ["../images/folded/folded2.jpg"]
}

order155 = {
    orderID: "order155",
    washer: washer1, 
    user: "user7", 
    dueTO: "18/04", 
    Price: "30",
    status: "finished",
    rating_on_washer: 5, 
    review_on_washer: "amazing",
    rating_on_user: 0, 
    review_on_user: "amazing",
    laundry_pics: ["../images/folded/folded4.jpg"]
}

order122 = {
orderID: "order122",
washer: washer1, 
user: "user7", 
dueTO: "18/04", 
Price: "30",
status: "finished",
rating_on_washer: 0, 
review_on_washer: "",
rating_on_user: 0, 
review_on_user: "",
laundry_pics: []
}

    

all_orders = [order111, order122, order155, order111, order122, order123, order111, order155, order144]

function get_order_block_of_washer(order) {
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src=" + order.washer.profile_pic + " alt=''> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ order.washer.name +"</th></tr>";
    block += "<tr><td scope='col' colspan='2'>"+ order.orderID +"</td></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";
    block += "<tr><td>"+ order.dueTO +"</td><td>"+ order.Price +" nis</td></tr>"
    switch (order.status) {
        case 'in_process':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Watch detailes </button></th></tr>";
          break;
        case 'finished':
            if (order.review_on_washer == "") {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Review </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Order again </button></th></tr>";
            }
        break;
    }
    block += "</table>";
    block += "</div>";
    block += "</div>";
    return block
}

function get_order_block_of_user(order) {
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img class='rounded-circle' src=" + order.data().user.imageUrl + " alt='netzer'> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ order.data().user.name +"</th></tr>";
    block += "<tr><td scope='col' colspan='2'>"+ order.orderID +"</td></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";
    block += "<tr><td>"+ order.dueTO +"</td><td>"+ order.Price +" nis</td></tr>"
    switch (order.status) {
        case 'in_process':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> Watch detailes </button></th></tr>";
          break;
        case 'finished':
            if (order.review_on_user == "") {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Review </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> Watch review </button></th></tr>";
            }
        break;
    }
    block += "</table>";
    block += "</div>";
    block += "</div>";
    return block
}



function insert_orders_blocks_of_washer(tag, washerID, status) {
    const washer_doc = await promiseWasherLoaderById(washerID);
    all_orders = promiseOrderArrayByWasherIdAndStatus(washerID, status);
    all_blocks = "";
    // to fix?
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
            all_blocks += get_order_block_of_washer(all_orders[i]);
    }
    document.getElementById(tag).innerHTML = all_blocks;
}


function insert_orders_blocks_of_user(tag, user, status) {
    all_orders = promiseOrderArrayByWasherIdAndStatus(washerID, status);
    all_blocks = "";
    // to fix?
    let max_orders = Math.min(2, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
        if (all_orders[i].user == user && all_orders[i].status == status) {
            all_blocks += get_order_block_of_user(all_orders[i]);
        }
    }
    // all_blocks += "</div>";
    document.getElementById(tag).innerHTML = all_blocks;
}

var clicks = 1
function duplicate() {
    if(clicks > 6){
        return
    }
    var table = document.getElementById("working-hours");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
    cell1.innerHTML = "<div class='set-date'><select><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></div>";
    cell2.innerHTML = "<input class='set-time' type='time' id='startTime' value='08:00'>";
    cell3.innerHTML = "<input class='set-time' type='time' id='startTime' value='08:00'>";
    cell4.innerHTML = "<input id='cbx"+clicks+"' type='checkbox'/><label class='cbx"+clicks+"' for='cbx"+clicks+"'><div class='flip'><div class='front'></div><div class='back'><svg width='16' height='14' viewBox='0 0 16 14'><path d='M2 8.5L6 12.5L14 1.5'></path></svg></div></div></label>";
    clicks += 1
}


async function load_order_blocks_of_washer(washerID) {
    const washer_doc = await promiseWasherLoaderById(washerID);
    console.log(washer_doc);
    // insert_orders_blocks_of_user("in_process_orders", washer_doc, "processing");
    insert_orders_blocks_of_user("in_process_orders", washerID, "process");
}