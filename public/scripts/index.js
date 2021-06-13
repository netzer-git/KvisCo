/*
* this function is an example, we are using the tag 'only-one' in index.html (take a look at the page!)
* we are changing the content of the html to contain the data of 'aNRkJUTtxoVQTSFNLxS7' - which is a washer
*
* all of the function that we are using are from scripts/firestore_tools.js
*/
function exampleGettingUserDataIntoHTML() {
    const myOnlyOneElement = document.getElementById('only-one');
    const ourWasherId = 'aNRkJUTtxoVQTSFNLxS7';
    let newContent = '';
    // using the right promise func - washer
    // using .then keyword to make the arrow function (meaning (doc)=>{} function) to work after the promise is resolved
    promiseWasherLoaderById(ourWasherId).then( (doc) => {
        // in our function, doc is the washer document and doc.data() its the json object

        // no doc found
        if (!doc) {
            // pay attention to html and css tags in the string, when it renders to the page - the tags works
            newContent = '<h3 style="color:red"> We are Sorry, it seems like the washer is not in our systems</h3>';

            // Tip! this is a way that we can check if the currentUser (meaning the authentication user) has all of its fields
            // if we are here (in this if block) it means that there is no user\washer for the ourWasherId in our collection.
            // taking ID from currentUser -> checking if !doc -> if not, currentUser is not in users or washers collection
        }
        else {
            // using doc.data() fields to create html elements
            newContent += "<p>Our Washer is <h5>" + doc.data().name + "</h5></p>";
            newContent += "<p>About myself:</p><p>" + doc.data().description + "</p></br>";
            // using the helper method from above to get rating (its not different! the method uses the same syntax, just above)
            newContent += "<div id='rating'> Rating: " + getWasherRatingFromDoc(doc) + "</div>";
        }
        // updating myOnlyOneElement with new html content
        myOnlyOneElement.innerHTML = newContent;
    })
}


/* ======================================================================== */
var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');
var imageAreaElement = document.getElementById('img-area');
// Events for image upload.
imageButtonElement.addEventListener('click', function(e) {
    e.preventDefault();
    mediaCaptureElement.click();
  });
mediaCaptureElement.addEventListener('change', onMediaFileSelected);

function displayImage() {
    if (isUserSignedIn()) {
        promiseUserLoaderByCurrentUserID().then((doc) => {            
            console.log('in!');
            newContent = '<img src="' + doc.data().imageUrl + '" width="500" height="600">';            
            console.log(newContent);
            imageAreaElement.innerHTML = newContent;
        });
    }
    else {
        console.log("You are not connected");
    }
}