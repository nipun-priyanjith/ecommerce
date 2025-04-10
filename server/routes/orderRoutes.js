const express = require('express');
const { createOrder,getUserOrders } = require('../controllers/orderController');

const router = express.Router();

// Route to handle creating an order
router.post('/', createOrder);
//router.get('/myorders', getUserOrders);
router.get('/user/:userId', getUserOrders);
module.exports = router;
