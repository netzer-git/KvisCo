
/**
 * display inner blocks of reviews on user
 * @param {array of orders objects} all_orders all reviews on specific user with status "finished"
 */
 async function f_display_user_reviews(all_orders) {
    all_reviews = "";
    for (var j = 0; j < all_orders.length; j++) {
        if (all_orders[j].data().user_review != null && all_orders[j].data().user_rating != null) {
            const washer_that_review = await all_orders[j].data().washer.get(); // to FIX take washer by string
            // here start block of review
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-6'>";
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-1'>";
            all_reviews += "</div>";
            all_reviews += "<div class='col-2'>";
            all_reviews += "<div class='profile_pic'><a href='#'><img class='rounded-circle-small' src=" + washer_that_review.data().imageUrl + "></a></div>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-6'>";
            all_reviews += "<div class='location'>" + washer_that_review.data().name + "</div>";
            all_reviews += '</div>';
            all_reviews += "<div class='col-3'>";
            all_reviews += "<div class='location'><img style='margin-bottom:8px; margin-right: 5px;' src='../images/Star_yellow.png'>" + all_orders[j].data().rating_washer + "</div>";
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += "<div class='row'>";
            all_reviews += "<div class='col-3'>"
            all_reviews += '</div>';
            all_reviews += "<div class='col-9'>";
            all_reviews += "<div class='reviews_text'>" + all_orders[j].data().review_user + "</div>";
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += "<div class='col-6'>";
            all_reviews += '</div>';
            all_reviews += '</div>';
            all_reviews += '<hr style="border: 2px solid #000000">';
        }
    }
    if (all_reviews == "") {
        all_reviews += "<h4> there are no reviews yet </h4>";
    }
    all_reviews += '</div>';
    document.getElementById("my_reviews").innerHTML = all_reviews;
}