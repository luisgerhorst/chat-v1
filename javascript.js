// Build 4

/* A few more functions */


$(document).ready(function () {


$('#new_name').val(get('name')); // adds the content of the GET parameter "name" into the name field
scroll(); // scrolls down


// for iOS, shows the time when tapping onto a message
if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
    $('*').click(function(){});
} // if


// get's the content of GET parameter
function get(name) {
    return unescape((RegExp(name + '=' + '(.+?)(&|$)').
    exec(location.search)||[,''])[1]);
}


// scrolls down
function scroll() {
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 200);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 300);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 400);
    window.setTimeout(function() { window.scrollTo(0,document.body.scrollHeight); }, 500);
}


}); // document.ready