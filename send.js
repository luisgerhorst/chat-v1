// Version 1.0 Build 1

/* Verschickt Name und Nachricht and den Server */


// bei Enter Taste werden Formluardaten per Ajax verschickt
function checkSubmit(e) { // funktion wird bei Tastendruck in #new_message aufgerufen, gedrückte Taste "e" wird übergeben
if(e && e.keyCode == 13) { // wenn Taste (e) Enter ist (keycode 13) wird 
     
  var name = $('#new_name').val(); // Value von #new_name zu Javascript Variable "name"
  var message = $('#new_message').val(); // Value von #new_message zu Javascript Variable "message"
  
  /* function via http://stackoverflow.com/questions/2573521/how-do-i-output-an-iso-8601-formatted-string-in-javascript */
  function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'
  }

  var date = new Date();
  var time = ISODateString(date);
 
  var entry = 'name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message) + '&time=' + time; // die Inhalte (Value) der Formulars sollen per POST an das PHP Skript weitergeleitet werden. Dafür bauen wir einen String
 
  $.ajax({ // Formulardaten abschicken (Request)

    url: 'http://luisgerhorst.de:8888/', // Ort des Skriptes in dem die per POST ¸bertragenen Daten verarbeitet werden sollen
    type: 'post', // Angabe der POST Methode, GET ginge auch
    data: entry, // Daten die gesendet werden sollen
    
  }); // ajax request
  
  $('#new_message').attr('placeholder', 'Sending ...'); // placeholder ist jetzt "Sending ..."
  $('#new_message').val(''); // lehrt #new_message
  window.setTimeout(function() {
    $('#new_message').attr('placeholder', 'Sent.'); // placeholder nach einer Sekunde zu "Sent." ‰ndern
    window.setTimeout(function() {
      $('#new_message').attr('placeholder', 'Message'); // placeholder nach einer weiteren Sekunde zu "Message"
    }, 1000);
  }, 1000);
     
} // if
} // check submit