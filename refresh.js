// Version 1.0 Build 1

/* Befuellt #chat einmal pro Sekunde mit dem inhalt von chat.txt */


$(document).ready(function () {


var xmlhttp;

// damit Ajax funktioniert
function loadXMLDoc(url,cfunc) {
    
    // fuer moderne Browser (Safari, Chrome, Firefox, Opera)
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    }
    
    // fuer alte Browser (Internet Explorer)
    else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange = cfunc;
    xmlhttp.open("post",url,true);
    xmlhttp.send();
    
} // loadXMLDoc()


// laedt chat.txt und befuellt #chat mit dessen inhalt
function loadChat() {
    loadXMLDoc("chat.txt",function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        document.getElementById("chat").innerHTML = ""; // leert #chat
        document.getElementById("chat").innerHTML = xmlhttp.responseText; // befüllt #chat
      } // if
    }); // loadXMLDoc() 
} // loadChat()


// ruft loadChat() ein mal pro Sekunde auf
setInterval(function() {
    loadChat();
}, 1000);


// ruft loadChat() nach Aufbau der Seite auf
setTimeout(function() {
    loadChat();
}, 0);


}); // document.ready