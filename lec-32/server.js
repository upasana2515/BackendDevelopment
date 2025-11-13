const{WebSocketServer} = require('ws');
const wss = new WebSocketServer({port:8880});


//rooms functionality

let rooms = new Map();
// {
//     "1234":[s1,s2,s3]
// }

wss.on("connection",function(socket){
    console.log("a new user connection");
    socket.on("message",function(message){
        // {"type":"join"||"chat","playload":{"roomId":"value"}}
        let parsedMessage = JSON.parse(message);
        if(parsedMessage.type=="join"){
            let roomId= parsedMessage.roomId;
            if(!rooms.get(roomId)){
                // rooms.set(roomId,new Set())
                return socket.send("room does not exist")
            }
            rooms.get(roomId).add(socket)
            socket.roomId=roomId;
            socket.send("you are added to room"+ " "+ roomId)
            console.log(rooms)
        }
        else if(ParseMessage.type=="chat"){
            let roomId= socket.roomId;
            let chatMessage= parsedMessage.payload.message;
            let allclients= rooms.get(roomId);
            allclients.forEach((clientSocket)=>{
                if(clientSocket!==socket){
                    clientSocket.send(chatMessage)
                }
            })
        }
        else if(parsedMessage.type=="create"){
            let roomId =Math.floor(Math.random()*100000000).toString();
            rooms.set(roomId,new Set())
            socket.roomId=roomId;
            socket.send("your room is created with id"+ " "+ roomId)
        }
    })
})