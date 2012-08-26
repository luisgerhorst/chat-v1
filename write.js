// Version 1.0 Build 1

/* Nimmt versendete Daten entgegen und schreibt sie in chat.txt */


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
          message = querystring.parse(postData).message;
      write(name, message);
      console.log("Received POST data:\nname='" + name + "'\nmessage='" + message + "'\n");
    });
    
    console.log("Received request\n");

}


function write(name, message){

    var entry = '<div class="entry"><div class="name">' + name + ':</div><div class="content"><span class="message">' + message + '</span><span class="time"></span></div></div>\n';
    
    var file = 'chat.txt';
   
    fs.appendFile(file, entry, function (err) {
      if (err) throw err;
      console.log("Added:\n" + entry + "To:\n" + file + "\n");
    });
    
}


http.createServer(onRequest).listen(8888);
console.log("Server started\n");