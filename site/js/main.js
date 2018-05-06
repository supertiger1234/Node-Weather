let suggestionsShown = false;
$(function() {
    setTimeout(function(){
        $("html body").animate({
            backgroundColor: "#70d1ff"
        }, 500, function () {
            var filterVal = 'blur(' + 50 + 'px)';
            $(".pgBg").css({
                'filter':filterVal,
                'transition':'all 1.5s ease-out'
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
    var elementAppend = '';

    suggestions.forEach(function(item){
        console.log('ID: ' + item.id);
        elementAppend += '<span class="eachCity" onclick="setLocationClick(' + item.id + ');">' + item.name + '<br><b>' + item.country + '</b></span>';
    });

    $('.suggestionsList').html(elementAppend);

    if (suggestions.length === 0){
        $('.suggestionsList').fadeOut('fast')
            .animate({
                'height': '0'
            }, {duration: 'slow', queue: false}, function () {
            });
        suggestionsShown = false;
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

ipcRenderer.on('sendWeatherInfo', (event, weatherJSON) => {
    const temperature = weatherJSON.main.temp;
    const detail = weatherJSON.weather[0].description;
    $('#temp').text(temperature + "°");
    $('#detail').text(detail);
    setTimeout(function(){
        $("html body").animate({
            backgroundColor: "#70d1ff"
        }, 500, function () {
            $(".pgBg").css({
                'filter':'none',
                'transition':'all 0.5s ease-out',
            });
            $('.weatherChooser').fadeOut('fast');

             $('.box').animate({'bottom': '20px'});
                $('.details').fadeIn('fast')
                    .css("display", "absolute")
                    .hide()
                    .fadeIn();
        });
    }, 500);
});


function setLocationClick(ID) {
    ipcRenderer.send('sendWeatherID', ID)
}

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
