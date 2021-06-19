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
 * the function takes docID - the id of the user - and resolve a promise of the document of the user.
 * the function does not return the doc, it returns the promise.
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
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

/**
 * @param {*} doc user or washer document
 */
function getRatingFromDoc(doc) {
    if (doc.data().rating_sum == 0) {
        return 0;
    } else {
        return doc.data().rating_sum / doc.data().rating_num;
    }
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
function promiseOrderArrayByWasherIdAndStatus(washerId, status) {
    return promiseOrderArrayByFieldIdAndStatus("washer", washerId, status);
}

/*
 * the function takes userID and resolves a promise of multiple orders (of the current washer) by specific given status
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseOrderArrayByUserIdAndStatus(userId, status) {
    return promiseOrderArrayByFieldIdAndStatus("user", userId, status);
}


/**
 * creates new order from order object and saves it to firestore server.
 * @param {*} order : basic order object
 */
async function createNewOrder(order) {
    // let user = await db.doc('users/' + order.userID);
    // let washer = await db.doc('washers/' + order.washerID);
    let newOrderRef = await db.collection("orders").add({
        user: db.doc('users/' + order.user),
        washer: db.doc('washers/' + order.washer),
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
        comments: order.comments,
        wash_settings: order.wash_settings,
    });
    return newOrderRef.id;
}

/**
 * update the details of specific order
 * @param {*} orderDetails order details dict
 * @param {*} orderId order id
 */
async function setOrderDetails(orderDetails, orderId) {
    let washer = await db.collection('orders').doc(orderId);
    await washer.update(orderDetails).catch((err) => {
        console.error("error updating order details: " + err);
    });
}

/**
 * creating new washer doc from washer registration object
 * @param {*} washer washer registration object
 */
async function createNewWasher(washer) {
    coordinates = forwardGeocode("Israel " + washer.city + " " + washer.street + " " + washer.number);
    db.collection("washers").doc(getUserToken()).set({
        name: washer.name,
        rating_sum: 0,
        rating_num: 0,
        imageUrl: washer.imageUrl,
        pics: washer.pics,
        location_str: washer.location_str,
        location_cor: forwardGeocodePromise(washer.location_str).results[0].geometry,
        machine_type: washer.machine_type,
        description: washer.description,
        commitment: washer.commitment,
        opening_times: {},
        price: 0, // fixme for milestone 3
        properties: washer.properties,
        phone: washer.phone
    }).then((docRef) => {
        console.log("New order added: " + docRef);
    });
}

/**
 * update the open times of specific washer
 * @param {*} openTimes dict of opening times
 * @param {*} washerId washer id
 */
async function setWasherOpenTimes(openTimes, washerId) {
    let washer = await db.collection('washers').doc(washerId);
    await washer.update({
        opening_time: openTimes
    });
}

/**
 * create new user from the current user (on auth) and basic user object
 * please notice: the user needs to be signed in (in auth) while creating new user (on firestore)
 * @param {object} user : basic user object (from auth)
 */
function createNewUser(user) {
    db.collection("users").doc(getUserToken()).set({
        name: user.name,
        location_str: user.location_str,
        location_cor: forwardGeocodePromise(user.location_str).results[0].geometry,
        saved_washers: [],
        cover_photo: user.cover_photo,
        rating_sum: 0,
        rating_num: 0,
        phone: user.phone,
        description: user.description,
    }).then((docRef) => {
        console.log("New order added: " + docRef);
    });
}

/**
 * Saves a new image containing to user folder in firestorage. This first saves the image in Firebase storage.
 * @param {*} file image file
 * @return {string} image url path to firebase storage
 */
async function saveImageToUser(file) {
    if (!isUserSignedIn()) {
        console.error("You are trying to upload a picture to undefined user");
    }
    else {
        if (file === null) {
            console.error("You are trying to upload an empty file");
            return null;
        }
        let filePath = getUserToken() + '/' + file.name;
        let fileSnapshot = await storage.ref(filePath).put(file);
        let url = await fileSnapshot.ref.getDownloadURL();
        return url;
    }
    
}

/**
 * Saves a new image containing an image in Firebase. This first saves the image in Firebase storage.
 * @param {*} file image file
 * @param {string} orderId the id of the current order
 * @return {string} image url path to firebase storage
 */
 async function saveImageToOrder(file, orderId) {
        if (file === null) {
            console.error("You are trying to upload an empty file");
            return null;
        }
        let filePath = orderId + '/' + file.name;
        let fileSnapshot = await storage.ref(filePath).put(file);
        let url = await fileSnapshot.ref.getDownloadURL();
        return url;
}

/**
 * the function takes filters obj with specific fields and returns all of the relevant washer docs any possible filter combination.
 * @param {*} filters filters obj
 * @returns array of washers
 */
async function getWasherFilterQuery(filters) {
    var filteredWashers = [];
    let washersArray = await db.collection('washers').get();
    let firstQuery = true;

    if (filters.commitment !== undefined) {
        let filteredWashersWithCommitment = [];
        await db.collection('washers').where(commitment, "<=", filters.commitment).get().forEach(doc => {
            filteredWashersWithCommitment.push(doc);
        });
        filteredWashers = firstQuery ? filteredWashersWithCommitment : intersection(filteredWashers, filteredWashersWithCommitment);
        firstQuery = false;
    }
    if (filters.rating !== undefined) {
        let filteredWashersWithRating = [];
        washersArray.forEach(doc => {
            if (getRatingFromDoc(doc) >= filters.rating) {
                filteredWashersWithRating.push(doc);
            }
        });
        filteredWashers = firstQuery ? filteredWashersWithRating : intersection(filteredWashers, filteredWashersWithRating);
        firstQuery = false;
    }

    if (filters.distance !== undefined) {
        let filteredWashersWithDistance = [];
        currentPoint = null; // fixme
        washersArray.forEach(doc => {
            if (getDistanceFromLatLonInKm(currentPoint, doc.location_cor) <= filters.distance) {
                filteredWashersWithDistance.push(doc);
            }
        });
        filteredWashers = firstQuery ? filteredWashersWithDistance : intersection(filteredWashers, filteredWashersWithDistance);
        firstQuery = false;
    }

    if (filters.specialService !== undefined) {
        let filteredWashersWithSpecialService = [];
        washersArray.forEach(doc => {
            // need to fix in case of adding multiple properties
            if (doc.data().properties == filters.specialService[0]) {
                filteredWashersWithSpecialService.push(doc);
            }
        });
        filteredWashers = firstQuery ? filteredWashersWithSpecialService : intersection(filteredWashers, filteredWashersWithSpecialService);
        firstQuery = false;
    }

    if (filters.openTime !== undefined) {
        let filteredWashersWithOpenTime = [];
        washersArray.forEach(doc => {
            if (true) { // ????
                filteredWashersWithOpenTime.push(doc);
            }
        });
        filteredWashers = firstQuery ? filteredWashersWithOpenTime : intersection(filteredWashers, filteredWashersWithOpenTime);
        firstQuery = false;
    }

    return filteredWashers;
}