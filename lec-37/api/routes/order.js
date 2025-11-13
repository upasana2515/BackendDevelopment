const express = require('express');
const orderController = require('../controller/order');
const router = express.Router();

// Route to place an order
router.post('/', orderController.postPlaceOrder);
module.exports = router;