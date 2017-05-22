$(document).ready(function () {
    'use strict';

    function getQuote() {
        let data;
        
        $.ajax({
            type: 'GET',
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
            beforeSend: function (xhr) {
                xhr.setRequestHeader(
                    "X-Mashape-Authorization",
                    "DBKOYDp4nomshucwMnoEQmQksVPYp19Fm8mjsnrWWWjfa9Jzbp");
            },
            success: function (result) {
                data = $.parseJSON(JSON.stringify(result));

                $('#tweet-quote').click(
                    tweetQuote.bind(null, data.quote, data.author));
                $('#discover-author').click(
                    discoverAuthor.bind(null, data.author));

                $('#quote').text(data.quote);
                $('#author').text(data.author);
                elementState(['#tweet-quote', '#discover-author'], 'disabled', false);
            },
            error: function () {
                console.log('ERROR');
            }
        });
        return data;
    }

    function tweetQuote(quote, author) {
        let orig = 'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent((quote + ' -- ' + author));
        let url = orig.replace(/'/g, "%27").replace(/"/g, "%22");
        window.open(url);
    }

    function discoverAuthor(author) {
        window.open('http://google.com/search?q=' + author);
    }

    function elementState(argList, attr, bool) {
        argList.map(function (node) {
            $(node).prop(attr, bool);
            (bool) ? $(node).addClass(attr): $(node).removeClass(attr);
        });
    }

    // disable secondary buttons before quote retrieved
    elementState(['#tweet-quote', '#discover-author'], 'disabled', true);

    $('#get-quote').click(getQuote);

}); // END DOCUMENT
