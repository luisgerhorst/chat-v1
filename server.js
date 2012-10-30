// Build 9

/* get's the by send.js sent data and appends it to chat.txt */


// required modules:
var http = require("http"),
    querystring = require("querystring"),
    fs = require('fs');


// starts a server and listens on port 8002
var port = 8002;
http.createServer(onRequest).listen(port);
console.log("Server started, listening on port " + port + "\n");


// listens for the POST data
function onRequest(req, res) {

    //console.log("Received request\n");

    var postData = '';

    req.setEncoding("utf8"); // post data encoding is now UTF8

    req.addListener("data", function(postDataChunk) { // listens for the data
        postData += postDataChunk; // when a new chunk ('part') of the sent data arrives it's appended to "postData"
        //console.log("Received POST data chunk:\n'" + postDataChunk + "'\n");
    });

    req.addListener("end", function() { // when the whole data has arrived:
    
        var reqType='', userID='', name='', message='', time='';
        reqType = querystring.parse(postData).reqType;
        userID = querystring.parse(postData).userID;
        name = querystring.parse(postData).name;
        message = querystring.parse(postData).message;
        time = querystring.parse(postData).time;
        
        if (reqType == 'message' && userID && name && message && time) saveMessage(userID, name, message, time);
        if (reqType == 'user' && userID && name) saveUser(userID, name);
        
    });
    
    removeUsers();
    
    var responseData = {};
    responseData["messages"] = messages;
    responseData["users"] = users;
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("chat('" + JSON.stringify(responseData) + "')");

}


var messages = {};

var obj = {};
obj["userID"] = 0;
obj["name"] = 'Chat';
obj["message"] = 'Type in your name and message, then hit enter to submit. URLs and mail addresses are hyperlinked.';
obj["time"] = getISODate();

messages[Object.keys(messages).length] = obj;

function getISODate() {
    d = new Date();
    function pad(n){return n < 10 ? '0' + n : n}
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth()+1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
}

function saveMessage(userID, name, message, time) {
    
    console.log("Function saveMessage() was called");
    
    var obj = {};
    obj["userID"] = userID;
    obj["name"] = name;
    obj["message"] = message;
    obj["time"] = time;
    
    messages[Object.keys(messages).length] = obj;
    
}


var users = {};

function saveUser(userID, name) {
    
    var obj = {};
    obj["name"] = name;
    obj["unixTime"] = new Date().getTime();
	
	users[userID] = obj;
	
}


function removeUsers() {
	
	for (userID in users) {
		if (new Date().getTime() - users[userID]["unixTime"] >= 10*1000) {
			delete users[userID];
		}
	}
	
}

