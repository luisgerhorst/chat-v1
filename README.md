# Features

- messages are forwarded to clients (not stored on the server)
- HTTP server not included

The chat uses socket.io (http://socket.io) to send messages to the server which redirects them to all clients. After the client has sent away his first message he updates his status every five seconds so the server knows he's just online. Every time a user is added/removed the new data is sent to all clients.

# More

Feel free to send me a mail if you have problems or a question. luis@luisgerhorst.de

If you use the chat regularly, you can add ?name=[your name] to the chat's URL so your name is automatically added into the Name field.