// Build 15


// required modules:
var io = require('socket.io').listen(9002);
var fs = require('fs');


// main vars:
var users = {};
var usersLastRemove = new Date().getTime();
var usersChanged = false;


// socket io:
io.sockets.on('connection', function (socket) {
  	
  	
  	socket.on('newMessage', function (message) {
    	
    	io.sockets.emit('newMessage', message);
    	
    });
    
    
    io.sockets.emit('updatedUsers', users);
    
    socket.on('updateUsers', function (user) {
    
    	usersChanged = false;
    	
    	if (new Date().getTime() - usersLastRemove >= 5*1000) {
    	
    		for (userID in users) {
				if (new Date().getTime() - users[userID].unixTime >= 10*1000) { // if it hasn't been updated for 10s or more
					delete users[userID]; // the user is being removed
					usersChanged = true;
				}
			}
		
			usersLastRemove = new Date().getTime();
			
		}
    	
    	user.unixTime = new Date().getTime();
    	
    	if (users[user.userID] == null) usersChanged = true; // if user doesn't already exist
    	else { // if user exists
    		if (users[user.userID].name != user.name) { // if name has changed
    			usersChanged = true;
    		}
    	}
	
    	users[user.userID] = user; // adds the user to users or updates the user if he has already been added
    	    	
    	if (usersChanged == true) io.sockets.emit('updatedUsers', users); // if new user was added
    	
    });
	
    
});
