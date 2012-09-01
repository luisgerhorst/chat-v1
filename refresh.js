// Build 9

/* Befuellt #chat einmal pro Sekunde mit dem inhalt von chat.txt */


// calls refresh() after the page has loaded
refresh();


// call refresh() all 2 seconds
setInterval(function() {
    refresh();
}, 2000);


// loads chat.txt and adds it's content to #chat

var oldData; // needed to make Javascript remember the data that has already been loaded

function refresh() {

    $.ajaxSetup({
        cache: false // Disable caching of AJAX responses
    }); // .ajaxSetup

    $.get('chat.txt', function(data) { // loads the content of chat.txt
    
        if (data != oldData) { // if the new data unequally with the data that has already been loaded
            oldData = data; // loaded data becomes the new 'oldData'
            $('#chat').html(data); // #chat is filled with the loaded data
            setTime(); // new relative times are calculated - function defined in javascript.js
            scrollDown(); // scroll down to the new entries - function defined in javascript.js
        } // if
    
        else { // if no new entries have been added since the last refresh
	        setTime(); // only new relative times are calculated - function defined in javascript.js
        } // else
    
    }); // .get
    
} // refresh


// adds relative timestamps to every entry
function setTime() {
    $('span.time').each(function(index) { // for each <span> with the class "time", do:
    if ($(this).attr('data-time')) { // if this <span> has 'data-time' attribute
      var time;
      time = moment('"' + $(this).attr('data-time') + '"', "YYYY-MM-DDTHH:mm:ssZ"); // cretates moment() with the content of the data-time attribute
      time = time.from(moment().utc()); // coverts it to realtive timestamps
      $(this).text(time); // add's the relative timestamp into <span class="time"></span>
    } // if
    }); // .each
}


// scrolls down
function scrollDown() {
    window.scrollTo(0,document.body.scrollHeight);
}