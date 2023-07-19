// Use Socketio
// (function connect() {
//     let socket = io.connect("http://localhost:8080");

//     let username = document.querySelector('#username');
//     let usernameBtn = document.querySelector('#usernameBtn');
//     let currentUsername = document.querySelector('.card-header');

//     usernameBtn.addEventListener('click', e => {
//         console.log(username.value);
//         socket.emit('chang_username', {username:username.value});
//         currentUsername.textContent = username.value
//         username.value = ''
//     })

//     let message = document.querySelector('#message');
//     let messageBtn = document.querySelector('#messageBtn');
//     let messageList = document.querySelector('#message-list');

//     messageBtn.addEventListener('click', e => {
//         console.log(message.value);
//         socket.emit('new_message', {message: message.value})
//         message.value = ''
//     })

//     socket.on('receive_message', data => {
//         console.log(data)
//         let listItem = document.createElement('li');
//         listItem.textContent = data.username + ": " + data.message;
//         listItem.classList.add('list-group-item')
//         messageList.appendChild(listItem);
//     })

//     let info = document.querySelector('.info');

//     message.addEventListener('keypress', e => {
//         socket.emit('typing');
//     })
//     socket.on('typing', data => {
//         info.textContent = data.username + " is typing...";
//         setTimeout(() => { info.textContent = ''}, 5000);
//     })

// })();



// Use WebSocket

(function connect() {
  const ws = new WebSocket('ws://localhost:4040');

  const username = document.querySelector('#username');
  const usernameBtn = document.querySelector('#usernameBtn');
  const currentUsername = document.querySelector('.card-header');

  usernameBtn.addEventListener('click', () => {
    console.log(username.value);
    const data = JSON.stringify({ event: 'chang_username', username: username.value });
    ws.send(data);
    currentUsername.textContent = username.value;
    username.value = '';
  });

  const message = document.querySelector('#message');
  const messageBtn = document.querySelector('#messageBtn');
  const messageList = document.querySelector('#message-list');

  messageBtn.addEventListener('click', () => {
    console.log(message.value);
    const data = JSON.stringify({ event: 'new_message', message: message.value });
    ws.send(data);
    message.value = '';
  });

  ws.addEventListener('message', (event) => {
    console.log(event.data);
    const data = JSON.parse(event.data);

    if (data.event === 'receive_message') {
      const listItem = document.createElement('li');
      listItem.textContent = data.data.username + ': ' + data.data.message;
      listItem.classList.add('list-group-item');
      messageList.appendChild(listItem);
    } else if (data.event === 'typing') {
      const info = document.querySelector('.info');
      info.textContent = data.data.username + ' is typing...';
      setTimeout(() => {
        info.textContent = '';
      }, 5000);
    }
  });

  message.addEventListener('keypress', () => {
    ws.send(JSON.stringify({ event: 'typing' }));
  });

  
})();
