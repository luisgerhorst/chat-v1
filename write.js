// Version 1.0 Build 1

/* Nimmt von send.js verschickte Daten entgegen und schreibt sie in chat.txt */


var url = require("url"),
    http = require("http"),
    querystring = require("querystring"),
    fs = require('fs');


function onRequest(request, response) {

    var postData = '';

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk:\n'" + postDataChunk + "'\n");
    });

    request.addListener("end", function() {
      var name = querystring.parse(postData).name,
          message = querystring.parse(postData).message,
          time = querystring.parse(postData).time;
      write(name, message, time);
      console.log("Received POST data:\nname='" + name + "'\nmessage='" + message + "'\n");
    });
    
    console.log("Received request\n");

}


function link(inputText) {
    var replaceText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}


function write(name, message, time) {
    
    var message = link(message) + ' ';

    var entry = '<div class="entry"><div class="name">' + name + ':</div><div class="content"><span class="message">' + message + '</span><span class="time" data-time="' + time + '"></span></div></div>\n';
    
    var file = 'chat.txt';
   
    fs.appendFile(file, entry, function (err) {
      if (err) throw err;
      console.log("Added:\n" + entry + "To:\n" + file + "\n");
    });
    
}

var port = 8888;
http.createServer(onRequest).listen(port);
console.log("Server started, listening on port" + port + "\n");