let suggestionsShown = false;
$(function() {
    setTimeout(function(){
        $("html body").animate({
            backgroundColor: "#70d1ff"
        }, 500, function () {
            var filterVal = 'blur(' + 50 + 'px)';
            $(".pgBg").css({
                'filter':filterVal,
                'webkitFilter':filterVal,
                'mozFilter':filterVal,
                'oFilter':filterVal,
                'msFilter':filterVal,
                'transition':'all 0.5s ease-out',
                '-webkit-transition':'all 0.5s ease-out',
                '-moz-transition':'all 0.5s ease-out',
                '-o-transition':'all 0.5s ease-out'
            });

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
    }, 500);

});
ipcRenderer.on('sendSuggestions', (event, suggestions) => {
    console.log(suggestions);
    var elementAppend = '';

    suggestions.forEach(function(item){
        console.log('ID: ' + item.id);
        elementAppend += '<span class="eachCity">' + item.name + '<br><b>' + item.country + '</b></span>';
    });
    $('.suggestionsList').html(elementAppend);

    if (suggestions.length === 0 && suggestionsShown){
        $('.suggestionsList').fadeOut('fast')
            .animate({
                'height': '0'
            }, {duration: 'slow', queue: false}, function () {
            });

        return;
    }

        if (suggestionsShown === false) {
            $('.suggestionsList').fadeIn('fast')
                .animate({
                    'height': '200px',
                }, {duration: 'slow', queue: false}, function () {
                });

            suggestionsShown = true
        }

});

$('#location').bind('input propertychange', function() {
    if(this.value.trim().length >=3){
        ipcRenderer.send('getSuggestions', $('#location').val().trim())
    }else if (suggestionsShown){
        $('.suggestionsList').fadeOut('fast')
            .animate({
                'height': '0'
            }, {duration: 'slow', queue: false}, function () {
            });

        suggestionsShown = false
    }
});
