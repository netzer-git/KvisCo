
washer1 = {name: "Amitay Rachman", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../images/amitay_pic.jpg", pics: ["../images/miele.png", "../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!", 
commit: "48 hours", opening_times: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [09, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};


washer2 = {name: "Tal Eliram", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../images/tal_e_pic.png", img_src: "../images/laundry-room-1.jpg", pics: ["../images/laundry-room-1.jpg", "../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Tal, and I love to Fold laundry perfectly!", 
commit: "48 hours", opening_times: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [09, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};

washer3 = {name: "Tal Rozentzvi", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../images/tal_r_pic.png", img_src: "../images/laundry-room-1.jpg", pics: ["../images/tal_r_laundry.jpg", "../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!", 
commit: "48 hours", opening_times: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [09, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};

user7 = {name: "Netzer Epstein", drop_off_time: [11,14], rating: 4.5, location: {lat: 31.773610027001155, lng: 35.215351837826255},
wash_setting: {degree: 50, smell: "icy pear"},
favorites: [washer1, washer2,washer3, washer2, washer2, washer2],
img: "../images/netzer pic.png", description: "Hi, my name is Netzer and I don't do any sport so my clothes smell OK :)",
prefer_properties : {white: true, door_2_door : false, ironing : true, access : true}
};


order123 = {
orderID: "order123", 
washer: washer1, 
user: "user7", 
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
laundry_pics: ["../images/Profile.png","../Profile.png"]
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
    laundry_pics: ["../images/Profile.png","../Profile.png"]
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
    review_on_user: "",
    laundry_pics: ["../images/Profile.png","../Profile.png"]
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


function get_order_block(order) {
    block = "";
    block = "<div class='col-lg-4'>";
    block += "<div class='col_with_padd'>";
    block += "<table class='Background_box'>";
    block += "<tr><th scope='col' colspan='2'>'<img class='rounded-circle' src=" + order.washer.profile_pic + " alt=''> </th></tr>";
    block += "<tr><th scope='col' colspan='2'>"+ order.washer.name +"</th></tr>";
    block += "<tr><td scope='col' colspan='2'>"+ order.orderID +"</td></tr>";
    block += "<tr><th scope='col'>Due to</th><th scope='col'>Price</th></tr>";
    block += "<tr><td>"+ order.dueTO +"</td><td>"+ order.Price +" nis</td></tr>"
    switch (order.status) {
        case 'in_process':
            block += "</tr><th scope='col' colspan='2'><button class='button1'> watch detailes </button></th></tr>";
          break;
        case 'finished':
            if (order.review_on_washer == "") {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> review the washer </button></th></tr>";
            }
            else {
                block += "</tr><th scope='col' colspan='2'><button class='button1'> make new order </button></th></tr>";
            }
        break;
    }
    block += "</table>";
    block += "</div>";
    block += "</div>";
    return block
}


function insert_orders_blocks(tag, user, status) {
    all_blocks = "";
    // to fix?
    let max_orders = Math.min(7, all_orders.length);
    for (var i = 0; i < max_orders; i++) {
        if (all_orders[i].user == user && all_orders[i].status == status) {
            all_blocks += get_order_block(all_orders[i]);
        }
    }
    // all_blocks += "</div>";
    document.getElementById(tag).innerHTML = all_blocks;
}

function get_favorite_washer(washer, counter) {
    washer_block = "<div class='row with_padd'>";
    washer_block += "<div class='col-lg-2'>";
    washer_block += "<div class='profile_pic'><a href='#'><img class='rounded-circle' src=" + washer.profile_pic + "></a></div>";
    washer_block += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src="../images/Star 2 (2).png">" + washer.rating + "</div>";
    washer_block += "</div>"; 
    washer_block += "<div class='col-lg-6'>";
    washer_block += "<h2>" + washer.name + "</h2>";
    washer_block += "<div class='description'>" + washer.description + "</div>";
    washer_block += "<div class='location'>" + washer.location_str + "</div>";
    washer_block += "</div><div class='col-lg-3'>";
    let max_pics = Math.min(1, washer.pics.length);
    for (let k = 0; k < max_pics; k++) {
        washer_block += '<img class="img-rounded" src="'+ washer.pics[k] +'" alt="Mister Washer" aria-hidden="true">';
    }
    washer_block += "</div><div class='col-lg-1'>";
    washer_block += '<span id = heart'+ counter+ '><i class="fa fa-heart fa-2x" ></i> </span>';
    washer_block += '<div class="row" d-flex align-itemns-baseline>';
    if (check_if_open(7)) {
        washer_block += "<i class='fa fa-check' style='color:green'  aria-hidden='true'>open</i>";
    }
    else {
        washer_block += "<i class='fa fa-check' style='color:red' aria-hidden='true'>close</i>";
    }
    washer_block += "</div>";
    washer_block += "</div>";
    washer_block += "</div>";
    washer_block += "</div>"; 
    washer_block += '<hr style="border: 1px solid #000000">';
    return washer_block
    // document.getElementById(tag).innerHTML = washer_block;   
}


function insert_favorites_washers(tag, user) {
    all_washers = "";
    let max_reviews = Math.min(3, user.favorites.length);
    for (var i = 0; i < max_reviews; i++) {
        all_washers += get_favorite_washer(user.favorites[i], i);
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
        if (all_orders[j].user == user && all_orders[j].status == "finished" && all_orders[j].rating_on_user != "") {
            // here start block of review
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-lg-2'>";
            all_reviews += " <h4>" + all_orders[j].washer.name + "</h4>";
            all_reviews += "<h5>" + all_orders[j].orderID + "</h5>";
            all_reviews += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src="../images/Star 2 (2).png">" + all_orders[j].rating_on_user + "</div></div>";
            all_reviews += "<div class='col-lg-5'>";
            all_reviews += "<p>" + all_orders[j].review_on_user + "</p>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-lg-5'>";
            for (let k = 0; k < all_orders[j].laundry_pics.length; k++) {
                all_reviews += '<img class="img-rounded" src="'+ all_orders[j].laundry_pics[k] +'" alt="Mister Washer" aria-hidden="true">';
            }
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += '<hr style="border: 2px solid #000000">';
        }
    }
    if (all_reviews == "") {
        all_reviews += "<h4> there are no reviews yet </h4>";
    }
    all_reviews += '</div>'; 
    document.getElementById(tag).innerHTML = all_reviews;
}


function get_detailes(tag, washer) {
    let details_table = "<table class = machine_details>";
    details_table += "<tr><tr><th>Model Name</th></tr><tr>";
    details_table += "<td>" + washer.model_name + "</td></tr><tr>";
    details_table += "<tr><tr><th>Capacity</th></tr><tr>";
    details_table += "<td>" + washer.capacity + "</td></tr><tr>";
    details_table += "<tr><tr><th>Purchasing Year</th></tr><tr>";
    details_table += "<td>" + washer.machine_year + "</td></tr><tr>";
    details_table += "<tr><tr><th>Special Services</th></tr><tr>";
    details_table += "<tr><td><img src="../images/check.png" alt=''>Ironing</td></tr>";
    details_table += "<tr><td><img src="../images/check.png" alt=''>Door 2 Door</td></tr>";
    details_table += "<tr><td><img src="../images/check.png" alt=''>Dryer</td></tr>";
    details_table += "</tr></table>";
    document.getElementById(tag).innerHTML = details_table;             

}

$(document).ready(function(){
    heart_range = ["#heart0","#heart1","#heart2"]
    for (let j = 0; j < heart_range.length; j++) {
        $(heart_range[j]).click(function(){
            if($(heart_range[j]).hasClass("liked")){
              $(heart_range[j]).html('<i class="fa fa-heart" fa-2x aria-hidden="true"></i>');
              $(heart_range[j]).removeClass("liked");
            }else{
              $(heart_range[j]).html('<i class="fa fa-heart-o" fa-2x aria-hidden="true"></i>');
              $(heart_range[j]).addClass("liked");
            }
          });
    }
  });


