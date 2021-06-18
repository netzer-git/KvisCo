function arrangeAddress(address) {
  return address.split(/[ ,]+/).join('+');
}

/**
 * the function takes latitude and longitude and 
 * @param {number} lat : latitude coordinate 
 * @param {number} lng : longitude coordinate
 * @return {string} the full address of the location.
 */
function reverseGeocoder(lat, lng) {
  var apiKey = '4c1b00bd6bfc462a8c289c794fd32112';
  var latitude = lat;
  var longitude = lng;
  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url +
    '?' +
    'key=' + apiKey +
    '&q=' + encodeURIComponent(latitude + ',' + longitude) +
    '&pretty=1' +
    '&no_annotations=1';

  var data;
  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = () => {

    if (request.status === 200) {
      data = JSON.parse(request.responseText);
      console.log("adress: " + data.results[0].formatted); // log the results
      return data;
    } else if (request.status <= 500) {
      console.error("unable to geocode! Response code: " + request.status);
      data = JSON.parse(request.responseText);
      console.error('error msg: ' + data.status.message);
    } else {
      console.error("server error");
    }
  };

  request.onerror = function () {
    console.log("unable to connect to server");
  };

  request.send() // make the request
}

/**
 * the function takes a string and return geo-point of the location
 * @param {string} location_str : the str of the location
 * @return {GeoPoint} the geo-point of the location (of the string)
 */
async function forwardGeocode(location_str) {

  var apiKey = '4c1b00bd6bfc462a8c289c794fd32112';
  var location = location_str;
  var api_url = 'https://api.opencagedata.com/geocode/v1/json';

  var request_url = api_url +
    '?' +
    'key=' + apiKey +
    '&q=' + location +
    '&pretty=1' +
    '&no_annotations=1';
  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  // request.onload = callback;
  request.onload = () => {

    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      console.log(data.results[0].formatted);
      console.log(data);

    } else if (request.status <= 500) {
      console.error("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.error('error msg: ' + data.status.message);
    } else {
      console.error("server error");
    }
  };

  request.onerror = function () {
    console.log("unable to connect to server");
  };

  request.send(); // make the request
}

// /* Initialise Reverse Geocode API Client */
// var reverseGeocoder=new BDCReverseGeocode();

// /* Get the current user's location information, based on the coordinates provided by their browser */
// /* Fetching coordinates requires the user to be accessing your page over HTTPS and to allow the location prompt. */
// reverseGeocoder.getClientLocation(function(result) {
//     console.log(result);
// });
// /* Get the administrative location information using a set of known coordinates */
// reverseGeocoder.getClientLocation({
//     latitude: 31.7767,
//     longitude: 35.2345,
// }, function(result) {
//     console.log(result);
// });
// /* You can also set the locality language as needed */
// reverseGeocoder.localityLanguage='heb';
// /* Request the current user's coordinates (requires HTTPS and acceptance of prompt) */
// reverseGeocoder.getClientCoordinates(function(result) {
//     console.log(result);
// });