$(document).ready(function () {
    indexSlider();
    ownersMap();
    hotelsMap();
    popups();
    callback();
    mainMenu();
});

function indexSlider() {
    var indexSlider = $('.js-index-slider'),
        indexSliderPrev = $('.js-index-slider-prev'),
        indexSliderNext = $('.js-index-slider-next');

    if (indexSlider.length) {
        indexSlider.slick({
            dots: true,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
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

        if (mapHotels[0].hasAttribute('data-coordinates')) {
            coordinates = mapHotels.data('coordinates').split(';');
        } else {
            coordinates = ['44.9149655', '37.3016326'];
        }


        var map = new google.maps.Map(mapHotels[0], {
            center: {lat: parseFloat(coordinates[0]), lng: parseFloat(coordinates[1])},
            zoom: 12,
            scrollwheel: false,
            zoomControl: true,
            disableDefaultUI: true,
        });

        if (mapHotels[0].hasAttribute('data-coordinates')) {
            addMarkerToMap(coordinates[0], coordinates[1], mapHotels.data('name'), map);
        }

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

    markerImage = '/bitrix/templates/atlas_hm/static/img/general/map-marker.png';

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

function popups() {
    var popupPlusOpen = $('.js-popup-plus-open');

    popupPlusOpen.on('click', function (e) {
        e.preventDefault();
        popupPlus = $(this).siblings('.js-popup-plus-text');
        if (popupPlus.length) {
            popupPlus.slideToggle();
            $(this).toggleClass('item__opener_opened');
        }
    });
}

function callback() {
    var callback = $('.js-callback'),
        callbackBtn = $('.js-callback-btn'),
        callbackClose = $('.js-callback-close, .js-callback .popup__overlay'),
        callbackForm = $('.js-callback-form'),
        callbackSend = $('.js-callback-send');

    callbackSend.on('click', function (e) {
        e.preventDefault();

        var send = $(this);

        var callbackForm = $(this).siblings('.js-callback-form');

        callbackForm.find('.error').removeClass('error');

        var callbackName = callbackForm.find('.js-callback-name'),
            callbackEmail = callbackForm.find('.js-callback-email'),
            callbackPhone = callbackForm.find('.js-callback-phone'),
            callbackText = callbackForm.find('.js-callback-text'),
            callbackPrivacy = callbackForm.siblings('.js-callback-privacy'),
            callbackMsg = callbackForm.parent().siblings('.js-callback-msg'),
            data = {},
            error = '';

        if (!(data.name = callbackName.val())) {
            error += 'Введите имя. ';
            callbackName.addClass('error');
        }
        if (!(data.phone = callbackPhone.val())) {
            error += 'Введите телефон. ';
            callbackPhone.addClass('error');
        }
        if (!(data.email = callbackEmail.val())) {
            error += 'Введите E-mail. ';
            callbackEmail.addClass('error');
        }
        if (!(data.text = callbackText.val())) {
            error += 'Введите комментарий. ';
            callbackText.addClass('error');
        }

        data.mailto = callbackForm.data('mailto');

        if (error == '') {
            $.ajax({
                url: '/bitrix/templates/atlas_hm/ajax/order.php',
                type: 'POST',
                data: data,
                success: function(res) {
                    if (res == 'true') {
                        callbackForm.find('input, textarea').val('');
                        if (callbackForm.parents('.popup').length) {
                            callbackForm.hide();
                            send.hide();
                            send.siblings('.btn').show();
                            callbackPrivacy.hide();
                        }
                        callbackMsg.html('Спасибо! Ваша заявка отправлена!');
                        setTimeout(function() {
                            callback.hide();
                            $('body').removeClass('stop-scrolling');
                            callbackForm.show();
                            if (callbackForm.parents('.popup').length) {
                                callbackForm.show();
                                send.show();
                                send.siblings('.btn').hide();
                                callbackPrivacy.show();
                                callbackMsg.html('');
                            }

                        }, 3000);
                    }
                }
            });
        }


    });


    $('.js-callback-close-btn').on('click', function(e) {
        e.preventDefault();
        callback.hide();
        $(this).hide();
        $(this).siblings('.btn').show();
        callbackForm.show();
        callbackMsg.html('');
    })

    if (callbackBtn.length) {
        callbackBtn.on('click', function (e) {
            e.preventDefault();
            $('body').addClass('stop-scrolling');
            callback.show();
        });
    }

    if (callbackClose.length) {
        callbackClose.on('click', function (e) {
            if (e.target === this) {
                e.preventDefault();
                $('body').removeClass('stop-scrolling');
                callback.hide();
            }
        });
    }


}

function mainMenu() {
    var burger = $('.js-main-menu-burger'),
        menu = $('.js-main-menu');

    burger.on('click', function (e) {
        e.preventDefault();

        if (menu.length) {
            menu.toggleClass('header__menu_opened');
            $('body').toggleClass('stop-scrolling');
        }
    })

}