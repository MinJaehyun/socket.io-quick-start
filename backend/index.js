const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);

// 기존 내용을 아래로 수정(경로 관련)
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });

// resolve 는 / 를 절대경로로 처리, join 은 상대경로로 처리한다.
app.get('/', (req, res) => {
    res.sendFile(path.resolve('../frontend/index.html'));
  });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });


// socket은 커넥션이 성공했을 때 커넥션에 대한 정보를 담고 있는 변수
// io.on('connection', (socket) => {            
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });


/** 
 * 메시지 수신을 위한 socket.on 설정, 
 * server 에서 client 에게 io.emit 을 통한 메시지 송신  
*/

io.on('connection', (socket) => {
  // socket.on 으로 작명메시지를 받고 안에 data를 msg 로 사용한다(client 에서 보낸 input.value 값이 여기에 들어있다)
  // s1(2). socket.on 을 통한 메시지 수신 후, io.emit 을 통한 메시지 송신
  socket.on('chat message', (msg) => {
    // s2(3). server 에서 client 에게 받은 메시지를 송신하기 위해서는 io.emit 를 사용한다
    // 관습적으로 아래 'chat message' 는 broadcast 로 작성한다.
    io.emit('broadcast', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
