'use strict';

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });


// const loadWasherByID = async (documentID) => {
//     var query = db.collection('washers').doc(documentID);
    
//     query.get().then((doc) => {
//         if (doc.exists) {
//             console.log("Document data: ", doc.data());
//             currentWasher = doc.data();
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//         return doc
//     }).catch((error) => {
//         console.log("Error getting document:", error);
//     });

//   }

var myOnlyOneElement = document.getElementById('only-one');
let currentWasher = null;

function promiseLoader(documentID) {
    return new Promise((resolve, reject) => {
        var query = db.collection('washers').doc(documentID);
        
        query.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data());
                currentWasher = doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            resolve(doc);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    })
}

function getUserDescriptionById(documentID) {
    let des = promiseLoader(documentID).then((doc) => {
        console.log("doc: " + JSON.stringify(doc.data()));
        myOnlyOneElement.innerHTML = doc.data().description;
        return doc.data().description;
        });
    return des;
}

function changes() {
    let des = getUserDescriptionById('aNRkJUTtxoVQTSFNLxS7');
    console.log("ans: " + des);
}

