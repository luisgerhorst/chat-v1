// Build 14

//function start() { // I'm wrapping the whole code in a function so I can export it as module (and for example start all my files with one command)


// required modules:
var io = require('socket.io').listen(8020);


// main vars:
var users = {},
	usersLastRemove = new Date().getTime();
	usersChanged = false;


// socket io:
io.sockets.on('connection', function (socket) {
  	
  	
  	socket.on('newMessage', function (message) {
    	
    	io.sockets.emit('newMessage', message);
    	
    });
    
    
    io.sockets.emit('updatedUsers', users);
    
    socket.on('updateUsers', function (user) {
    
    	usersChanged = false;
    	
    	remove();
    	save(user);
    	    	
    	if (usersChanged == true) io.sockets.emit('updatedUsers', users); // if new user was added
    	
    });
    
    
    function save(user) {
    
    	user.unixTime = new Date().getTime();
    	
    	
    	if (users[user.userID] == null) usersChanged = true; // if user doesn't already exist
    	else { // if user exists
    		if (users[user.userID].name != user.name) { // if name has changed
    			usersChanged = true;
    		}
    	}
	
    	users[user.userID] = user; // adds the user to users or updates the user if he has already been added
    	
    }
    
    
    function remove() {
    
		if (new Date().getTime() - usersLastRemove >= 5*1000) {
    	
    		for (userID in users) {
				if (new Date().getTime() - users[userID].unixTime >= 10*1000) { // if it hasn't been updated for 10s or more
					delete users[userID]; // the user is being removed
					usersChanged = true;
				}
			}
		
			usersLastRemove = new Date().getTime();
			
		}
		
	}
	
    
});


/*} // start()

start(); // start's the chat (only if the file is executed directly and not when it's used as module)

exports.start = start; // makes start() available as module*/
