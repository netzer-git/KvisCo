// popup
var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var address = "";
var d = new Date()
var myDate = formatDate(d);
var duration = '72';
var day = d.getDay();
var myDay = DAYS[day];
jsarray_basic = [address, myDate, duration, myDay];

function save() {
    address = document.getElementById("where").value;
    myDate = document.getElementById("myDate").value;
    duration = document.getElementById("duration").value;
    day = new Date(myDate).getDay();
    myDay = DAYS[day];
    // Do whatever you want with the value here.
    jsarray = [address, myDate, duration, myDay];
    sessionStorage.setItem("searchBarArray", JSON.stringify(jsarray));
    // JSON.stringify(jsArray) converts the jsArray into a string which can be stored in sessionStorage
    // if (window.location.pathname != "/html/welcome.html") {
    //     on_load_page()
    // }
}

function get_search_bar(tag) {
    jsarray = JSON.parse(sessionStorage.getItem("searchBarArray"));
    if (jsarray == null || window.location.pathname == "/html/welcome.html") {
        jsarray = jsarray_basic;
        sessionStorage.setItem("searchBarArray", JSON.stringify(jsarray));
    }
    address = jsarray[0];
    myDate = jsarray[1];
    duration = jsarray[2];
    myDay = jsarray[3]
    search_res = {address:address, myDate:myDate, duration:duration, myDay:myDay};

    var search_bar = '<table class="table-search"><tr><td>Where?</td><td>When?</td><td>Duration</td></tr>';
    search_bar += '<tr>';
    search_bar += '<td><input class="choose_location" type="text" placeholder = "My current location" id="where" value = "' + address + '" onchange ="save()"><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJkDJzPLDJTncDPsoN5nL5qtG59v7QHV0&libraries=places&callback=initAutocomplete" async defer></script></td>';
    search_bar += '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJkDJzPLDJTncDPsoN5nL5qtG59v7QHV0&libraries=places&callback=initAutocomplete" async defer></script>';
    // search_bar += '<td><input class="choose_location" type="date" id="myDate" value= ' + myDate + ' onchange="save()"></td>';
    search_bar += '<td><div class="box" id="duration_box">';
    search_bar += '<select id="duration" onchange="save()">';
    switch (duration) {
        case '8':
            search_bar += '<option value="8" selected>8 Hours</option>';
            search_bar += '<option value="24">24 Hours</option>';
            search_bar += '<option value="48">48 Hours</option>';
            search_bar += '<option value="72">72 Hours</option></select>';
            break
        case '48':
            search_bar += '<option value="8">8 Hours</option>';
            search_bar += '<option value="24">24 Hours</option>';
            search_bar += '<option value="48" selected>48 Hours</option>';
            search_bar += '<option value="72">72 Hours</option></select>';
            break;
        case '24':
            search_bar += '<option value="8">8 Hours</option>';
            search_bar += '<option value="24" selected>24 Hours</option>';
            search_bar += '<option value="48">48 Hours</option>';
            search_bar += '<option value="72">72 Hours</option></select>';
            break;
        default:
            search_bar += '<option value="8">8 Hours</option>';
            search_bar += '<option value="24" selected>24 Hours</option>';
            search_bar += '<option value="48">48 Hours</option>';
            search_bar += '<option value="72" selected>72 Hours</option></select>';
            break;
    }
    search_bar += '</div></td></tr></table>';
    document.getElementById(tag).innerHTML = search_bar;
    return search_res;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

/* google maps API auto-complete of address*/
var placeSearch, autocomplete, geocoder;

/**
 * initalize google maps autocomplete input field
 */
function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('where')), {
      types: ['geocode']
    });

  autocomplete.addListener('place_changed', fillInAddress);
}

/**
 * update new address in sessionStorage
 * @param {*} address geocode 
 */
function codeAddress(address) {
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      // This is the lat and lng results[0].geometry.location
      alert(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

/**
 * update new address in input field
 */
function fillInAddress() {
  var place = autocomplete.getPlace();

  codeAddress(document.getElementById('where').value);
}