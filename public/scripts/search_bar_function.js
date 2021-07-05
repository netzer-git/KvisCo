var address = "";
var myDate = formatDate(new Date());
var loads = '1';
var duration = '24';
jsarray_basic = [address, myDate, loads, duration];

function save() {
    address = document.getElementById("where").value;
    myDate = document.getElementById("myDate").value;
    loads = document.getElementById("loads_number").value;
    duration = document.getElementById("duration").value;
    // Do whatever you want with the value here.
    jsarray = [address, myDate, loads, duration];
    sessionStorage.setItem("jsArray", JSON.stringify(jsarray));
    // JSON.stringify(jsArray) converts the jsArray into a string which can be stored in sessionStorage
}


/** function get_search_bar(tag) {
    var jsarray = JSON.parse(sessionStorage.getItem("jsArray"));
    if (jsarray == null) {
        jsarray = jsarray_basic;
    }
    address = jsarray[0];
    myDate = jsarray[1];
    loads = jsarray[2];
    duration = jsarray[3];
    search_res = {address:address, myDate:myDate, loads:loads, duration:duration};

    search_bar = '<table class="table-search"><tr><td>Where?</td><td>When?</td><td>Duration</td></tr>';
    search_bar += '<tr>';
    search_bar += '<td><input class="choose_location" type="text" id="where" value = " ' + address + ' " onload ="save()"></td>';
    search_bar += '<td><input class="choose_location" type="date" id="myDate" value= ' + myDate + ' onload="save()"></td>';
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
}*/
function get_search_bar(tag) {
    var jsarray = JSON.parse(sessionStorage.getItem("jsArray"));
    if (jsarray == null) {
        jsarray = jsarray_basic;
    }
    address = jsarray[0];
    myDate = jsarray[1];
    duration = jsarray[2];
    search_res = {address:address, myDate:myDate, duration:duration};

    search_bar = '<table class="table-search"><tr><td>Where?</td><td>When?</td><td>Duration</td></tr>';
    search_bar += '<tr>';
    search_bar += '<td><input class="choose_location" type="text" id="where" value = " ' + address + ' " onload ="save()"></td>';
    search_bar += '<td><input class="choose_location" type="date" id="myDate" value= ' + myDate + ' onload="save()"></td>';
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
