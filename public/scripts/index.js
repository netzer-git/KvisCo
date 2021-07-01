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
/*
* Another Syntax Option!!!!
*/
// async keyword
async function exampleGettingUserDataIntoHTML2() {
    const myOnlyOneElement = document.getElementById('only-one');
    const ourWasherId = 'aNRkJUTtxoVQTSFNLxS7';
    let newContent = '';
    // using the right promise func - washer
    // await keyword - waiting for the promise to resolve
    const washerDoc = await promiseWasherLoaderById(ourWasherId);
    // in our function, washerDoc is the washer document and washerDoc.data() is the json object
    // no doc found
    if (!washerDoc) {
        // pay attention to html and css tags in the string, when it renders to the page - the tags works
        newContent = '<h3 style="color:red"> We are Sorry, it seems like the washer is not in our systems</h3>';
        // Tip! this is a way that we can check if the currentUser (meaning the authentication user) has all of its fields
        // if we are here (in this if block) it means that there is no user\washer for the ourWasherId in our collection.
        // taking ID from currentUser -> checking if !washerDoc -> if not, currentUser is not in users or washers collection
    }
    else {
        // using washerDoc.data() fields to create html elements
        newContent += "<p>Our Washer is <h5>" + washerDoc.data().name + "</h5></p>";
        newContent += "<p>About myself:</p><p>" + washerDoc.data().description + "</p></br>";
        // using the helper method from above to get rating (its not different! the method uses the same syntax, just above)
        newContent += "<div id='rating'> Rating: " + getWasherRatingFromDoc(washerDoc) + "</div>";
    }
    // updating myOnlyOneElement with new html content
    myOnlyOneElement.innerHTML = newContent;
}


/* ======================================================================== */
// var imageButtonElement = document.getElementById('submitImage');
// var imageFormElement = document.getElementById('image-form');
// var mediaCaptureElement = document.getElementById('mediaCapture');
var imageAreaElement = document.getElementById('img-area');

//  Events for image upload.
// imageButtonElement.addEventListener('click', function(e) {
//     e.preventDefault();
//     mediaCaptureElement.click();
//   });
// mediaCaptureElement.addEventListener('change', saveImageToUser);

var helloField = "Hello";
var helloElement = document.getElementById('hello');
var photoFile = null;
var mediaCapture = document.getElementById('mediaCapture');

function updateFormFields(event) {
    helloField = helloElement.value;
    if (event !== null) {
        photoFile = event.target.files[0];
    }
}

async function submitPhotoForm() {
    url = await saveImageToUser(photoFile);
    // create \ update user \ order
    console.log("hello: " + helloField + "url: " + url);
}

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


var order1 = {
    userID: "c0KmkCafo7bZmCcZvW2Nr7NqgDK2",
    washerID: "1LhDqVKzSkZdsnSC6wFrVG5jte93",
    price: 50,
    loads: 3,
    properties: "default",
    due_to: new Date(),
    comments: "They created me from the computer",
}

const testNadavQuery = async () => {
    // var address = await forwardGeocodePromise("Israel, Jerusalem, Keren HaYesod 2");
    // let data = await forwardGeocodePromise("Israel, Jerusalem, Keren HaYesod 2");
    // let geoPoint = {lat: data.results[0].geometry.lat, lng: data.results[0].geometry.lng};
    // console.log(geoPoint);
    // document.getElementById("only-one").innerHTML = JSON.stringify(response);
    // filters = {commitment: 80};
    // wArray = await getWasherFilterQuery(filters);
    // wArray.forEach((w) => console.log(w.data()));
    // setWasherOpenTimes({ 'Sunday': ["11:15", "11:45"], Friday: ["10:00", "15:00"] }, '27NLOVty9HfZRlWwrfuK');
    const nadavDoc = await promiseUserLoaderById('5IMy2kMSbheOriFPxqKmKTNWOJ92')
    let r = await getRatingFromDoc(nadavDoc, 'user');
    console.log("rating is now: " + r)
}

const test_rating = async () => {
    const me = await promiseWasherLoaderById('c0KmkCafo7bZmCcZvW2Nr7NqgDK2');
    //console.log(me.data());
    const rating = await getRatingFromDoc(me, 'washer');
    console.log("*******************");
    const order_array = await promiseOrderArrayByWasherIdAndStatus(me.id, 'finished');
    console.log("*******************");
    for (o of order_array) {
        console.log(o.data());
    }
    console.log("RATING: " + rating)
}