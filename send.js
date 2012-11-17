// Build 22

var firstMessage = true;
var name='';

function sendMessage(e) { // function is called by index.html's form, every time a key is pressed

	var message='';
	message = $('#new_message').val();
	
	if (firstMessage) { // if it's the first message
		console.log("first message, setting name");
		name = encodeHTML($('#new_name').val());
	}

	if (e && e.keyCode == 13 && name && message) { // if pressed key ("e") is enter (keycode 13) and value of name & message is true

    	var data = {};
			data.userID = userID;
			data.name = name;
			data.message = encodeHTML(message);
			data.time = getISODate();
	    
	    socket.emit('newMessage', data);
	    
		if (firstMessage) { // if it's the first message
			firstMessage = false;
			$('#new_name').addClass('animate');
			setTimeout(function () {
				$('#new_name').hide();
				$('#new_message').addClass('full');
			}, 200);
			sendUser();
		}
    
		// so the user knows the message is sent (changes the placeholder):
		$('#new_message').val('').attr('placeholder', 'Sent.'); // placeholder to "Sending ..." and empties #new_message
		window.setTimeout(function() {
		    $('#new_message').attr('placeholder', name); // placeholder after one more second to the user's name
		}, 1000);

    }
    
    // functions:
    
	function getISODate() {
    	var d = new Date();
    	function pad(n){return n < 10 ? '0' + n : n}
    	return d.getUTCFullYear() + "-" + pad(d.getUTCMonth()+1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
    }
    
}


sendUser();

setInterval(function() {
    sendUser();
}, 5*1000);

function sendUser() {
    
    if (name && userID) { // if user has already sent a message
	
		var data = {};
			data.userID = userID;
			data.name = name;
	    
	    socket.emit('updateUsers', data);
    
    }
    
    else {
    	
    	var data = {};
			data.userID = userID;
			data.name = false;
			
    	socket.emit('updateUsers', data);
    }
	
}


// functions:

function encodeHTML(text) {
	return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
