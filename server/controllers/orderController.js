const Order = require('../models/orderModel');
const orderHistory = require("../models/orderHistory");
const User = require("../models/User");


// const createOrder = async (req, res) => {
//   try {
//     const { shippingDetails, cartItems, paymentDetails, userId } = req.body.orderData;

//     // Validation
//     if (!shippingDetails || !cartItems || !paymentDetails || !userId) {
//       return res.status(400).json({ message: "Missing required fields." });
//     }

//     // Create the new order
//     const newOrder = new Order({
//       user: userId,
//       shippingDetails,
//       cartItems,
//       paymentDetails,
//     });

//     const savedOrder = await newOrder.save();

//     // Create a new orderHistory entry
//     const newOrderHistory = new OrderHistory({
//       orderData: savedOrder,
//     });

//     const savedOrderHistory = await newOrderHistory.save();

//     // Update user's purchase history
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $push: { purchase_history: { orderHistoryId: savedOrderHistory._id } } },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.status(201).json({
//       message: "Order created successfully",
//       order: savedOrder,
//       orderHistory: savedOrderHistory,
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Error creating order", error: error.message });
//   }
// };
//,,,,,,,
const stripe = require("stripe")("");
const createOrder = async (req, res) => {
  try {
    const { shippingDetails, cartItems, paymentDetails, userId } = req.body.orderData;

    if (!shippingDetails || !cartItems || !paymentDetails || !userId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(paymentDetails.totalPrice * 100), // Convert dollars to cents
      currency: "usd",
      payment_method: paymentDetails.methodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // Prevent redirect-based payment methods
      },
    });

    // Save order details in your database
    const newOrder = new Order({
      user: userId,
      shippingDetails,
      cartItems,
      paymentDetails: {
        ...paymentDetails,
        stripePaymentId: paymentIntent.id, // Save the Stripe PaymentIntent ID
      },
    });

    const savedOrder = await newOrder.save();

        // Create an order history record
        const orderHistory = new OrderHistory({
          orderData: savedOrder, // Save the entire order data
        });

        await orderHistory.save();


    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

// controllers/orderController.js
const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

module.exports = { createOrder, getUserOrders };
