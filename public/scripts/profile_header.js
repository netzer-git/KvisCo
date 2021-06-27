


/**
 * display block of the washer header - his name, description and profile picture
 * also display pics he uploaded if there are 
 * @param {string} washerID id of washer
 */
async function load_profile_header_of_washer(washer_doc) {
    const rating = await getRatingFromDoc(washer_doc, "washer");
    washer_header = '<div class="row"><div class="col-1"></div>';
    washer_header += '<div class="col-3"><div class="profile_pic"><img class="rounded-circle-big" src="' + washer_doc.data().imageUrl + '"></div></div>';
    washer_header += '<div class="col-8"><div class="row"><div class="profile_pic">';
    washer_header += '<table class="table-search"><tr><h4>'+ washer_doc.data().name +'</h4></tr></tr>';
    washer_header += '<tr><div class="description">'+washer_doc.data().description +'</div></tr>';
    washer_header += '</table></div></div>';
    washer_header += '<div class="row">';
    washer_header += '<div class="col-7"><div class="location">'+washer_doc.data().location_str+'</div></div>';   
    washer_header += '<div class="col-5"><div class="location"><img class="rating-star" src="../images/Star_yellow.png">'+ rating + '</div></div>';   
    washer_header += '</div></div></div>';  
    washer_header += '<div class="row"><div class="col-2"></div><div class="col-10">';
    if (washer_doc.data().pics !== undefined) {
        for (i=0; i<washer_doc.data().pics.length; i++) {
            washer_header += '<img class="image-1" src="'+ washer_doc.data().pics[i] +'">';
        }
    }
    washer_header += '</div>';
    document.getElementById("profile_header").innerHTML = washer_header;   
}

/**
 * display block of the user header - his name, description and profile picture
 * called from user_details.js
 * use from user_doc imageUrl, name, description, location_str, rating
 * @param {user_object} user_doc object of user 
 */
async function load_profile_header_of_user(user_doc) {
    var rating = await getRatingFromDoc(user_doc, "user");
    user_header = '<div class="row"><div class="col-1"></div>';
    user_header += '<div class="col-3"><div class="profile_pic"><img class="rounded-circle-big" src="' + user_doc.data().imageUrl + '"></div></div>';
    user_header += '<div class="col-8"><div class="row"><div class="profile_pic">';
    user_header += '<table class="table-search"><tr><h4>'+ user_doc.data().name +'</h4></tr></tr>';
    user_header += '<tr><div class="description">'+user_doc.data().description +'</div></tr>';
    user_header += '</table></div></div>';
    user_header += '<div class="row">';
    user_header += '<div class="col-7"><div class="location">'+user_doc.data().location_str+'</div></div>';   
    user_header += '<div class="col-5"><div class="location"><img class="rating-star" src="../images/Star_yellow.png">'+ rating + '</div></div>';       
    user_header += '</div></div></div>';  ;
    document.getElementById("profile_header").innerHTML = user_header;  
}