// Build 13


refresh(); // calls refresh() after the page has loaded

setInterval(function() { // calls refresh() all 2 seconds
    refresh();
}, 2*1000);

var oldMessages; // needed to make Javascript remember the data that has already been loaded

function refresh() {
    
    $.ajax({
    
		dataType: "jsonp",
		jsonpCallback: "chat",
        success: function(data) {
            
            data = JSON.parse(data);
            
            messages = data.messages;
            
            if (messages != oldMessages) { // if the new data unequally with the data that has already been loaded
            	oldMessages = messages; // loaded data becomes the new 'oldMessages'
            	createMessagesHTML(messages);
            	setTime(); // new relative times are calculated
            	scrollDown(); // scroll down to the new entries
            } // if
    
            else { // if no new entries have been added since the last refresh
	        	setTime(); // only new relative times are calculated - function defined in javascript.js
	        } // else
	        
	        users = data.users;
	        createUsersHTML(users);
	        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log('refresh() error: ' + textStatus + " " + errorThrown);
            
        }
        
    });
    
} // refresh


function createMessagesHTML(messages) {
	
	var html='';
	
	for (var number in messages) {
		html += '<li data-userID="' + messages[number].userID + '"><span class="name">' + messages[number].name + ':</span><div class="content"><span class="message">' + linkURLs(messages[number].message) + ' </span><span class="time" data-time="' + messages[number].time + '"></span></div></li>';
	}
	
	$('#messages').html(html);
	
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
	
	for (var userID in users) {
		html += '<li data-userID="' + userID + '">' + users[userID].name + '</li>';
	}
	
	if (html) {
		html = '<p>Online:</p>' + html;
		$('#users').html(html);
	}
	
}

function setTime() { // adds relative timestamps to every entry

    $('span.time').each(function(index) { // for each <span> with the class "time", do:
    if ($(this).attr('data-time')) { // if this <span> has 'data-time' attribute
    
      var time;
      time = moment('"' + $(this).attr('data-time') + '"', "YYYY-MM-DDTHH:mm:ssZ"); // cretates moment() with the content of the data-time attribute
      time = time.from(moment().utc()); // coverts it to realtive timestamps
      $(this).text(time); // add's the relative timestamp into <span class="time"></span>
      
    } // if
    }); // .each
    
}

function scrollDown() { // scrolls down
    window.scrollTo(0,document.body.scrollHeight);
}