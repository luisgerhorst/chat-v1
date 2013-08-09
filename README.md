# Features

- messages are forwarded to clients (not stored on the server)
- HTTP server not included

The chat uses socket.io (http://socket.io) to send messages to the server which redirects them to all clients. After the client has sent away his first message he updates his status every five seconds so the server knows he's just online. Every time a user is added/removed the new data is sent to all clients.

# Install

Because the chat uses node.js (http://nodejs.org/) to receive the messages, you have to install node and then execute the file server.js with it.

1. Install node.js, you find a guidance for Mac, Windows, Ubuntu and a few more systems on http://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

2. Install npm with the command "curl http://npmjs.org/install.sh | sh".

4. Download the chat and navigate to it's directory.

5. Install all required node modules defined in package.json with "npm install".

6. Execute server.js with node by typing "nohup node server.js &", you're done! (If you just type "node server.js", the process stops when you close the Terminal.)

# More

Feel free to **send me a mail** if you have problems or a question. luis@luisgerhorst.de

If you've started the chat with "nohup node server.js &", everything you would have seen on the command line is added to nohup.out (in the chat's folder). Very helpful if there's an error or something. 

If you want to **stop the chat**, you can get it's PID by typing "ps aux", search the process with the command "node server.js", and write "kill -s 15 PID-OF-NODE-WRITE-JS" (if the PID is 1267, you have to type "kill -s 15 1267").

If you **use the chat regularly**, you can **add ?name=[your name]** to the chat's URL so your name is automatically added into the Name field. Example URL: http://chat.luisgerhorst.de/?name=Alf

If your webspace doesn't supports node.js or you're just a PHP fanboy, you can get an older, **PHP based version** of the chat on http://github.com/luisgerhorst/php-chat