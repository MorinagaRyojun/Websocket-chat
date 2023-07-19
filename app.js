const WebSocket = require('ws');
const port = 8080;
const express = require('express');
const socketio = require('socket.io');
const app = express();

// const wss = new WebSocket.Server({port:port}, () => {
//     console.log(`Server is Started on PORT : ${port}`);
// });

// wss.on('connection', ws => {
//     console.log('New client is connected');
//     wss.on('close', ws => {
//         console.log("client has Disconnected")
//     });
// });


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render("index")
})

const server = app.listen(port, () => {
    console.log(`Server is Started on PORT : ${port}`);
});

//SocketIO 
const io = socketio(server)

io.on('connection', socket => {
    console.log("New user connected");

    socket.userName = "Anonymous"

    socket.on("chang_username", data => {
        socket.userName = data.username
    });

    socket.on("new_message", data => {
        console.log("New message");
        socket.emit("receive_message", { message: data.message, username: socket.userName});
    })
});