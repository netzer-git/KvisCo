var where = "";
var myDate = new Date(); // current time
var loads = '1';
var duration = '24';

function save() {
    where = document.getElementById("where").value;
    myDate = document.getElementById("myDate").value;
    loads = document.getElementById("loads_number").value;
    duration = document.getElementById("duration").value;
    // Do whatever you want with the value here.
    jsarray = [where, myDate, loads, duration];
    sessionStorage.setItem("jsArray", JSON.stringify(jsarray));
// JSON.stringify(jsArray) converts the jsArray into a string which can be stored in sessionStorage


}


function get_search_bar(tag){
    var jsarray = JSON.parse(sessionStorage.getItem("jsArray"));
    where = jsarray[0];
    myDate = jsarray[1];
    loads = jsarray[2];
    duration = jsarray[3];
    search_bar = '<table class="table-search"><tr><td>Where?</td><td>When?</td><td>Loads</td><td>Duration</td></tr>';
    search_bar += '<tr>';
    search_bar += '<td><input class="choose_location" type="text" id="where" value = " '+ where +' " onload ="save()"></td>';
    search_bar += '<td><input class="choose_location" type="date" id="myDate" value= ' + myDate+ ' onload="save()">';
    search_bar += '</td><td><input class="choose_location" type="number" id="loads_number" value= '+loads+' onload="save()"></td>';
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
}