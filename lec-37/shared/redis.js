
const {createClient} = require('redis');
let pulisher = createClient();
let subscriber = createClient();

module.exports = {
    publisher: pulisher,
    subscriber: subscriber
};

