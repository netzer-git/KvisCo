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


var rating;
var review;

function save_rating(rateID) {
  rating = rateID.value;
  console.log("", rating);
}

function save_review_change() {
  review = document.getElementById("user_review").value;
}


async function add_review_to_order() {
  console.log(review, rating);
  var orderID = sessionStorage.getItem("order that get review now");
  if (review == "" || rating == null) {
    alert("PLEASE RATE AND REVIEW");
    return;
  }
  new_order = {
    review_user: review,
    rating_user: Number(rating),
  }
  document.getElementById("overlay_review").style.display = "none";
  await setOrderDetails(new_order, orderID);
  var washerID = sessionStorage.getItem("signed_in_washer");
  await insert_orders_blocks_of_washer("in_process_orders", washerID, "processing"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
  await insert_orders_blocks_of_washer("finished_orders", washerID, "finished"); // function in order_blocks_user.js that insert all "finished" into div "finished_orders" 
  await f_display_washer_reviews(washerID)
}


async function display_review_on_user_overlay(orderID) {
  let order_doc = await promiseOrderLoaderById(orderID);
  let user_doc = await promiseUserLoaderById(order_doc.data().user)

  review_on_user_overlay = '<div class="cardo"><div class="row">';
  review_on_user_overlay += '<div class="col-1"></div>';
  review_on_user_overlay += '<div class="col-11">';
  review_on_user_overlay += '<div class="row">';
  review_on_user_overlay += '<div class="col-11">';
  review_on_user_overlay += '<h7 style="margin-left:0%;">Add a comment</h7></div>';
  review_on_user_overlay += '<div class="col-1"><button type="button" class="btn-close" aria-label="Close" onclick="off_review()"></button></div></div>';
  review_on_user_overlay += '<div class="row" style="margin-left: -2%; margin-top: 0%;">';
  review_on_user_overlay += '<div class="col-6">';
  review_on_user_overlay += '<div class="rating" style="margin-right: 100px;"><input type="radio" name="rating" value="5" id="5" onchange="save_rating(this)"><label for="5">☆</label><input type="radio" name="rating" value="4" id="4" onchange="save_rating(this)"><label for="4">☆</label><input type="radio" name="rating" value="3" id="3" onchange="save_rating(this)"><label for="3">☆</label><input type="radio" name="rating" value="2" id="2" onchange="save_rating(this)"><label for="2">☆</label><input type="radio" name="rating" value="1" id="1" onchange="save_rating(this)"><label for="1">☆</label></div></div></div>';
  review_on_user_overlay += '<div class="col-6"></div>';
  review_on_user_overlay += '<div class="comment-area"> <textarea class="form-control" style="height: 115px; width:350px; font-size: 16px;" placeholder="How was your experience?" rows="4" id="user_review" value = "" onchange="save_review_change()"></textarea> </div>'
  review_on_user_overlay += '<div class="comment-btns mt-2">';
  review_on_user_overlay += '<div class="row"><div class="col-6"></div><div class="col-6">';
  review_on_user_overlay += '<div class="pull-right"> <button class="b-small" onclick="add_review_to_order()">Send <i class="fa fa-long-arrow-right ml-1"></i></button></div>'
  review_on_user_overlay += '</div></div></div></div></div></div></div>';
  sessionStorage.setItem("order that get review now", orderID);
  document.getElementById("user_review_block").innerHTML = review_on_user_overlay;
  document.getElementById("overlay_review").style.display = "block";
}

function off() {
  document.getElementById("overlay_thank_you").style.display = "none";
}

function off_review() {
  document.getElementById("overlay_review").style.display = "none";
}