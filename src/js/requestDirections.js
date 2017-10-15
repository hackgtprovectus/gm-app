function getDirections(start, end) {
    /**
     * start and end are google api LatLng objects
     */
    $('.route-map').show();
    var map = new google.maps.Map(document.getElementById('route-map'), {
        zoom: 7,
        center: start
        }),
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
            map:map
        });
    routeFinder(directionsService, directionsDisplay, start, end);
}

function routeFinder(ds, dd, s, e) {
    var request = {
        origin: s,
        destination: e,
        travelMode: google.maps.TravelMode.DRIVING
    };
    ds.route(request, function (result, status) {
        if (status == 'OK') {
            dd.setDirections(result);
        } else {
            console.log("couldn't get directions:" + status);
        }
    });
}