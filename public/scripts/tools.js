// const geocoder = new google.maps.Geocoder();

// function geocode(location_name) {
//     //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
//     geocoder.geocode( { 'address' : location_name }, function( results, status ) {
//         if( status == google.maps.GeocoderStatus.OK ) {
//             console.log(results);
//             //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
//             map.setCenter( results[0].geometry.location );
//             var marker = new google.maps.Marker( {
//                 map     : map,
//                 position: results[0].geometry.location
//             } );
//         } else {
//             console.log( 'Geocode was not successful for the following reason: ' + status );
//         }
//     } );
// }

// my ket =>key=AIzaSyCJkDJzPLDJTncDPsoN5nL5qtG59v7QHV0
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCJkDJzPLDJTncDPsoN5nL5qtG59v7QHV0
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
const googleApiKey = "AIzaSyCJkDJzPLDJTncDPsoN5nL5qtG59v7QHV0";
const urlPref = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const urlSuf = "&key=";

function arrangeAddress(address) {
    return address.split(/[ ,]+/).join('+');
}

function geocode() {
    promiseLoader('aNRkJUTtxoVQTSFNLxS7').then((doc) => {
        console.log("doc data: " + doc.data());
        url = urlPref + arrangeAddress(doc.data().location_str) + urlSuf + googleApiKey;
        console.log(url)
        $.get(url, (results) => {
            console.log(JSON.stringify(results[0]));
        })
    });
} 