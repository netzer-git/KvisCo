status_option = ["in_process", "need_to_review", "finished"]

washer1 = {name: "Amitay Rachman", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../Profile.png", img_src: "../images/washer1.png", pics: ["../Profile.png", "../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!", 
commit: "48 hours", opening_times: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [09, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};
washer2 = {name: "Netzer Epstein", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../Profile.png", img_src: "../images/washer1.png", pics: ["../Profile.png", "../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!", 
commit: "48 hours", opening_times: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [09, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};

user7 = {name: "user7", drop_off_time: [11,14], rating: 4.5, location: {lat: 31.773610027001155, lng: 35.215351837826255},
wash_setting: {degree: 50, smell: "icy pear"},
favorites: [washer1, washer2,washer2, washer2, washer2, washer2],
img: "../images/client3.png", description: "Hi, my name is client3 and I don't do any spory so my clothes smell OK :)",
prefer_properties : {white: true, door_2_door : false, ironing : true, access : true}
};


order123 = {
orderID: "order123", 
washer: washer1, 
user: "user7", 
dueTO: "18/04", 
Price: "30",
status: "in_process",
rating: 4, 
review: "great lemon smell, very soft and also handsome bag! I'm reccomending",
laundry_pics: ["../Profile.png","../Profile.png"]
}

order111 = {
orderID: "order111",
washer: washer1, 
user: "user7", 
dueTO: "18/04", 
Price: "30",
status: "finished",
rating: 3, 
review: "great laundry",
laundry_pics: ["../Profile.png","../Profile.png"]
}

order144 = {
    orderID: "order144",
    washer: washer1, 
    user: "user9", 
    dueTO: "18/04", 
    Price: "30",
    status: "finished",
    rating: 3, 
    review: "great laundry",
    laundry_pics: ["../Profile.png","../Profile.png"]
}

order155 = {
    orderID: "order155",
    washer: washer1, 
    user: "user7", 
    dueTO: "18/04", 
    Price: "30",
    status: "finished",
    rating: 5, 
    review: "amazing",
    laundry_pics: ["../Profile.png","../Profile.png"]
}

order122 = {
orderID: "order122",
washer: washer1, 
user: "user7", 
dueTO: "18/04", 
Price: "30",
status: "finished",
rating: 0, 
review: "",
laundry_pics: []
}

    

all_orders = [order111, order122, order155, order111, order122, order123, order111, order155, order144]


function get_order_block(order) {
    block = "<div class='col-xs-4'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'><img src= " + order.washer.profile_pic + " alt=''> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ order.washer.name +"</th></tr>";
    block += "<tr><td scope='col' colspan='2'>"+ order.orderID +"</td></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";
    block += "<tr><td>"+ order.dueTO +"</td><td>"+ order.Price +" nis</td></tr>"
    switch (order.status) {
        case 'in_process':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> watch detailes </button></th></tr>";
          break;
        case 'finished':
            if (order.review == "") {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> review the washer </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> make new order </button></th></tr>";
            }
        break;
    }
    block += "</table>";
    block += "</div>";
    return block
}


function insert_orders_blocks(tag, user, status) {
    all_blocks = "";
    let max_orders = Math.min(7, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
        if (all_orders[i].user == user && all_orders[i].status == status) {
            all_blocks += get_order_block(all_orders[i]);
        }
    }
    // all_blocks += "</div>";
    document.getElementById(tag).innerHTML = all_blocks;
}

function get_favorite_washer(washer) {
    washer_block = "<div class='col-lg-2'>";
    washer_block += "<div class='profile_pic'><a href='#'><img src=" + washer.profile_pic + "></a></div>";
    washer_block += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src='../Star 2 (2).png'>" + washer.rating + "</div></div>";
    washer_block += "<div class='col-lg-8'>";
    washer_block += "<h2>" + washer.name + "</h2>";
    washer_block += "<div class='description'>" + washer.description + "</div>";
    washer_block += "<div class='location'>" + washer.location_str + "</div>";
    washer_block += "</div><div class='col-lg-2'>";
    let max_pics = Math.min(2, washer.pics.length);
    for (let k = 0; k < max_pics; k++) {
        washer_block += '<img class="img-rounded" src="'+ washer.pics[k] +'" alt="Mister Washer" aria-hidden="true">';
    }
    if (check_if_open(7)) {
        washer_block += "<i class='fa fa-check' style='color:green' aria-hidden='true'>open</i>";
    }
    else {
        washer_block += "<i class='fa fa-check' style='color:red' aria-hidden='true'>close</i>";
    }
    washer_block += "</div>";
    
    return washer_block
    // document.getElementById(tag).innerHTML = washer_block;   
}


function insert_favorites_washers(tag, user) {
    all_washers = "";
    let max_reviews = Math.min(3, user.favorites.length);
    for (var i = 0; i < max_reviews; i++) {
        all_washers += get_favorite_washer(user.favorites[i]);
    } 
    document.getElementById(tag).innerHTML = all_washers;
}


// create function
function check_if_open(hour) {
    if (hour < 8) {
        return true
    }
    return false
}

function get_user_reviews(tag, user) {
    all_reviews = "";
    for (let j = 0; j < all_orders.length; j++) {
        if (all_orders[j].user == user && all_orders[j].status == "finished") {
            all_reviews += "<div class='row'> <h4>" + all_orders[j].washer.name + "</h4>";
            all_reviews += "<h5>" + all_orders[j].orderID + "</h5>";
            all_reviews += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src='../Star 2 (2).png'>" + all_orders[j].rating + "</div></div>";
            all_reviews += "<p>" + all_orders[j].review + "</p>";
            all_reviews += '<hr style="border: 2px solid #000000">';
        //             for (let k = 0; k < reviews[j].laundry_pics.length; k++) {
        //     all_reviews += '<img class="img-rounded" src="'+ reviews[j].laundry_pics[k] +'" alt="Mister Washer" aria-hidden="true">';
        // }

        }
    }

    // }
    if (all_reviews == "") {
        all_reviews += "<h4> there are no reviews yet </h4>";
    }
    all_reviews += '</div>' 
    document.getElementById(tag).innerHTML = all_reviews;
}


// function get_user_header(tag,user) {
//     header = "<div class='col-10'><table class='table-search'>";
//     header += "<tr><h2>Netzer Epstein</h2></tr>"       


//         </tr>
//         <tr>
//             <div class="description">
//                 <!--Description-->
//                 Mechabes esh megil shesh (description)
//             </div>
//         </tr>
//     </table>
//     <div class="row">
//         <!--Location and rating row-->
//         <div class="col-3">
//             <div class="location">Hapalmach 7, Jerusalem</div>
//             <!--Adress (location)-->
//         </div>
//         <div class="col-1">
//             <div class="location"><img style="margin-bottom:8px; margin-right: 5px;"
//                     src="../Star 2 (2).png">4.5</div>
//             <!--Star pic & rating score-->
//         </div>
//         <div class="col-8">
//             <!--TBD-->
//         </div>
//     </div>
// </div>
// }