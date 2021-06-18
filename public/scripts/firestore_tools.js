'use strict';

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});
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
                console.log("Document found: ", doc.uid);
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
 * USAGE: promiseUserLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseUserLoaderById(documentID) {
    return promiseLoaderByCollectionAndId('users', documentID);

}

/*
 * the function takes docID - the id of the order - and resolve a promise of the document of the order.
 * the function does not return the doc, it returns the promise.
 * USAGE: promiseOrderLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseOrderLoaderById(documentID) {
    return promiseLoaderByCollectionAndId('orders', documentID);

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
function getRatingFromDoc(doc) {
    return doc.data().rating_sum / doc.data().rating_num;
}

/*
 * the function takes washerID and resolves a promise of multiple orders (of the current washer) by specific given status
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseOrderArrayByFieldIdAndStatus(field, docID, status) {
    return new Promise((resolve, reject) => {
        const collection = field + "s";
        // to look for doc-ref field, you have to get the ref
        const washerRef = db.collection(collection).doc(docID);
        if (status === "all") {
            var query = db.collection('orders').where(field, "==", washerRef).orderBy("created_at");
        } else if (status === "processing") {
            var query = db.collection('orders').where(field, "==", washerRef).where('status', '!=', "finished").orderBy("created_at");
        } else {
            var query = db.collection('orders').where(field, "==", washerRef).where('status', '==', status).orderBy("created_at");
        }

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

/*
 * the function takes washerID and resolves a promise of multiple orders (of the current washer) by specific given status
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseOrderArrayByWasherIdAndStatus(washerID, status) {
    return promiseOrderArrayByFieldIdAndStatus("washer", washerID, status);
}

/*
 * the function takes userID and resolves a promise of multiple orders (of the current washer) by specific given status
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseOrderArrayByUserIdAndStatus(userID, status) {
    return promiseOrderArrayByFieldIdAndStatus("user", userID, status);
}

/**
 * creates new order from order object and saves it to firestore server.
 * @param {*} order : basic order object
 */
function createNewOrder(order) {
    db.collection("orders").add({
        user: db.doc('users/' + order.userID),
        washer: db.doc('washers/' + order.washerID),
        due_to: order.due_to,
        created_at: new Date(),
        price: order.price,
        status: "pending",
        loads: order.loads,
        rating_washer: null,
        rating_user: null,
        review_washer: null,
        review_user: null,
        properties: order.properties,
        laundry_pic: null,
        comments: null,
    }).then((docRef) => {
        console.log("New order added: " + docRef);
    })
}

/**
 * create new user from the current user (on auth) and basic user object
 * please notice: the user needs to be signed in (in auth) while creating new user (on firestore)
 * @param {object} user : basic user object
 */
function createNewUser(user) {
    db.collection("users").doc(getUserToken()).set({
        name: user.name,
        location_str: user.location_str,
        location_cor: forwardGeocode(user.location_str),
        saved_washers: [],
        cover_photo: user.cover_photo,
        rating_sum: 0,
        rating_num: 0
    }).then((docRef) => {
        console.log("New order added: " + docRef);
    })
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
    }).catch(function (error) {
        console.error('There was an error uploading a file to Cloud Storage:', error);
    });
}

