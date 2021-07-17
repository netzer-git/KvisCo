// popup
var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var address = "";
var d = new Date()
var myDate = formatDate(d);
var duration = '24';
var day = d.getDay();
var myDay = DAYS[day];
jsarray_basic = [address, myDate, duration, myDay];

function save() {
    console.log("now saving");
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
    var jsarray = JSON.parse(sessionStorage.getItem("searchBarArray"));
    if (jsarray == null) {
        jsarray = jsarray_basic;
    }
    address = jsarray[0];
    myDate = jsarray[1];
    duration = jsarray[2];
    myDay = jsarray[3]
    search_res = {address:address, myDate:myDate, duration:duration, myDay:myDay};

    search_bar = '<table class="table-search"><tr><td>Where?</td><td>When?</td><td>Duration</td></tr>';
    search_bar += '<tr>';
    search_bar += '<td><input class="choose_location" type="text" id="where" value = "' + address + '" onchange ="save()"></td>';
    search_bar += '<td><input class="choose_location" type="date" id="myDate" value= ' + myDate + ' onchange="save()"></td>';
    search_bar += '<td><div class="box" id="duration">';
    search_bar += '<select id="duration" onchange="save()">';
    switch (duration) {
        case '8':
            search_bar += '<option value="8" selected>8 hours</option>';
            search_bar += '<option value="24">24 hours</option>';
            search_bar += '<option value="48">48 hours</option>';
            search_bar += '<option value="72">72 hours</option></select>';
            break
        case '24':
            search_bar += '<option value="8">8 hours</option>';
            search_bar += '<option value="24" selected>24 hours</option>';
            search_bar += '<option value="48">48 hours</option>';
            search_bar += '<option value="72">72 hours</option></select>';
            break;
        case '48':
            search_bar += '<option value="8">8 hours</option>';
            search_bar += '<option value="24">24 hours</option>';
            search_bar += '<option value="48" selected>48 hours</option>';
            search_bar += '<option value="72">72 hours</option></select>';
            break;
        case '72':
            search_bar += '<option value="8">8 hours</option>';
            search_bar += '<option value="24">24 hours</option>';
            search_bar += '<option value="48">48 hours</option>';
            search_bar += '<option value="72" selected>72 hours</option></select>';
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
