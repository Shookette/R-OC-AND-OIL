var geocoder;
var map;
var country = "France";

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });

    geocoder.geocode( {'address' : country}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
        }
    });


}

function addMarker(data) {
    var myLatLng;
    var marker;
    for(var i in data) {
        geolocate(data, i);
    }
}

function geolocate(data, i) {
    setTimeout(function(){
        console.log(i);
        var address = data[i][0] + " " + data[i][1] + " " + data[i][2];
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                myLatLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
                marker = new google.maps.Marker({
                  position: myLatLng,
                  map: map,
                });
                marker.setMap(map)
            } else {
                console.log(google.maps.GeocoderStatus);
            }
        });
    }, 200);
}
