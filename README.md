The send.js sends the message (using jQuery Ajax) to write.js that writes it, including HTML Tags, into chat.txt. refresh.js loads the content of chat.txt one time a second into the div #chat.

# Install

Because the chat uses node.js (http://nodejs.org/) to receive the messages and append them to chat.txt, you have to install node and then execute the file write.js with it. You also find a PHP based version of the chat at http://github.com/luisgerhorst/chat .

1. Install node.js, you find a guidance for Mac, Windows, Ubuntu and a few more systems on http://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

2. Download the chat and navigate to it's directory.

3. Open send.js in a text editor, change 'http://luisgerhorst.de:8888/' to your server's domain and save the file. (For example if your domain is 'http://alf.me/' you have to change it to 'http://alf.me:8888/'.)

4. Open the command line and navigate to the chat's directory, then execute write.js with node by typing "nohup node write.js &" and you're done! (If you just type "node write.js", the process stops when you close the Terminal.)

### Optional

If you don't want all older entries from my chat (http://chat.luisgerhorst.de/) appear in your one, just **delete the whole content of chat.txt**.

# More

If you've started the chat with "nohup node write.js &", everything you would have seen on the command line is added to nohup.out (in the chat's folder). Very helpful if there's an error or something. 

If you want to **stop the chat**, you can get it's PID by typing "ps aux", search the process with the command "node write.js", and write "kill -s 15 PID-OF-NODE-WRITE-JS" (if the PID is 1267, you have to type "kill -s 15 1267").

If you **use the chat regularly**, you can **add ?name=[your name]** to the chat's URL so your name is automatically added into the Name field. Example URL: http://chat.luisgerhorst.de/?name=Alf

If your webspace doesn't supports node.js or you're just a PHP fanboy, you can get the older, **PHP based version** of the chat on http://github.com/luisgerhorst/chat