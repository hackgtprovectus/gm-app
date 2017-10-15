window.onload(function () {
    var coords = [
        [32.715675, -117.161230],
        [32.708498, -117.151681]
    ];
    var pos = parseInt(Math.random() * (2 - 1) + 1);
    window.lat = coords[pos][0];
    window.long = coords[pos][1];
});


$("#realData").click(function () {

    // var location = getRealTimeLocation();

    $(".container").empty();
    // initMap(location[0], location[1], false);
    initMap(, , false);
    $("#map").show();
    google.maps.event.trigger(map, 'resize');
});

$("#synData").click(function () {
    $("#map").empty();
    $(".container").empty();

    requestParking(lat, long, true);
});

function getRealTimeLocation() {
    var keyb64 = "bDd4eGIzYjllNGNmOGRkZDQ5OWRiZWU4NDZkY2U3OWI1OTVjOmIyODY1MDRhMzM5NjQ0Mjg4ZjBhMGUwODVjOTNlNWVk";
    var token_url = "https://developer.gm.com/api/v1/oauth/access_token?grant_type=client_credentials";
    var actoken;

    $.ajax({
        url: token_url,
        type: 'GET',
        dataType: 'json',
        headers: {
            'authorization': 'Basic ' + keyb64,
            'accept': 'application/json'
        },
        success: function (data) {
            actoken = data['access_token'];
        }
    });
    //todo use token, get vehicle, get vin, get location
}