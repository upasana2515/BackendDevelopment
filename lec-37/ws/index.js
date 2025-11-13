let {WebSocketServer} = require('ws');
const wss = new WebSocketServer({port: 3001});

let{subscriber} = require('../shared/redis');

wss.on("connection" , (socket)=>{
    console.log("New client connected");

    async function bookUpdate(){
        await subscriber.connect();
        subscriber.SUBSCRIBE("book:update", (message)=>{
            console.log("Book update received");
        })
    }
    bookUpdate()
})
