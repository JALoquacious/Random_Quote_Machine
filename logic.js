'use strict';

var text, quotes, authors, idx, orig, url;

function parseData() {
    $.getJSON('http://whateverorigin.org/get?url=' +
        encodeURIComponent('https://litemind.com/best-famous-quotes/') +
        '&callback=?',
        function (data) {
            text = data.contents.toString();
            quotes = text
                .match(/\d+\.\s(.*?)(?=<)/g)
                .join(" ")
                .split(/\d+\. /)
                .splice(1);
            authors = text
                .match(/—[^ ].+?(?=<)/g)
                .join("")
                .split("—");
        }
    );
}

function getQuote() {
    idx = Math.floor(Math.random() * quotes.length);
    $('#quote').html(quotes[idx]);
    $('#author').html(authors[idx]);
}

function tweetQuote() {
    orig = 'https://twitter.com/intent/tweet?text=' +
        encodeURIComponent((quotes[idx] + '—' + authors[idx]));
    url = orig.replace(/'/g, "%27").replace(/"/g, "%22");
    window.open(url);
}

function discoverAuthor() {
    window.open('http://google.com/search?q=' + authors[idx]);
}

$('#get-quote').click(getQuote);
$('#tweet-quote').click(tweetQuote);
$('#discover-author').click(discoverAuthor);

$(document).ready(function () {
    parseData();
});