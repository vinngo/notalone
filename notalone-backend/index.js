const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const db = require('./firebase');

/*
http server
*/
const app = express();
const server = http.createServer(app);

/*
signaling server using websocket (socket.io)
*/
const io = new Server(server, {
  cors: { 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
 });

const port = 5500;

const waitingUsers = new Map();

app.use(cors());
app.use(express.json());

app.post('/start-matchmaking', (req, res) => {

  /*
  use a hashmap to store user ids and topics.

  match users if they have the same topics.
  */

  /*

    1. add user to the map

  */
  const topic = req.body.topic;
  const userId = req.body.id;

  if (!waitingUsers.has(topic)){
    waitingUsers.set(topic, [userId]);
  } else {
    waitingUsers.get(topic).push(userId);
  }

  //check for match
  if (waitingUsers.get(topic).length >= 2){
    const [user1, user2] = waitingUsers.get(topic).splice(0,2);

    //notify matched users
    setTimeout(() =>{
      io.to(user1).emit('match-found', {peerId: user2, role: 'caller'});
      io.to(user2).emit('match-found', {peerId: user1, role: 'callee'});
    }, 100);

    console.log(`Matched user: ${user1} and ${user2}`);
  }

  res.send({'reply': 'matchmaking started!'});
});

io.on("connection", (socket) => {

  console.log('A user connected:', socket.id);

  socket.on('ice-candidate', ({target, candidate}) => {
    io.to(target).emit('ice-candidate', {candidate});
  })

  //listen for offer from sender and forward that to recepient
  socket.on('offer', ({target, sdp}) => {
    console.log(`Recieved offer from ${socket.id} for ${target}`);
    
    io.to(target).emit('offer', {sdp, sender: socket.id});
  })

  socket.on('answer', ({target, sdp}) => {
    //listen for answer from recepient and forwards that to the sender
    console.log(`Recieved answer from ${socket.id} for ${target}`);

    io.to(target).emit('answer', {sdp, sender: socket.id});
  });
  

});

server.listen(port, () => {
  console.log("Server is running on port", port);
});


