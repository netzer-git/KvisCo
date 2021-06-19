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
var photo;

function save_rating(rateID) {
  rating = rateID.value;
  // console.log(rating);
}

function save_pic(event) {
  var photo = event.target.files[0]; 
  console.log(photo);
}

function save_review_change() {
  review = document.getElementById("washer_review").value;
}


function add_review(on_who) {
  if (review == null || rating == null) {
    alert("PLEASE RATE AND REVIEW");
  }
  try {
    order = {
      review_washer: review,
      rating_washer: rating,
      laundry_pics: photo,
    }    
  }
  catch {
    if (on_who == "on_washer") {
      order = {
        review_washer: review,
        rating_washer: rating,
      }
    }
    if (on_who == "on_user") {
      order = {
        review_user: review,
        rating_user: rating
      }
    }
  }
  console.log(order)
  // add to netzer order df
}