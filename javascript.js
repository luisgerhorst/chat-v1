// Version 2.0 Build 2

/* Verschiedene weitere Funktionen */


$(document).ready(function () {


// scrollt nach unten
function scrollToBottom() {
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 200);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 250);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 300);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 350);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 400);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 450);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 500);
}


// liest eine per GET übergebene Variable aus
function get(name) {
    return unescape((RegExp(name + '=' + '(.+?)(&|$)').
    exec(location.search)||[,""])[1]);
}


// Für iPhone, iPod & iPad: Zeigt Datum und Uhrzeit beim Tippen auf die Nachricht
if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
    $("*").click(function(){});
} // if


// Scrollt beim laden der Seite nach unten und setzt den Value von #new_name auf den per GET übergebenen Namen "name"
setTimeout(function() {
    $('#new_name').val(get("name"));
    scrollToBottom();
}, 0);


}); // document.ready