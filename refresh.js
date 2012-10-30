// Build 10

/* Befuellt #chat einmal pro Sekunde mit dem inhalt von chat.txt */


// calls refresh() after the page has loaded
refresh();


// call refresh() all 2 seconds
setInterval(function() {
    refresh();
}, 2000);


// loads chat.txt and adds it's content to #chat

var oldMessages; // needed to make Javascript remember the data that has already been loaded

function refresh() {
    
    $.ajax({
    
        crossDomain: true,
		dataType: "jsonp",
		jsonpCallback: "chat",
        success: function(data) {
            
            data = JSON.parse(data);
            
            messages = data["messages"];
            
            if (messages != oldMessages) { // if the new data unequally with the data that has already been loaded
            	oldMessages = messages; // loaded data becomes the new 'oldMessages'
            	createMessagesHTML(messages);
            	setTime(); // new relative times are calculated
            	scrollDown(); // scroll down to the new entries
            } // if
    
            else { // if no new entries have been added since the last refresh
	        	setTime(); // only new relative times are calculated - function defined in javascript.js
	        } // else
	        
	        users = data["users"];
	        createUsersHTML(users);
	        
	        
	        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log('refresh() error: ' + textStatus + " " + errorThrown);
            
        },
        
    });
    
} // refresh


function createMessagesHTML(messages) {
	
	var html='';
	
	for (var key in messages) {
		html = html + '<li data-userID="' + messages[key]["userID"] + '"><span class="name">' + messages[key]["name"] + ':</span><div class="content"><span class="message">' + linkURLs(messages[key]["message"]) + ' </span><span class="time" data-time="' + messages[key]["time"] + '"></span></div></li>';
	}
	
	$('#messages').html(html);
	
	// function via http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links - hyperlinks URLs
	function linkURLs(text) {
		var url = '', www = '', mail = '';
		url = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim; // URLs starting with http://, https://, or ftp://
    	www = /(^|[^\/])(www\.[\S]+(\b|$))/gim; // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    	mail = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;  // Change email addresses to mailto:: links.
    	return String(text).replace(url, '<a href="$1" target="_blank">$1</a>').replace(www, '$1<a href="http://$2" target="_blank">$2</a>').replace(mail, '<a href="mailto:$1">$1</a>');
    }
	
}


function createUsersHTML(users) {
	
	var html='';
	
	for (var key in users) {
		html = html + '<li data-userID="' + key + '">' + users[key]["name"] + '</li>';
	}
	
	html = '<p>Online:</p>' + html;
	
	$('#users').html(html);
	
}


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