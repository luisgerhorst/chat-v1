// Version 1.0 Build 1

/* Sends current UTC time, name and message to the server */


function checkSubmit(e) { // function is called in index.html line 32, every time a key is pressed
if(e && e.keyCode == 13) { // if pressed key ("e") is enter (keycode 13)
     
  var name = $('#new_name').val(); // value of #new_name is now Javascript variable "name"
  var message = $('#new_message').val(); // value of #new_name is now Javascript variable "message"
  
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

  var time = new Date(); // creates new date
  var time = ISODateString(time); // time is now the currrent UTC time in ISO 8601 format
 
  var entry = 'name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message) + '&time=' + time; // creates a string including name, message and time
 
  $.ajax({ // sends the data (Request)

    url: 'http://luisgerhorst.de:8888/', // where the data should be sent
    type: 'post', // POST method, GET would also work
    data: entry, // data that should be sent
    
  }); // ajax request
  
  $('#new_message').attr('placeholder', 'Sending ...'); // placeholder to "Sending ..."
  $('#new_message').val(''); // empties #new_message
  window.setTimeout(function() {
    $('#new_message').attr('placeholder', 'Sent.'); // change placeholder after one second to "Sent."
    window.setTimeout(function() {
      $('#new_message').attr('placeholder', 'Message'); // placeholder after one more second to "Message"
    }, 1000);
  }, 1000);
     
} // if
} // check submit