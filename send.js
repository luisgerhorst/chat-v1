// Build 12

/* Sends current UTC time, name and message to the server */


var userID = Math.round(Math.random() * 9999999999);


$.ajaxSetup({

	url: 'http://luisgerhorst.de:8002/',
    cache: false,
    
});


function sendMessage(e) { // function is called in index.html line 32, every time a key is pressed
if (e && e.keyCode == 13 && $('#new_name').val() && $('#new_message').val()) { // if pressed key ("e") is enter (keycode 13) and value of name & message is true

    var name = '', message = '', time = '', data = '';
     
    name = $('#new_name').val(); // value of #new_name is now Javascript variable "name"
    message = $('#new_message').val(); // value of #new_name is now Javascript variable "message"

    time = getISODate(); // creates a new Date object and adds the current UTC time in ISO 8601 format to it
    
    function getISODate() {
    	d = new Date();
    	function pad(n){return n < 10 ? '0' + n : n}
    	return d.getUTCFullYear() + "-" + pad(d.getUTCMonth()+1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
    }
 
    data = 'reqType=message&userID=' + userID + '&name=' + encodeURIComponent(encodeHTML(name)) + '&message=' + encodeURIComponent(message) + '&time=' + time; // creates a string including name, message and time
    
    function encodeHTML(text) {
		return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	}
    
    $.ajax({ // sends the data (Request)
    
        type: 'post', // POST method, GET also works if you change write.js
        data: data // data that should be sent
        
    }); // ajax request
  
    // so you can't change your name anymore:
    $('#name').text(name + ':').removeClass('hide').addClass('show');
    $('#new_name').removeClass('show').addClass('hide');
    
    $('#new_message').val('').attr('placeholder', 'Sent.'); // placeholder to "Sending ..." and empties #new_message
    window.setTimeout(function() {
    	$('#new_message').attr('placeholder', 'Message'); // placeholder after one more second to "Message"
    }, 1000);

} // if
} // send


sendUser();

setInterval(function() {
    sendUser();
}, 5*1000);

function sendUser() {

    var name = '', data = '';
     
    name = $('#new_name').val(); // value of #new_name is now Javascript variable "name"
    
    if (name && userID && $('#name').html()) {
	
		data = 'reqType=user&userID=' + userID + '&name=' + encodeURIComponent(name); // creates a string including name, message and time
    
		$.ajax({ // sends the data (Request)
    
        	type: 'post', // POST method, GET also works if you change server.js
        	data: data // data that should be sent
        
        }); // ajax request
    
    }
	
}