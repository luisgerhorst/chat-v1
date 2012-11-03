**Version 3.1.1**

send.js sends the message (using jQuery Ajax) to server.js that saves it into an object, also one time every 5 seconds it send.js sends the userID and name to the server (that also saves it into an object). If a user hasn't sent his userID to the server for 10 seconds or more, the server removes him from the users object. refresh.js loads the messages and users as JSON object from the server and displays them in #messages and #users.

# Install

Because the chat uses node.js (http://nodejs.org/) to receive the messages, you have to install node and then execute the file server.js with it.

1. Install node.js, you find a guidance for Mac, Windows, Ubuntu and a few more systems on http://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

2. Download the chat and navigate to it's directory.

3. Open send.js in a text editor, change 'http://luisgerhorst.de:8002/' in line 11 to your server's domain and save the file. (For example if your domain is 'http://alf.me/' you have to change it to 'http://alf.me:8002/'.)

4. Open the command line and navigate to the chat's directory, then execute server.js with node by typing "nohup node server.js &" and you're done! (If you just type "node server.js", the process stops when you close the Terminal.)

# More

Feel free to **send me a mail** if you have problems or a question. luis@luisgerhorst.de

If you've started the chat with "nohup node server.js &", everything you would have seen on the command line is added to nohup.out (in the chat's folder). Very helpful if there's an error or something. 

If you want to **stop the chat**, you can get it's PID by typing "ps aux", search the process with the command "node server.js", and write "kill -s 15 PID-OF-NODE-WRITE-JS" (if the PID is 1267, you have to type "kill -s 15 1267").

If you **use the chat regularly**, you can **add ?name=[your name]** to the chat's URL so your name is automatically added into the Name field. Example URL: http://chat.luisgerhorst.de/?name=Alf

If your webspace doesn't supports node.js or you're just a PHP fanboy, you can get an older, **PHP based version** of the chat on http://github.com/luisgerhorst/php-chat