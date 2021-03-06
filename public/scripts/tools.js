/**
 * @param {*} address full address str
 * @returns  the address split to parts by commas and spaces.
 */
function arrangeAddress(address) {
  return address.split(/[ ,]+/).join('+');
}

/**
 * @param {*} arrayA array A
 * @param {*} arrayB array B
 * @returns array of the elements that are both in A and B
 */
const intersection = (arrayA, arrayB) => {
  interArray = [];

  for (i of arrayA) {
    loopJ: for (j of arrayB) {
      if (j.id === i.id) {
        interArray.push(i);
        break loopJ;
      }
    }
  }

  return interArray;
}

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

    request.onload = () => {

      if (request.status === 200) {
        var data = JSON.parse(request.responseText);
        if (data.results[0] != null) {
          console.log(data.results[0].formatted);
        } else {
          console.log("There Has been Error parsing the input");
          alert("Geocoder could not find the address, please fill the address field");
        }
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
  // getting open and close time for the specific day
  openTime = getHourAsNumber(washerDoc.data().opening_times[filter[0]][0]);
  closeTime = getHourAsNumber(washerDoc.data().opening_times[filter[0]][1]);
  wantedTime = getHourAsNumber(filter[1]);
  // going through each possible combination of hour and min
  return checkIfOpenNow(openTime, wantedTime);
}

/**
 * @param {*} hourMinTime "hours:minutes"
 * @returns [hours, minutes] as numbers
 */
function getHourAsNumber(hourMinTime) {
  if (hourMinTime === undefined) {
    return null;
  }
  openPattern = new RegExp(/(?<hour>\d\d):(?<min>\d\d)/);
  wantedHour = hourMinTime.match(openPattern);
  return [Number(wantedHour[1]), Number(wantedHour[2])]
}


function checkIfOpenNow(openTime, closeTime, wantedTime) {
  if (!openTime || !closeTime || !wantedTime) {
    return false;
  }
  if (openTime[0] > wantedTime[0] || wantedTime[0] > closeTime[0]) {
    return false;
  } else if (openTime[0] < wantedTime[0]) {
    return ((wantedTime[0] < closeTime[0]) || (wantedTime[1] < closeTime[1]));
  } else if (wantedTime[0] < closeTime[0]) {
    return ((openTime[0] < wantedTime[0]) || (openTime[1] < wantedTime[1]));
  } else {
    return ((openTime[1] < wantedTime[1]) && (openTime[1] < wantedTime[1]));
  }
}

/**
 * return true if washer is open now and false if not
 * @param {dict} opening_times map with opening_times by day - {Sunday: [8:00,12:00], Friday: [13:00,20:00]}
 * @returns 
 */
function check_if_washer_open(opening_times, cur_date) {
  var date = new Date(cur_date)
  var day = date.getDay();
  switch (day) {
    case 0:
      try {
        opening_time = opening_times.Sunday[0];
        closing_time = opening_times.Sunday[1];
        break;
      } catch {
        return false;
      }
      case 1:
        try {
          opening_time = opening_times.Monday[0];
          closing_time = opening_times.Monday[1];
          break;
        } catch {
          return false;
        }
        case 2:
          try {
            opening_time = opening_times.Tuesday[0];
            closing_time = opening_times.Tuesday[1];
            break;
          } catch {
            return false;
          }
          case 3:
            try {
              opening_time = opening_times.Wednesday[0];
              closing_time = opening_times.Wednesday[1];
              break;
            } catch {
              return false;
            }
            case 4:
              try {
                opening_time = opening_times.Thursday[0];
                closing_time = opening_times.Thursday[1];
                break;
              } catch {
                return false;
              }
              case 5:
                try {
                  opening_time = opening_times.Friday[0];
                  closing_time = opening_times.Friday[1];
                  break;
                } catch {
                  return false;
                }
                case 6:
                  try {
                    opening_time = opening_times.Saturday[0];
                    closing_time = opening_times.Saturday[1];
                    break;
                  } catch {
                    return false;
                  }
  }
  opening_time = toFullTimestamp(date, opening_time);
  closing_time = toFullTimestamp(date, closing_time);
  if ((date >= opening_time) && (date <= closing_time)) {
    return true;
  }
  return false;
}

/**
 * return true if washer is open now and false if not
 * @param {dict} opening_times map with opening_times by day - {Sunday: [8:00,12:00], Friday: [13:00,20:00]}
 * @returns 
 */
function check_if_washer_open_now(opening_times) {
  var cur_date = new Date(); // current time
  return check_if_washer_open(opening_times, cur_date);
}