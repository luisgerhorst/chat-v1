The send.js sends the message (using Ajax) to write.js which writes it (including HTML Tags) into chat.txt. refresh.js loads the content of chat.txt one time a second into the div #chat.

# Install

Because the chat uses node.js (http://nodejs.org/) to receive the messages and append them to chat.txt, you have to install node and then execute the file write.js with it. You also find a PHP based version of the chat at http://github.com/luisgerhorst/chat .

1. Install node.js, you find a guidance for many systems at http://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

2. Download the chat and navigate to it's directory.

3. Open send.js in a text editor and change 'http://domain.com:8888/' to your server's domain and save the file. (For example if your domain is 'http://luisgerhorst.de/' you have to change it to 'http://luisgerhorst.de:8888/'.)

4. Open the command line and navigate to the chat's directory, then execute write.js with node by typing "node write.js" and you're done!

# More

If you use the chat regularly, you can add ?name=[your name] to the chat's URL so your name is automatically added into the Name field. Example URL: http://chat.luisgerhorst.de/?name=Luis