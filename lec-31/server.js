const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8081 });
//events in websocket
//1. connection
//2. message
//3. disconnect

// wss.on("connection",function(socket){
//     console.log("a new user connected")
//     socket.send("welcome!!")
//     setInterval(()=>{
//         socket.send("reliance stock price is"+" "+Math.random())
//     },1000)
// })


//ping pong application
// wss.on("connection",function(socket){
//     console.log("a new user connected")
//     socket.send("welcome!!")
//     socket.on("message",function(message){
//         console.log(message.toString())
//         if(message.toString()==="ping"){
//             socket.send("pong")
//         }else{
//             socket.send("you have not send a ping message")
//         }
//     })
// })


//bradcasting
// let allSockets=[]
// wss.on("connection",function(socket){
//     console.log("user connected")
//     allSockets.push(socket)
//     // console.log(allSockets)
//     socket.on("message",function(message){
//         allSockets.forEach((s)=>{
//             s.send(message.toString())
//         })
//     })
// })


//rooms
const rooms = new Map();
server.on("connection", (ws) => {
  let currentRoom = null;
  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);
      if (data.type === "chat") {
        const message = data.payload.message;
        if (message.startsWith("join:")) {
          const roomName = message.split(":")[1].trim();
          if (currentRoom && rooms.has(currentRoom)) {
            rooms.get(currentRoom).delete(ws);
          }
          if (!rooms.has(roomName)) {
            rooms.set(roomName, new Set());
          }
          rooms.get(roomName).add(ws);
          currentRoom = roomName;
          ws.send(JSON.stringify({
            type: "system",
            payload: { message: `Joined room ${roomName}` }
          }));
        } 
        else {
          if (!currentRoom) {
            ws.send(JSON.stringify({
              type: "error",
              payload: { message: "Join a room first using 'join:roomName'" }
            }));
            return;
          }
          const payload = {
            type: "chat",
            payload: {
              message,
              room: currentRoom
            }
          };
          rooms.get(currentRoom).forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(payload));
            }
          });
        }
      }
    } catch (err) {
      ws.send(JSON.stringify({
        type: "error",
        payload: { message: "Invalid JSON format" }
      }));
    }
  });
  ws.on("close", () => {
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(ws);
    }
  });
});

console.log("WebSocket server running on ws://localhost:8080");

//all this in express
//express=require("express")
//app=express();
//app.listen(3000)
//app.get()
//app.post()