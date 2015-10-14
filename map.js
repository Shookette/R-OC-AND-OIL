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

    var address = "LAVAL 53000 FRANCE";
    var myLatLng;
    var marker;

    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            myLatLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
            marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              title: 'Hello World!'
            });
            marker.setMap(map)
        }
    });

}
