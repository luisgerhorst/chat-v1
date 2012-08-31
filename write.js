// Build 4

/* get's the by send.js sent data and appends it to chat.txt */


// required modules:
var url = require("url"),
    http = require("http"),
    querystring = require("querystring"),
    fs = require('fs');


// starts a server and listens on port 8888
var port = 8888;
http.createServer(onRequest).listen(port);
console.log("Server started, listening on port " + port + "\n");


// listens for the POST data
function onRequest(request, response) {

    console.log("Received request\n");

    var postData = '';

    request.setEncoding("utf8"); // post data encoding is now UTF8

    request.addListener("data", function(postDataChunk) { // listens for the data
      postData += postDataChunk; // when a new chunk ('part') of the sent data arrives it's appended to "postData"
      console.log("Received POST data chunk:\n'" + postDataChunk + "'\n");
    });

    request.addListener("end", function() { // when the whole data has arrived:
      var name = querystring.parse(postData).name, // name is now the content of name (from the sent string)
          message = querystring.parse(postData).message,
          time = querystring.parse(postData).time;
      write(name, message, time); // calls the function write
      console.log("Received POST data:\nname='" + name + "'\nmessage='" + message + "'\ntime=" + time + "\n");
    });

}


function write(name, message, time) {

    name = html(name); // encodes HTML tags
    
    message = link(html(message)) + ' '; // encodes HTML tags, hyperlinks URLs and adds a space to the end of the message

    var entry = '<div class="entry"><div class="name">' + name + ':</div><div class="content"><span class="message">' + message + '</span><span class="time" data-time="' + time + '"></span></div></div>\n'; // creates the entry that will be written into chat.txt
    
    var file = 'chat.txt';
   
    // appends the entry to the file (chat.txt)
    fs.appendFile(file, entry, function (err) {
      if (err) throw err;
      else console.log("Added:\n" + entry + "To:\n" + file + "\n");
    });
    
}


// function via http://css-tricks.com/snippets/javascript/htmlentities-for-javascript/ - encodes HTML tags
function html(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


// function via http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links - hyperlinks URLs
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