// Build 6

/* Befuellt #chat einmal pro Sekunde mit dem inhalt von chat.txt */


/* function from http://webdesign.onyou.ch/2010/08/04/javascript-time-ago-pretty-date/ - converts ISO 8601 timestamps to relative timestamps */
function relativeTime(date_str){
	var time_formats = [
	[60, 'seconds', 1], // 60
	[120, '1 minute ago', '1 minute from now'], // 60*2
	[3600, 'minutes', 60], // 60*60, 60
	[7200, '1 hour ago', '1 hour from now'], // 60*60*2
	[86400, 'hours', 3600], // 60*60*24, 60*60
	[172800, 'yesterday', 'tomorrow'], // 60*60*24*2
	[604800, 'days', 86400], // 60*60*24*7, 60*60*24
	[1209600, 'last week', 'next week'], // 60*60*24*7*4*2
	[2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
	[4838400, 'last month', 'next month'], // 60*60*24*7*4*2
	[29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
	[58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2
	[2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
	[5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
	[58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
	];
	var time = ('' + date_str).replace(/-/g,"/").replace(/[TZ]/g," ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	if(time.substr(time.length-4,1)==".") time =time.substr(0,time.length-4);
	var seconds = (new Date - new Date(time)) / 1000 + (new Date).getTimezoneOffset()*60;
	var token = 'ago', list_choice = 1;
	if (seconds < 0) {
		seconds = Math.abs(seconds);
		token = 'from now';
		list_choice = 2;
	}
	var i = 0, format;
	while (format = time_formats[i++])
		if (seconds < format[0]) {
			if (typeof format[2] == 'string')
				return format[list_choice];
			else
				return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
		}
	return time;
}


// adds relative timestamps to every entry
function time() {
    $('span.time').each(function(index) { // for each <span> with the class "time", do:
      var time;
      time = $(this).attr('data-time'); // get's the content of 'data-time=""' (for example 
      time = relativeTime(time); // coverts it to realtive timestamps
      $(this).text(time); // add's the relative timestamp into <span class="time"></span>
    }); // .each
}


// loads chat.txt and adds it's content to #chat
var loadedData; // needed to make Javascript remember the data that has already been loaded
function refresh() {

    $.ajaxSetup ({
        cache: false // Disable caching of AJAX ( responses
    }); // .ajaxSetup

    $.get('chat.txt', function(data) { // loads the content of chat.txt
    
        if (data != loadedData) { // if the new data unequally with the data that has already been loaded
            loadedData = data; // loaded data becomes the new 'loadedData'
            $('#chat').html(data); // #chat is filled with the loaded data
            time(); // new relative times are calculated
        } // if
    
        else { // if no new entries have been added since the last refresh
	        time(); // only new relative times are calculated
        } // else
    
    }); // .get
    
} // refresh


// calls refresh() one time a second
setInterval(function() {
    refresh();
}, 1000);

// calls refresh() after the page has loaded
refresh();