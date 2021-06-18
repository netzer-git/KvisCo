
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
img: "../images/netzer pic.png", description: "Hi, my name is Netzer and I don't do any sport so my clothes smell OK :)",
prefer_properties : {white: true, door_2_door : false, ironing : true, access : true}
};

function show_profile_header(tag, profile) {
    profile_header = '<div class="row"><div class="col-lg-6">';
    profile_header += '<div class="row"><div class="col-1"></div>';
    profile_header += '<div class="col-3"><div class="profile_pic"><a href="#"><img class="rounded-circle-big" src=' + profile.profile_pic + '></a></div></div>';
    profile_header += '<div class="col-8"><div class="row"><div class="profile_pic">';
    profile_header += '<table class="table-search"><tr><h4>'+ profile.name +'</h4></tr></tr>';
    profile_header += '<tr><div class="description">'+profile.description+'</div></tr>';
    profile_header += '</table></div></div>';
    profile_header += '<div class="row">';
    profile_header += '<div class="col-7"><div class="location">'+profile.location_str+'</div></div>';   
    profile_header += '<div class="col-5"><div class="location"><img class="rating-star" src="../images/Star.png">'+ profile.rating + '</div></div>';       
    profile_header += '</div></div></div>';  
    document.getElementById(tag).innerHTML = profile_header;               
}