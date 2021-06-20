const ratingStars = [document.getElementsByClassName("rating__star")];


function executeRating(stars) {
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className === starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
executeRating(ratingStars);


var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');
var imageAreaElement = document.getElementById('img-area');
//  Events for image upload.
imageButtonElement.addEventListener('click', function (e) {
  e.preventDefault();
  mediaCaptureElement.click();
});
mediaCaptureElement.addEventListener('change', onMediaFileSelected);


var rating;
var review;

function save_rating(rateID) {
  rating = rateID.value;
  console.log("" ,rating);
}

function save_review_change() {
  review = document.getElementById("user_review").value;
}


function add_review_to_order(id) {
    if (review == "" || rating == null) {
        alert("PLEASE RATE AND REVIEW");
        return;
    }
    new_order = {
        review_user: review,
        rating_user: rating,
    }
    document.getElementById("overlay_review").style.display = "none";
    orderID = document.getElementById(id.id).value
    console.log(orderID);
    setOrderDetails(new_order,orderID);  
    // load_order_blocks_of_washer(getUserToken());
    load_order_blocks_of_washer("5IMy2kMSbheOriFPxqKmKTNWOJ92");
}

// function off() {
//     document.getElementById("overlay_review").style.display = "none";
// }


function display_review_on_user_overlay(id) {
    review_on_user_overlay = '<div class= "review_pink">';
    review_on_user_overlay += '<table><tr><h2 class="header_24">LEAVE A REVIEW</h2></tr>';
    review_on_user_overlay += '<tr><div class= "header_51">Rate your experience</div></tr>';
    review_on_user_overlay += '<tr><th><div class="rate">';
    review_on_user_overlay += '<input type="radio" id="star5" name="rate" value="5" onchange="save_rating(this)" />';
    review_on_user_overlay += '<label for="star5" title="text">5 stars</label>'; 

    review_on_user_overlay += '<input type="radio" id="star4" name="rate" value="4" onchange="save_rating(this)" />';
    review_on_user_overlay += '<label for="star4" title="text">4 stars</label>'; 

    review_on_user_overlay += '<input type="radio" id="star3" name="rate" value="3" onchange="save_rating(this)" />';
    review_on_user_overlay += '<label for="star3" title="text">3 stars</label>';  

    review_on_user_overlay += '<input type="radio" id="star2" name="rate" value="2" onchange="save_rating(this)" />';
    review_on_user_overlay += '<label for="star2" title="text">2 stars</label>'; 

    review_on_user_overlay += '<input type="radio" id="star1" name="rate" value="1" onchange="save_rating(this)" />';
    review_on_user_overlay += '<label for="star1" title="text">1 stars</label>'; 

    review_on_user_overlay += '</div></th></tr>';
    review_on_user_overlay += '<tr><th><div class= "header_51">Share your thoughts and feelings</div></th></tr>';
    review_on_user_overlay += '<tr><th><textarea id="user_review" class="user_review" name="user_review" rows="3" cols="50" placeholder=" place your review here..." value = "" onchange="save_review_change()"></textarea><br><br>';
    review_on_user_overlay += '</th></tr>';
    review_on_user_overlay += '<tr><th><button onclick="add_review_to_order('+id.id+')" class="yellow_button_4">Leave Review</button></th></tr>';
    review_on_user_overlay += '</table></div>'; 
    document.getElementById("user_review_block").innerHTML = review_on_user_overlay;
    // document.getElementById("overlay_review").style.display = "block";

}