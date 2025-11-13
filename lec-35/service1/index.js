const {createClient}=require("redis");
let publisher=createClient();

async function notifyMe(){ 
    await publisher.connect()
    await publisher.PUBLISH("notify_me","data");
    await publisher.PUBLISH("like","your post has been liked!!");
}
notifyMe()