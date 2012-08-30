// Version 2.0 Build 3

/* A few more functions */


$(document).ready(function () {


// scrolls down
function scrollToBottom() {
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 200);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 250);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 300);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 350);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 400);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 450);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 500);
}


// get's the content of GET parameter
function get(name) {
    return unescape((RegExp(name + '=' + '(.+?)(&|$)').
    exec(location.search)||[,""])[1]);
}


// for iOS, shows the time when tapping onto a message
if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
    $("*").click(function(){});
} // if


setTimeout(function() {
    $('#new_name').val(get("name")); // adds the content of the GET parameter "name" into the name field
    scrollToBottom(); // scrolls down
}, 0);


}); // document.ready