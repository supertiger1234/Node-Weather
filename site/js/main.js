$(function() {
    $("html body").animate({
        backgroundColor: "#70d1ff"
    }, 500, function () {
        $('.weatherChooser').fadeIn('fast')
            .css("display", "absolute")
            .hide()
            .fadeIn()
            .animate({
            'top': '0'
        }, {duration: 'slow', queue: false}, function() {
            // Animation complete.
        });
    } );
});