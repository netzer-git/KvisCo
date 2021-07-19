'use strict';

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});
const storage = firebase.storage();


/**
 * the function takes docID and collection name and resolve a promise of the document.
 * the function does not return the doc, it returns the promise.
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseLoaderByCollectionAndId(collection, documentID) {
    return new Promise((resolve, reject) => {
        var query = db.collection(collection).doc(documentID);

        query.get().then((doc) => {
            if (doc.exists) {
                // debug: console.log("Document found: ", doc.id);
                resolve(doc);
            } else {
                // doc.data() will be undefined in this case
                // debug: console.log("No such document!");
                resolve(null);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    })
}

/**
 * the function takes docID - the id of the washer - and resolve a promise of the document of the washer.
 * the function does not return the doc, it returns the promise.
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseWasherLoaderById(documentID) {
    return promiseLoaderByCollectionAndId('washers', documentID);
}

/**
 * the function takes docID - the id of the user - and resolve a promise of the document of the user.
 * the function does not return the doc, it returns the promise.
 * USAGE: promiseUserLoaderById(docID).the  n(doc => { // do something with.doc.data })
 */
function promiseUserLoaderById(documentID) {
    return promiseLoaderByCollectionAndId('users', documentID);
}

/**
 * the function takes docID - the id of the user - and resolve a promise of the document of the user.
 * the function does not return the doc, it returns the promise.
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseOrderLoaderById(documentID) {
    return promiseLoaderByCollectionAndId('orders', documentID);
}

/**
 * the function resolve a promise of the document of the current user based on the Auth system.
 * the function does not return the doc, it returns the promise.
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseUserLoaderByCurrentUserID() {
    return getUserToken() ? promiseLoaderByCollectionAndId('users', getUserToken()) : null;
}

/**
 * the function resolve a promise of the document of the current washer based on the Auth system.
 * the function does not return the doc, it returns the promise.
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseWasherLoaderByCurrentUserID() {
    return getUserToken() ? promiseLoaderByCollectionAndId('washers', getUserToken()) : null;
}

/**
 * @returns current user location coordinates.
 */
async function getCurrentUserLocation() {
    currentUserDoc = promiseWasherLoaderByCurrentUserID.then();
    return currentUserDoc ? currentUserDoc.data().location_cor : null;
}

/**
 * @param {*} doc user or washer document
 */
async function getRatingFromDoc(doc, field) {
    let ratingSum = 0,
        ratingNum = 0,
        rating = 0;
    const docOrderArray = await promiseOrderArrayByFieldIdAndStatus(field, doc.id, "finished");
    if (field === 'user') {
        docOrderArray.forEach((order) => {
            rating = order.data().rating_user;
            if (rating) {
                ratingSum += rating;
                ratingNum++;
            }
        });
    } else if (field === 'washer') {
        docOrderArray.forEach((order) => {
            rating = order.data().rating_washer;
            if (rating) {
                ratingSum += rating;
                ratingNum++;
            }
        });
    } else {
        console.error("Error in getRatingFromDoc, check the field requirement.");
    }
    return (ratingNum !== 0) ? (ratingSum / ratingNum).toFixed(1) : 0;
}

/**
 * @param {Number} ratingNum target number for the rating
 * @returns list of all the washers that have rating bigger than ratingNum
 */
async function getWashersWithRatingOverNumber(ratingNum) {
    const docOrderArray = await db.collection('orders').where(status, "==", 'finished').get();
    let ratingDict = {};
    docOrderArray.forEach((doc) => {
        let washer = doc.data().washer;
        let rating = doc.data().rating_washer;
        if (ratingDict[washer] !== undefined && rating !== undefined) {
            ratingDict[washer].ratingSum += rating;
            ratingDict[washer].ratingNum += 1;
        }
    });
    ratingDict.filter((washer) => {

    });
}

/**
 * the function takes washerID and resolves a promise of multiple orders (of the current washer) by specific given status
 * USAGE: promiseWasherLoaderById(docID).then(doc => { // do something with.doc.data })
 */
