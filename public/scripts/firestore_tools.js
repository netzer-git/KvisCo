'use strict';

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
var currentWasher = null;

/*
* the function takes docID - the id of the washer - and resolve a promise of the document of the washer.
* the function does not return the doc, it returns the promise.
* USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
*/
function promiseWasherLoaderById(documentID) {
    return new Promise((resolve, reject) => {
        var query = db.collection('washers').doc(documentID);
        
        query.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data());
                currentWasher = doc.data();
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
* the function takes docID - the id of the user - and resolve a promise of the document of the user.
* the function does not return the doc, it returns the promise.
* USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
*/
function promiseUserLoaderById(documentID) {
    return new Promise((resolve, reject) => {
        var query = db.collection('users').doc(documentID);
        
        query.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data());
                currentWasher = doc.data();
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
* the function takes doc from washers collection (the resolve of a promise!), and gets the washer rating
*/
function getWasherRatingFromDoc(doc) {
    return doc.data().rating_sum / doc.data().rating_num;
}