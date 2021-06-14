'use strict';

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
const storage = firebase.storage();


/*
* the function takes docID and collection name and resolve a promise of the document.
* the function does not return the doc, it returns the promise.
* USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
*/
function promiseLoaderByCollectionAndId(collection, documentID) {
    return new Promise((resolve, reject) => {
        var query = db.collection(collection).doc(documentID);
        
        query.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data());
                resolve(doc);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                resolve(null);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    })
}

/*
* the function takes docID - the id of the washer - and resolve a promise of the document of the washer.
* the function does not return the doc, it returns the promise.
* USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
*/
function promiseWasherLoaderById(documentID) {
    return promiseLoaderByCollectionAndId('washers', documentID);
}

/*
* the function takes docID - the id of the user - and resolve a promise of the document of the user.
* the function does not return the doc, it returns the promise.
* USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
*/
function promiseUserLoaderById(documentID) {
    return promiseLoaderByCollectionAndId('users', documentID);

}


/*
* the function resolve a promise of the document of the current user based on the Auth system.
* the function does not return the doc, it returns the promise.
* USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
*/
function promiseUserLoaderByCurrentUserID() {
    console.log(getUserToken());
    return promiseLoaderByCollectionAndId('users', getUserToken());
}

/*
* the function resolve a promise of the document of the current washer based on the Auth system.
* the function does not return the doc, it returns the promise.
* USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
*/
function promiseWasherLoaderByCurrentUserID() {
    return promiseLoaderByCollectionAndId('washers', getUserToken());
}

/*
* the function takes doc from washers collection (the resolve of a promise!), and gets the washer rating
*/
function getWasherRatingFromDoc(doc) {
    return doc.data().rating_sum / doc.data().rating_num;
}

/*
* the function takes washerID and resolves a promise of multiple orders (of the current washer) by specific given status
* USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
*/
function promiseOrderArrayByWasherIdAndStatus(washerID, status) {
    return new Promise((resolve, reject) => {
        // to look for doc-ref field, you have to get the ref
        const washerRef = db.collection("washers").doc(washerID);
        var query = db.collection('orders').where("washer", "==", washerRef).where('status', '==', status).orderBy("created_at");

        query.get().then((docArray) => {
            const orderArray = [];
            //console.log("docArray");
            //console.log(docArray);
            docArray.forEach((doc) => {
                if (doc.exists) {
                    console.log("doc")
                    console.log(doc.data())
                    orderArray.push(doc);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            resolve(orderArray);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    });
}


// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageToUser(file) {

    let filePath = getUserToken() + '/' + file.name;

    storage.ref(filePath).put(file).then((fileSnapshot) => {
        fileSnapshot.ref.getDownloadURL().then((url) => {
            db.collection('users').doc(getUserToken()).update({
                imageUrl: url,
                storageUrl: fileSnapshot.metadata.fullPath
            })
        });
    }).catch(function(error) {
        console.error('There was an error uploading a file to Cloud Storage:', error);
      });
  }

function onMediaFileSelected(event) {
  event.preventDefault();
  var file = event.target.files[0];

  // Clear the selection in the file picker input.
  imageFormElement.reset();

  // Check if the file is an image.
  if (!file.type.match('image.*')) {
    console.log("That's not an image");
  }
  else if (isUserSignedIn()) {
    saveImageToUser(file);
    console.log('out!')
  }
  else {
    console.log("You are not connected");
  }
}