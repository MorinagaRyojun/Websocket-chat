// Use socketio
// const WebSocket = require('ws');
// const port = 8080;
// const express = require('express');
// const socketio = require('socket.io');
// const app = express();


// app.set('view engine', 'ejs');
// app.use(express.static('public'));

// app.get('/', (req,res) => {
//     res.render("index")
// })

// const server = app.listen(port, () => {
//     console.log(`Server is Started on PORT : ${port}`);
// });

// //SocketIO 
// const io = socketio(server)

// io.on('connection', socket => {
//     console.log("New client is connected");

//     socket.userName = "Anonymous"

//     socket.on("chang_username", data => {
//         socket.userName = data.username
//     });

//     socket.on("new_message", data => {
//         console.log("New message");
//         io.sockets.emit("receive_message", { message: data.message, username: socket.userName});
//     });

//     socket.on('typing', data => {
//         socket.broadcast.emit('typing', {username: socket.userName})
//     });
// });





//Use WebSocket

const WebSocket = require('ws');
const port = 4040;
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

const server = app.listen(port, () => {
  console.log(`Server is started on PORT: ${port}`);
});


const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client is connected');

  ws.userName = 'Anonymous';

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.event === 'chang_username') {
      ws.userName = data.username;
    } else if (data.event === 'new_message') {
      console.log('New message');
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ event: 'receive_message', data: { message: data.message, username: ws.userName } }));
        }
      });
    } else if (data.event === 'typing') {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ event: 'typing', data: { username: ws.userName } }));
        }
      });
    }
  });
});
