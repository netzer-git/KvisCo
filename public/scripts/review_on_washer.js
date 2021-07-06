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
  review = document.getElementById("washer_review").value;
}

/**
 * try to add the review to the order, first with photo than without
 */
function add_review_to_order() {
  if (review == null || rating == null) {
    alert("PLEASE RATE AND REVIEW");
  }
  try {
    url = saveImageToUser(photos);
    order = {
      review_washer: review,
      rating_washer: rating,
      laundry_pics: url,
    }    
  }
  catch {
      order = {
        review_user: review,
        rating_user: rating
    }
  }
  console.log(order)
  // add to netzer order df
}