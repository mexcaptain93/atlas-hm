$(document).ready(function () {
    indexSlider();
});

function indexSlider() {
    var indexSlider = $('.js-index-slider');

    if (indexSlider.length > 0) {
        indexSlider.slick({

        });

        $('.js-index-slider-prev').on('click', function (e) {
            e.preventDefault();
            indexSlider.find('.slick-prev').click();
        });

        $('.js-index-slider-next').on('click', function (e) {
            e.preventDefault();
            indexSlider.find('.slick-next').click();
        });
    }


}