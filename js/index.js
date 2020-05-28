var map;
var markers = [];


function initMap() {

    var losAngeles = {
        lat: -34.397,
        lng: 150.644
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 8,
        style: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#523735"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#c9b2a6"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#dcd2be"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ae9e90"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#93817c"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#a5b076"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#447530"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fdfcf8"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f8c967"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#e9bc62"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e98d58"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#db8555"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#806b63"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8f7d77"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#b9d3c2"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#92998d"
                }]
            }
        ]

    });

    infoWindow = new google.maps.InfoWindow();
    displayStores()
    showStoresMarkers()
    customizeMaker()
}


function displayStores() {

    // create the actual data creating the html
    var storesHtml = "";

    // loop throught the data
    stores.forEach(function(store, index) {
        // console.log(store);
        var address = store.addressLines;
        var phone = store.phoneNumber;

        storesHtml += `
            <div class="store-container">
                <div class="store-info">
                    <div class="store-address">
                        <span class="address-name">${address[0]}</span>
                        <span class="address-location"> ${address[1]} </span>
                    </div>
                    <div class="store-phone-number"> ${phone}</div>
                </div>
                <div class="marker-map">
                ${index +=1}
                </div>
            </div>
        `
    });

    document.querySelector(".store-list").innerHTML = storesHtml;
}

function showStoresMarkers() {
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store, index) {
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);
        // console.log(latlng);
        var name = store.name;
        var address = store.addressLines[0];
        var phone = store.phoneNumber;
        var openStatus = store.openStatusText;
        var lng = store.coordinates.longitude;
        var lat = store.coordinates.latitude;
        bounds.extend(latlng);
        createMarker(latlng, name, address, phone, openStatus, lng, lat);
    })
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, phone, openStatus, lng, lat) {
    var html = `<div class="marker-map">
    <div class="arrow"> <img src="asset/polygon.png" alt=""> </div>
    <h3>${name}</h3>
    <div class="make-padding">
        <span class="time">${openStatus}</span>
        <div class="col-2">
            <span class="icon"> <img src="asset/send.png" alt=""> </span>
            <span class="marker-address"> <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}"> ${address}</a> </span>
        </div>
        <div class="col-2">
            <span class="icon"> <img src="asset/phone.svg" alt=""> </span>
            <span>${phone}</span>
        </div>
    </div>
</div>`;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}



function customizeMaker() {
    stores.forEach(function(store, index) {

        var marker = new google.maps.Marker({
            position: { lat: store.coordinates.latitude, lng: store.coordinates.longitude },
            map: map,
            icon: "https://i.ibb.co/w4crKdv/marker.png"
        })
    })
}