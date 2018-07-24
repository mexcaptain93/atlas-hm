$(document).ready(function () {
    indexSlider();
    initMap();
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

function initMap() {
    var mapElement = $('.js-map');
        if (mapElement.length) {
            coordinates = ['44.8949655', '37.3016326'];

            if (mapElement[0].hasAttribute('data-coordinates')) {
                coordinates = mapElement.attr('data-coordinates').split(';');
                markerImage = '/static/img/general/map-marker.png';
                popupContent = '<p class="map-content">' + mapElement.attr('data-name') + '</p>';

                var myLatlng = new google.maps.LatLng(parseFloat(coordinates[0]), parseFloat(coordinates[1]));

                var marker = new google.maps.Marker({
                    position: myLatlng,
                    icon: markerImage
                });


                infowindow = new google.maps.InfoWindow({
                    content: popupContent
                });

                marker.addListener('mouseover', function () {
                    infowindow.open(map, marker);
                });

                marker.addListener('mouseout', function () {
                    infowindow.close(map, marker);
                });
            }

            map = new google.maps.Map(mapElement[0], {
                center: {lat: parseFloat(coordinates[0]), lng: parseFloat(coordinates[1])},
                zoom: 18,
                scrollwheel: false,
                zoomControl: true,
                disableDefaultUI: true,
            });

            console.log(map)

            if (marker) {
                marker.setMap(map);
            }
        }


}