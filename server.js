// Build 13


// required modules:
var io = require('socket.io').listen(8020);


// main vars:
var users = {};


// socket io:
io.sockets.on('connection', function (socket) {
  	
  	io.sockets.emit('updatedUsers', users)
  	
  	socket.on('newMessage', function (message) {
    	
    	io.sockets.emit('newMessage', message);
    	
    });
    
    socket.on('saveUser', function (user) {
    	
    	user.unixTime = new Date().getTime();
    	
    	var changed = true;
    	if (users[user.userID]) changed = false; // checks if user already exists
	
    	users[user.userID] = user; // adds the user to users or updates the user if he has already been added
    	
    	if (changed) io.sockets.emit('updatedUsers', users); // if new user was added
    	
    });
    
    socket.on('removeUsers', function () {
    	
    	for (userID in users) {
			if (new Date().getTime() - users[userID].unixTime >= 10*1000) { // if it hasn't been updated for 10s or more
				delete users[userID]; // the user is being removed
				var changed = true;
			}
		}
		
		if (changed) io.sockets.emit('updatedUsers', users); // if user was removed
		
    });
    
});
