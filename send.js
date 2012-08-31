// Build 4

/* Sends current UTC time, name and message to the server */


function send(e) { // function is called in index.html line 32, every time a key is pressed
if (e && e.keyCode == 13 && $('#new_name').val() && $('#new_message').val()) { // if pressed key ("e") is enter (keycode 13) and value of name & message is true
     
  var name = $('#new_name').val(), // value of #new_name is now Javascript variable "name"
      message = $('#new_message').val(), // value of #new_name is now Javascript variable "message"

      time = ISODateString(new Date()), // creates a new time and adds the current UTC time in ISO 8601 format to it
 
      entry = 'name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message) + '&time=' + time; // creates a string including name, message and time
 
  $.ajax({ // sends the data (Request)

    url: 'http://luisgerhorst.de:8888/', // where the data should be sent
    type: 'post', // POST method, GET also works if you change write.js
    data: entry // data that should be sent
    /* I also tried to make write.js send a response to the client so I can use the jQuery Ajax Event "success" here (http://api.jquery.com/jQuery.ajax/) and #new_message's value is just set to '' if the request was successful, but I couldn't make it work! Would be nice if someone could help me a bit with this. Feel free to send me a mail! luis@luisgerhorst.de */
    
  }); // ajax request  
  
  
  
  $('#new_message').attr('placeholder', 'Sending ...').val(''); // placeholder to "Sending ..." and empties #new_message
  window.setTimeout(function() {
      $('#new_message').attr('placeholder', 'Sent.'); // change placeholder after one second to "Sent."
      window.setTimeout(function() {
          $('#new_message').attr('placeholder', 'Message'); // placeholder after one more second to "Message"
      }, 1000);
  }, 1000);


     
} // if
} // send


/* function via http://stackoverflow.com/questions/2573521/how-do-i-output-an-iso-8601-formatted-string-in-javascript - creates ISO 8601 (UTC) timestamp */
function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'
}