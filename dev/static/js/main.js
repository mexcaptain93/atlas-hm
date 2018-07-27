$(document).ready(function () {
    indexSlider();
    ownersMap();
    hotelsMap()
});

function indexSlider() {
    var indexSlider = $('.js-index-slider'),
        indexSliderPrev = $('.js-index-slider-prev'),
        indexSliderNext = $('.js-index-slider-next');

    if (indexSlider.length) {
        indexSlider.slick({
            dots: true
        });

        indexSliderPrev.on('click', function (e) {
            e.preventDefault();
            indexSlider.find('.slick-prev').click();
        });

        indexSliderNext.on('click', function (e) {
            e.preventDefault();
            indexSlider.find('.slick-next').click();
        });
    }
}

function ownersMap() {
    var mapElement = $('.js-map');
        if (mapElement.length) {
            coordinates = ['44.8949655', '37.3016326'];

            if (mapElement[0].hasAttribute('data-coordinates')) {
                coordinates = mapElement.attr('data-coordinates').split(';');
            }

            map = new google.maps.Map(mapElement[0], {
                center: {lat: parseFloat(coordinates[0]), lng: parseFloat(coordinates[1])},
                zoom: 18,
                scrollwheel: false,
                zoomControl: true,
                disableDefaultUI: true,
            });


            if (coordinates) {
                addMarkerToMap(parseFloat(coordinates[0]), parseFloat(coordinates[1]), mapElement.attr('data-name'), map);
            }
        }

}

function hotelsMap() {

    var mapHotels = $('.js-map-hotels');

    if (mapHotels.length) {
        coordinates = ['44.9149655', '37.3016326'];

        var map = new google.maps.Map(mapHotels[0], {
            center: {lat: parseFloat(coordinates[0]), lng: parseFloat(coordinates[1])},
            zoom: 12,
            scrollwheel: false,
            zoomControl: true,
            disableDefaultUI: true,
        });

        $('.js-portfolio-hotels-list').find('.hotel').each(function(){
            var coordinates = $(this).attr('data-coordinates');

            if (coordinates != '') {
                coordinates = coordinates.split(';', 2);
                addMarkerToMap(coordinates[0], coordinates[1], $(this).find('.hotel__name').html(), map);
            }

        });
    }

}

function addMarkerToMap (x, y, name, map) {

    var myLatlng = new google.maps.LatLng(x,y);

    markerImage = '/static/img/general/map-marker.png';

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: name,
        icon: markerImage
    });
    tooltips = new Array();
    markerEvents(marker, name, map);

    marker.setMap(map);

}

function markerEvents (marker, name, map) {

    infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'mouseover', (function(marker) {
        return function() {
            infowindow.setContent(name);
            infowindow.open(map, marker);
        }
    })(marker));

    google.maps.event.addListener(marker, 'mouseout', (function() {
        return function() {
            infowindow.close(map, marker);
        }
    })());

}