function promiseOrderArrayByFieldIdAndStatus(field, docID, status) {
    return new Promise((resolve, reject) => {

        var query = db.collection('orders').where(field, "==", docID);

        query.get().then((docArray) => {
            const orderArray = [];
            docArray.forEach((doc) => {
                let isDocGetIn = (status === 'all') || (status === 'processing' && doc.data().status !== 'finished' && doc.data().status !== 'declined') || (doc.data().status === status);
                if (isDocGetIn) {
                    orderArray.push(doc);
                }
            })
            resolve(orderArray);
        }).catch((error) => {
            reject("Error getting document:", error);
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
        user: order.user,
        washer: order.washer,
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
    let data = await forwardGeocodePromise(washer.location_str);
    let geoPoint = {
        lat: data.results[0].geometry.lat,
        lng: data.results[0].geometry.lng
    };
    await db.collection("washers").doc(getUserToken()).set({
        name: washer.name,
        imageUrl: washer.imageUrl,
        pics: washer.pics,
        location_str: washer.location_str,
        location_cor: geoPoint,
        model_name: washer.model_name,
        description: washer.description,
        commitment: Number(washer.commitment),
        opening_times: {},
        price: 0,
        properties: washer.properties,
        phone: washer.phone,
        year_purchased: washer.year_purchased,
        capacity: washer.capacity,
    });
    await createNewUser({
        name: washer.name,
        location_str: washer.location_str,
        imageUrl: washer.imageUrl,
        phone: washer.phone,
        description: washer.description,
    });
}

/**
 * delete washer by Id
 * @param {} washerid the id of the washer to delete
 */
async function deleteCurrentWasher() {
    db.collection("washers").doc(getUserToken()).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

/**
 * @param {*} washerDoc washer doc
 * @returns washer opening_times sorted by days
 */
function getWasherOpenTimes(washerDoc) {
    let washerOpenTimes = washerDoc.data().opening_times;
    let sortedOpenTimes = {};
    if (washerOpenTimes['Sunday'] !== undefined) {
        sortedOpenTimes['Sunday'] = washerOpenTimes['Sunday'];
    }
    if (washerOpenTimes['Monday'] !== undefined) {
        sortedOpenTimes['Monday'] = washerOpenTimes['Monday'];
    }
    if (washerOpenTimes['Tuesday'] !== undefined) {
        sortedOpenTimes['Tuesday'] = washerOpenTimes['Tuesday'];
    }
    if (washerOpenTimes['Wednesday'] !== undefined) {
        sortedOpenTimes['Wednesday'] = washerOpenTimes['Wednesday'];
    }
    if (washerOpenTimes['Thursday'] !== undefined) {
        sortedOpenTimes['Thursday'] = washerOpenTimes['Thursday'];
    }
    if (washerOpenTimes['Friday'] !== undefined) {
        sortedOpenTimes['Friday'] = washerOpenTimes['Friday'];
    }
    if (washerOpenTimes['Saturday'] !== undefined) {
        sortedOpenTimes['Saturday'] = washerOpenTimes['Saturday'];
    }
    return sortedOpenTimes;
}

/**
 * update the open times of specific washer
 * @param {*} openTimes dict of opening times
 * @param {*} washerId washer id
 */
async function setWasherOpenTimes(openTimes, washerId) {
    let washer = await db.collection('washers').doc(washerId);
    await washer.update({
        opening_times: openTimes
    });
}

/**
 * create new user from the current user (on auth) and basic user object
 * please notice: the user needs to be signed in (in auth) while creating new user (on firestore)
 * @param {object} user : basic user object (from auth)
 */
async function createNewUser(user) {
    let data = await forwardGeocodePromise(user.location_str);
    let geoPoint = {
        lat: data.results[0].geometry.lat,
        lng: data.results[0].geometry.lng
    };
    await db.collection("users").doc(getUserToken()).set({
        name: user.name,
        location_str: user.location_str,
        location_cor: geoPoint,
        saved_washers: [],
        imageUrl: user.imageUrl,
        phone: user.phone,
        description: user.description,
    }).then((docRef) => {
        console.log("New User added: " + docRef);
    });
}

/**
 * adds new entry to user favorite washers.
 * @param {*} userId the current user id
 * @param {*} washerId the wanted washer id
 */
async function addWasherToFavorites(userId, washerId) {
    let user = db.collection('users').doc(userId);
    let favorites = user.data().saved_washers;
    if (!favorites.includes(washerId)) {
        favorites.push(washerId);
        await user.update({
            saved_washers: favorites
        });
    }
}

/**
 * Saves a new image containing to user folder in firestorage. This first saves the image in Firebase storage.
 * @param {*} file image file
 * @return {string} image url path to firebase storage
 */
async function saveImageToUser(file) {
    if (!isUserSignedIn()) {
        console.error("You are trying to upload a picture to undefined user");
    } else {
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
 * Notice: there is no difference between washer's "imgUrl" attribute to "pics" when saving images to storage.
 * @param {*} file image file
 * @param {*} washerId the id of the current washer
 * @returns image url path to firebase storage
 */
async function saveImageToWasher(file, washerId) {
    if (file === null) {
        console.error("You are trying to upload an empty file");
        return null;
    }
    let filePath = washerId + '/' + file.name;
    let fileSnapshot = await storage.ref(filePath).put(file);
    let url = await fileSnapshot.ref.getDownloadURL();
    return url;
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

    if (filters.myDay !== undefined) {
        let filteredWashersWithDay = [];
        let key = filters.myDay;
        washersArray.forEach(doc => {
            if (doc.data().opening_times[key] !== undefined) {
                filteredWashersWithDay.push(doc);
            }
        });
        filteredWashers = firstQuery ? filteredWashersWithDay : intersection(filteredWashers, filteredWashersWithDay);
        firstQuery = false;
    }

    if (filters.distance !== undefined && filters.current_cor !== undefined) {
        let filteredWashersWithDistance = [];
        washersArray.forEach(doc => {
            if (getDistanceFromLatLonInKm(filters.current_cor, doc.data().location_cor) <= filters.distance) {
                filteredWashersWithDistance.push(doc);
            }
        });
        filteredWashers = firstQuery ? filteredWashersWithDistance : intersection(filteredWashers, filteredWashersWithDistance);
        firstQuery = false;
    }

    if (filters.rating !== undefined) {
        // let filteredWashersWithRating = getWashersWithRatingOverNumber(filters.rating);
        let docArray = [];
        washersArray.forEach((doc) => {
            docArray.push(doc);
        });
        let filteredWashersWithRating = [];
        for (let washer of docArray) {
            let rating = await getRatingFromDoc(washer, 'washer');
            if (rating >= filters.rating) {
                filteredWashersWithRating.push(washer);
            }
        }
        filteredWashers = firstQuery ? filteredWashersWithRating : intersection(filteredWashers, filteredWashersWithRating);
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
            if (checkOpenTimes(filters.openTime, doc)) {
                filteredWashersWithOpenTime.push(doc);
            }
        });
        filteredWashers = firstQuery ? filteredWashersWithOpenTime : intersection(filteredWashers, filteredWashersWithOpenTime);
        firstQuery = false;
    }

    if (filters.address !== undefined && filters.address !== null && filters.address !== "") {
        let data = await forwardGeocodePromise(filters.address);
        let addressGeoPoint = {
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng
        };
        let filteredWashersWithAddress = [];
        washersArray.forEach(doc => {
            if (getDistanceFromLatLonInKm(addressGeoPoint, doc.data().location_cor) <= 10) {
                filteredWashersWithAddress.push(doc);
            }
        });
        filteredWashers = firstQuery ? filteredWashersWithAddress : intersection(filteredWashers, filteredWashersWithAddress);
        firstQuery = false;
    }

    // if we didn't get any filters
    if (firstQuery) {
        washersArray.forEach((doc) => {
            filteredWashers.push(doc);
        })
    }

    if (filters.currentPoint !== undefined) {
        filteredWashers = await sortWashersByDistance(filteredWashers, filters.currentPoint);
    }

    return filteredWashers;
}

/**
 * @param {*} washerArray array of washer docs
 * @returns the same array sorted by rating
 */
async function sortWashersByRating(washerArray) {
    await washerArray.sort(async (a, b) => {
        let aRating = await getWasherRatingFromDoc(a);
        let bRating = await getWasherRatingFromDoc(b);
        return bRating - aRating;
    });
    return washersArray;
}

/**
 * sort array if washers by the distance from specific point
 * @param {*} washerArray array of washers
 * @param {lat: number, lng: number} currentPoint the middle current point
 * @returns sorted array by distance
 */
async function sortWashersByDistance(washerArray, currentPoint) {
    washerArray.sort((a, b) => {
        let aDistance = getDistanceFromLatLonInKm(a.data().location_cor, currentPoint);
        let bDistance = getDistanceFromLatLonInKm(b.data().location_cor, currentPoint);
        return aDistance - bDistance;
    });
    return washerArray;
}


/**
 * takes array of orders and sort them by creation time
 * @param {*} orderArray array of orders
 * @returns the same array, sorted
 */
function sortOrdersByCreatedAt(orderArray) {
    orderArray.sort((a, b) => {
        let aCreatedAt = a.data().created_at.seconds;
        let bCreatedAt = b.data().created_at.seconds;
        return bCreatedAt - aCreatedAt;
    });
    return orderArray;
}

/**
 * the function takes indicator number and returns washer array:
 * 1 (better)   - rating > 4.5, order by distance
 * 2 (mid)      - rating > 3, order by distance
 * 3 (closer)   - distance closer than 1km, order by distance
 * @param {*} indicator 1-3, indicates the wanted filter
 * @returns array of washer as dictated by the control number
 */
async function getBetterCloserWashers(indicator, currentPoint) {
    let washerArray = []
    switch (indicator) {
        case "1":
            washerArray = await getWasherFilterQuery({
                rating: 4.5,
            });
            break;
        case "2":
            washerArray = await getWasherFilterQuery({
                rating: 3,
                distance: 3,
                current_cor: currentPoint,
            });
            break;
        case "3":
            washerArray = await getWasherFilterQuery({
                distance: 4,
                current_cor: currentPoint,
            });
            break;
    }
    console.log(washerArray);
    return sortWashersByDistance(washerArray, currentPoint);
}

async function getButtonAccordingToWasherStatus() {
    let currentWasher = promiseWasherLoaderByCurrentUserID();
    if (currentWasher) {
        return "Washer Profile";
    }
    else {
        return "Be A Washer";
    }
}