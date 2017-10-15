function initMap(data) {
    var bounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(lat, long),
        mapTypeId: 'roadmap'
    });

    var homeMarker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        map: map,
        label: 'YOUR CAR'
    });

    homeMarker.addListener('click', function () {
        setDestination(loc);
    });

    var old_markers = data.content;

    var markers = [];

    for(var i = 0; i < Object.keys(old_markers).length; i++) {
        markers.push([old_markers[i].latitude, old_markers[i].longitude]);
    }

    var divisionBoundry = Math.ceil((markers.length * 33.33) / 100),
        iconBase = 'http://maps.google.com/mapfiles/kml/paddle/',
        paddleBase = ['grn-blank.png', 'ylw-blank.png', 'stop.png'],
        selector = 0;

    for(var j = 0; j < markers.length; j++){
        if(j > divisionBoundry){
            selector++;
            divisionBoundry *= 2;
        }

        var loc = new google.maps.LatLng(markers[j][0], (markers[j])[1]);
        bounds.extend(loc);
        var marker = new google.maps.Marker({
            position: loc,
            map: map,
            icon: iconBase + paddleBase[selector]
        });
        marker.addListener('click', function() {
            setDestination(loc);
        });
    }
    if(syn){
        $("#map").show();
        google.maps.event.trigger(map, 'resize');
    }
}

function setDestination(loc) {
    /**
     * Takes google maps LatLng object
     */

        // todo get current location or destination

    var start = new google.maps.LatLng(lat, long);

    $("#container").empty();
    $("#map").remove();

    getDirections(start, loc);
}

function requestParking(lat, long, syn) {
    /**
     * This function takes one input
     * an array of lat, long
     * return: An array with parking locations
     * and relative congestion
     */
    window.lat = lat;
    window.long = long;
    window.syn = syn;

    var park_url = "http://ec2-52-15-84-1.us-east-2.compute.amazonaws.com/api/parkinglocations";
    $.ajax({
        url: park_url,
        type: 'GET',
        dataType: 'json',
        success: initMap
    });
}