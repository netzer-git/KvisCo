var is_review_photo_uploaded = false ;

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
var photos;


/**
 * update the current rating
 * @param {input object} rateID rate object with value of the current id
 */
function save_rating(rateID) {
  console.log(review, rating);
  rating = rateID.value;
}

/**
 * save the photo object in photos var, and change review_photo_uploaded to true
 * @param {event of upload photo} event the event with target.files[0] that is the photo
 */
function save_photo(event) {
  if (event != null) {
    photos = event.target.files[0];
    is_review_photo_uploaded = true
    if (is_review_photo_uploaded) {
        document.getElementById("indicator5").style.display = "block";
    }
      // document.getElementById("checkmark").innerHTML = "<i class='bi bi-check'></i>";
  }
}

/**
 * save the review
 */
function save_review_change() {
  console.log(review, rating);
  review = document.getElementById("washer_review").value;
}

/**
 * try to add the review to the order, first with photo than without
 */
 async function add_review_to_order() {
  console.log(review, rating);
    var orderID = sessionStorage.getItem("order that get review now");
    if (review == null || rating == null) {
        alert("PLEASE RATE AND REVIEW");
        return;
    }
    new_order = {
        review_washer: review,
        rating_washer: Number(rating),
    }
    document.getElementById("overlay_review").style.display = "none";
    await setOrderDetails(new_order,orderID);  
    var userID = sessionStorage.getItem("current_user_id");
    await insert_orders_blocks_of_user("in_process_orders", userID, "processing"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    await insert_orders_blocks_of_user("finished_orders", userID, "finished");   // function in order_blocks_user.js that insert all "finished" into div "finished_orders" 
    await f_display_user_reviews(userID)
}

async function display_review_on_washer_overlay(orderID) {
  let order_doc = await promiseOrderLoaderById(orderID);
  let washer_doc = await promiseUserLoaderById(order_doc.data().washer)

  review_on_washer_overlay = '<div class="cardo"><div class="row">';
  review_on_washer_overlay += '<div class="col-1"></div>';
  review_on_washer_overlay += '<div class="col-11">';
  // review_on_washer_overlay += '<div class="comment-box ml-2">';
  review_on_washer_overlay += '<div class="row">';
  review_on_washer_overlay += '<div class="col-11">';
  review_on_washer_overlay += '<h7 style="margin-left:0%;">Add a comment</h7></div>';
  review_on_washer_overlay += '<div class="col-1"><button type="button" class="btn-close" aria-label="Close" onclick="off_review()"></button></div></div>';
  review_on_washer_overlay += '<div class="row" style="margin-left: -2%; margin-top: 0%;">';
  // review_on_washer_overlay += '<div class="col-2" style="font-size: 16px"></div>';
  review_on_washer_overlay += '<div class="col-6">';
  review_on_washer_overlay += '<div class="rating" style="margin-right: 100px;"><input type="radio" name="rating" value="5" id="5" onchange="save_rating(this)"><label for="5">☆</label><input type="radio" name="rating" value="4" id="4" onchange="save_rating(this)"><label for="4">☆</label><input type="radio" name="rating" value="3" id="3" onchange="save_rating(this)"><label for="3">☆</label><input type="radio" name="rating" value="2" id="2" onchange="save_rating(this)"><label for="2">☆</label><input type="radio" name="rating" value="1" id="1" onchange="save_rating(this)"><label for="1">☆</label></div></div></div>';
  review_on_washer_overlay += '<div class="col-6"></div>';
  review_on_washer_overlay += '<div class="comment-area"> <textarea class="form-control" style="height: 115px; width:350px; font-size: 16px;" placeholder="How was your experience?" rows="4" id="washer_review" value = "" onchange="save_review_change()"></textarea> </div>'
  review_on_washer_overlay += '<div class="comment-btns mt-2">';
  review_on_washer_overlay += '<div class="row"><div class="col-6"></div><div class="col-6">';
  review_on_washer_overlay += '<div class="pull-right"> <button class="b-small" onclick="add_review_to_order()">Send <i class="fa fa-long-arrow-right ml-1"></i></button></div>'
  review_on_washer_overlay += '</div></div></div></div></div></div></div>';
  sessionStorage.setItem("order that get review now", orderID);
  document.getElementById("washer_review_block").innerHTML = review_on_washer_overlay;
  document.getElementById("overlay_review").style.display = "block";
}

function off() {
  document.getElementById("overlay_thank_you").style.display = "none";
}

function off_review() {
  document.getElementById("overlay_review").style.display = "none";
}
