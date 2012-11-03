// Build 14


var userID = Math.round(Math.random() * 9999999999);


$.ajaxSetup({

	url: 'http://luisgerhorst.de:8002/',
    cache: false
    
});


function sendMessage(e) { // function is called by index.html's form, every time a key is pressed

	var name='', message='';
	name = $('#new_name').val();
	message = $('#new_message').val();

	if (e && e.keyCode == 13 && name && message) { // if pressed key ("e") is enter (keycode 13) and value of name & message is true

    	var data = {};
    	data.reqType = 'message';
    	data.userID = userID;
	    data.name = encodeHTML(name);
	    data.message = encodeHTML(message);
	    data.time = getISODate();
    
	    $.ajax({ // sends the data (Request)
    
        	type: 'post', // POST method, GET also works if you change the server
        	data: JSON.stringify(data) // data to be sent
        
        });
        
        // so you can't change your name anymore:
		$('#name').text(name + ':').removeClass('hide').addClass('show');
		$('#new_name').removeClass('show').addClass('hide');
    
		// so the user knows the message is sent (changes the placeholder)
		$('#new_message').val('').attr('placeholder', 'Sent.'); // placeholder to "Sending ..." and empties #new_message
		window.setTimeout(function() {
		    $('#new_message').attr('placeholder', 'Message'); // placeholder after one more second to "Message"
		}, 1000);

    }
    
}

function encodeHTML(text) {
	return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
    
function getISODate() {
    var d = new Date();
    function pad(n){return n < 10 ? '0' + n : n}
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth()+1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
}


sendUser();

setInterval(function() {
    sendUser();
}, 5*1000);

function sendUser() {

    var name = '', data = '';
     
    name = $('#new_name').val(); // value of #new_name is now Javascript variable "name"
    
    if (name && userID && $('#name').html()) {
	
		var data = {};
    	data.reqType = 'user';
    	data.userID = userID;
	    data.name = encodeHTML(name);
    
		$.ajax({ // sends the data (Request)
    
        	type: 'post', // POST method, GET also works if you change server.js
        	data: JSON.stringify(data) // data that should be sent
        
        }); // ajax request
    
    }
	
}