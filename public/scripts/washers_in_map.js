
washer1 = {name: "Amitay Rachman", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../../images/amitay_pic.jpg", pics: ["../../images/miele.png", "../../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!", 
commit: "48 hours", working_hours: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [09, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};


washer2 = {name: "Tal Eliram", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../../images/tal_e_pic.png", img_src: "../images/laundry-room-1.jpg", pics: ["../../images/laundry-room-1.jpg", "../../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Tal, and I love to Fold laundry perfectly!", 
commit: "48 hours", working_hours: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [13, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};

washer3 = {name: "Tal Rozentzvi", rating: 3, vertified: true, top_review: "”Better than my mom - Fold the laundry perfectly” (nadav, last week)",
profile_pic: "../../images/tal_r_pic.png", img_src: "../images/laundry-room-1.jpg", pics: ["../../images/tal_r_laundry.jpg", "../../Profile.png"],
location_str: "Reahvia, Jerusalem", location_cor: [31.773610027001155,35.215351837826255],
num_of_reviews: "12", machine_year : "2012",
model_name : "bosch", capacity : "9KG", description: "Hello! I’m Amitay, student at HUJI! discount for soldiers!", 
commit: "48 hours", working_hours: {Sunday: [11,16], Monday: [09, 18],Tuesday: [10, 18],Wednesday: [9, 18],Thursday: [10, 20],Friday: [09, 20],Saturday: [10, 18]}, 
clients_who_review: ['client3', 'client5'] , properties : {white: true, door_2_door : true, ironing : true, access : true}
};

user7 = {name: "Netzer Epstein", drop_off_time: [11,14], rating: 4.5, location: {lat: 31.773610027001155, lng: 35.215351837826255},
wash_setting: {degree: 50, smell: "icy pear"},
favorites: [washer1, washer2,washer3, washer2, washer2, washer2],
img: "../images/netzer pic.png", description: "Hi, my name is Netzer and I don't do any sport so my clothes smell OK :)",
prefer_properties : {white: true, door_2_door : false, ironing : true, access : true}
};



user7 = {name: "Netzer Epstein", drop_off_time: [11,14], rating: 4.5, location: {lat: 31.773610027001155, lng: 35.215351837826255},
wash_setting: {degree: 50, smell: "icy pear"},
favorites: [washer1, washer2,washer3, washer2, washer2, washer2],
img: "../images/netzer pic.png", description: "Hi, my name is Netzer and I don't do any sport so my clothes smell OK :)",
prefer_properties : {white: true, door_2_door : false, ironing : true, access : true}
};

function check_if_open(washer) {
    let date = new Date(); // current time
    let hours = date.getHours();
    let day = date.getDay();
    switch(day) {
        case 0:
            if (washer.working_hours.Sunday[0] <= hours && washer.working_hours.Sunday[1] >= hours) {
                return true;            
            }
            break; 
        case 1:
            if (washer.working_hours.Monday[0] <= hours && washer.working_hours.Monday[1] >= hours) {
                return true;            
            }
            break; 
        case 2:
            if (washer.working_hours.Tuesday[0] <= hours && washer.working_hours.Tuesday[1] >= hours) {
                return true;            
            }
            break;  
        case 3:
            if (washer.working_hours.Wednesday[0] <= hours && washer.working_hours.Wednesday[1] >= hours) {
                return true;            
            }
            break; 
        case 4:
            if (washer.working_hours.Thursday[0] <= hours && washer.working_hours.Thursday[1] >= hours) {
                return true;            
            }
            break; 
        case 5:
            if (washer.working_hours.Friday[0] <= hours && washer.working_hours.Friday[1] >= hours) {
                return true;            
            }
            break; 
        case 6:
            if (washer.working_hours.Saturday[0] <= hours && washer.working_hours.Saturday[1] >= hours) {
                return true;            
            }
            break; 
      }
      return false
}


function get_favorite_washer(washer, counter) {
    washer_block = "<div class='row with_padd'>";
    washer_block += "<div class='col-lg-2'>";
    washer_block += "<div class='profile_pic'><a href='#'><img class='rounded-circle' src=" + washer.profile_pic + "></a></div>";
    washer_block += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src= '../../images/Star.png'>" + washer.rating + "</div>";
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
    if (check_if_open(washer)) {
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
