function arrangeAddress(address) {
  return address.split(/[ ,]+/).join('+');
}

const intersection = (arrayA, arrayB) => {
  // arrayB = new Set(arrayB); // recycling variable
  // return [...new Set(arrayA)].filter(element => arrayB.has(element));
  // return arrayA.filter(element => arrayB.include(element));
  return arrayA.filter(function(n) {
      return arrayA.indexOf(n) !== -1;
  });
};

/**
 * the function takes latitude and longitude and 
 * @param {number} lat : latitude coordinate 
 * @param {number} lng : longitude coordinate
 * @return {string} the full address of the location.
 */
async function reverseGeocoderPromise(lat, lng) {
  return new Promise((resolve, reject) => {
    var apiKey = '4c1b00bd6bfc462a8c289c794fd32112';
    var latitude = lat;
    var longitude = lng;
    var api_url = 'https://api.opencagedata.com/geocode/v1/json';
    let language = 'en';

    var request_url = api_url +
      '?' +
      'key=' + apiKey +
      '&q=' + encodeURIComponent(latitude + ',' + longitude) +
      '&pretty=1' +
      '&no_annotations=1' +
      '&language=' + language;

    var data;
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = () => {

      if (request.status === 200) {
        data = JSON.parse(request.responseText);
        console.log("adress: " + data.results[0].formatted); // log the results
        resolve(data);
      } else if (request.status <= 500) {
        console.error("unable to geocode! Response code: " + request.status);
        data = JSON.parse(request.responseText);
        console.error('error msg: ' + data.status.message);
        reject(Error('An error occurred while loading image. error code:' + data.status.message));
      } else {
        console.error('server error');
        reject(Error('server error'));
      }
    };

    request.onerror = function () {
      console.log("unable to connect to server");
    };

    request.send() // make the request
  })
}

/**
 * the function takes a string and return geo-point of the location
 * @param {string} location_str : the str of the location
 * @return {GeoPoint} the geo-point of the location (of the string)
 */
async function forwardGeocodePromise(location_str) {
  return new Promise((resolve, reject) => {
    var apiKey = '4c1b00bd6bfc462a8c289c794fd32112';
    var location = location_str;
    var api_url = 'https://api.opencagedata.com/geocode/v1/json';
    let country = 'IL';
    let language = 'en';

    var request_url = api_url +
      '?' +
      'key=' + apiKey +
      '&q=' + location +
      '&pretty=1' +
      '&no_annotations=1' +
      '&countrycode=' + country +
      '&language=' + language;
    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    // request.onload = callback;
    request.onload = () => {

      if (request.status === 200) {
        var data = JSON.parse(request.responseText);
        console.log(data.results[0].formatted);
        resolve(data);
      } else if (request.status <= 500) {
        console.error("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.error('error msg: ' + data.status.message);
        reject(Error('An error occurred while loading image. error code:' + data.status.message));
      } else {
        console.error('server error');
        reject(Error('server error' + data.status.message));
      }
    };

    request.onerror = function () {
      console.log("unable to connect to server");
    };

    request.send(); // make the request
  })
}

/**
 * get the distance between two geoPoints
 * @param {*} pointA 
 * @param {*} pointB 
 * @returns the distance between them in km.
 */
function getDistanceFromLatLonInKm(pointA, pointB) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(pointB.lat - pointA.lat); // deg2rad below
  var dLon = deg2rad(pointB.lng - pointA.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(pointA.lat)) * Math.cos(deg2rad(pointB.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

/**
 * convert deg to radians
 * @param {*} deg 
 * @returns the deg in radians
 */
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

/**
 * takes filter time as "10:15" and checks if the time is in the washer opening time.
 * @param {string} filter 
 * @param {*} washerDoc 
 * @return {boolean} true if the wanted time is in the washer opening time.
 */
function checkOpenTimes(filter, washerDoc) {
  const getHourAsNumber = (hourMinTime) => {
    openPattern = new RegExp(/(?<hour>\d\d):(?<min>\d\d)/);
    wantedHour = hourMinTime.match(openPattern);
    return [Number(wantedHour[1]), Number(wantedHour[2])]
  }
  // getting open and close time for the specific day
  openTime = getHourAsNumber(washerDoc.data().opening_times[filter[0]][0]);
  closeTime = getHourAsNumber(washerDoc.data().opening_times[filter[0]][1]);
  wantedTime = getHourAsNumber(filter[1]);
  // going through each possible combination of hour and min
  if (openTime[0] > wantedTime[0] || wantedTime[0] > closeTime[0]) {
    return false;
  }
  else if (openTime[0] < wantedTime[0]) {
    return ((wantedTime[0] < closeTime[0]) || (wantedTime[1] < closeTime[1]));
  }
  else if (wantedTime[0] < closeTime[0]) {
    return ((openTime[0] < wantedTime[0]) || (openTime[1] < wantedTime[1]));
  }
  else {
    return ((openTime[1] < wantedTime[1]) && (openTime[1] < wantedTime[1]));
  }
}