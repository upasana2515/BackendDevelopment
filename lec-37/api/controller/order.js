//controller function to handle placing an order
const OrderBook = require('../service/orderbook');


const ob = new OrderBook("BTCUSD");
let {publisher} = require('../../shared/redis');
module.exports.postPlaceOrder = async (req, res) => {
    //user, quantity, type, price, side, symbol
    const { user, quantity, type, price, side} = req.body;
    //basic validation
    if (!user || !quantity || !type || !price || !side) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    let response = ob.placeOrder(price, quantity, type, side, user);
    await publisher.connect();
    await publisher.PUBLISH("book:update",JSON.stringify(response.book))
    console.log(response);
    res.json(response);
}