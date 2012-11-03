// Build 12


// required modules:
var http = require("http");


// starts a server and listens on port 8002
var port = 8002;
http.createServer(onRequest).listen(port);
console.log("Server started, listening on port " + port + "\n");


function onRequest(req, res) {

    var postData='';

    req.setEncoding("utf8"); // post data encoding is now UTF8

    req.addListener("data", function(postDataChunk) { // listens for the data
        postData += postDataChunk; // when a new chunk ('part') of the sent data arrives it's appended to "postData"
    });

    req.addListener("end", function() { // when the whole data has arrived
        
        if (postData) {
        
        	var data='', reqType='', userID='', name='', message='', time='';
        
        	data = JSON.parse(postData);
        
        	reqType = data.reqType;
        	userID = data.userID;
        	name = data.name;
        	message = data.message;
        	time = data.time;
        
        	if (reqType == 'message' && userID && name && message && time) saveMessage(userID, name, message, time);
        	if (reqType == 'user' && userID && name) saveUser(userID, name);
        
        }

		else {
    
    		removeUsers();
    
    		var resData = {};
    		resData.messages = messages;
    		resData.users = users;
    
    		res.writeHead(200, {'Content-Type': 'text/plain'});
    		res.end("chat_refresh('" + JSON.stringify(resData) + "')");
    
    	}
        
    });

}


var messages = {}; // creates a new object

setDefaultMessage();

function saveMessage(userID, name, message, time) {
    
    var entry = {};
    entry.userID = userID;
    entry.name = name;
    entry.message = message;
    entry.time = time;
    
    messages[Object.keys(messages).length] = entry;
    
    console.log("Message saved.\n");
    
}


var users = {}; // creates a new object

function saveUser(userID, name) {
    
    var user = {};
    user.name = name;
    user.unixTime = new Date().getTime();
	
	users[userID] = user; // adds the user to users or updates the user if he has already been added
	
}

function removeUsers() {
	
	for (userID in users) { // goes threw all users
		if (new Date().getTime() - users[userID].unixTime >= 10*1000) { // if it hasn't been updated for 10s or more
			delete users[userID]; // the user is being removed
		}
	}
	
}


function setDefaultMessage() {

	var entry = {};
	entry.userID = 0;
	entry.name = 'Chat';
	entry.message = 'Type in your name and message, then hit enter to submit. URLs and mail addresses are hyperlinked.';
	entry.time = getISODate();

	messages[Object.keys(messages).length] = entry;

	function getISODate() {
    	d = new Date();
    	function pad(n){return n < 10 ? '0' + n : n}
    	return d.getUTCFullYear() + "-" + pad(d.getUTCMonth()+1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
    }

}
