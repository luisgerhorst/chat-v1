# Features

- messages are forwarded to clients (not stored on the server)
- HTTP server not included

# Summary

The chat uses socket.io (http://socket.io) to send messages to the server which redirects them to all clients. After the client has sent away his first message he updates his status every five seconds so the server knows he's just online. Every time a user is added/removed the new data is sent to all clients.

The folder `client` contains files for the client that have to be delivered by a HTTP server (for example Apache), the folder `server` contains the node.js app to be executed on the server.

# More

Feel free to send me a mail if you have problems or a question. `luis@luisgerhorst.de`

If you use the chat regularly, you can add `?name=[your name]` to the chat's URL so your name is automatically entered into the name field.