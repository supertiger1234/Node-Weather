$(function() {
    $("html body").animate({
        backgroundColor: "#70d1ff"
    }, 300, function () {
        $('.weatherChooser').fadeIn('fast').animate({
            'top': '54%'
        }, {duration: 'slow', queue: false}, function() {
            // Animation complete.
        });
    } );
});