const express = require("express");
const { registerAdmin,adminLogin ,getAllOrders,getOrderStats,getMonthlySales,getBestSellingProducts, updateOrderStatus } = require("../controllers/adminController");
const router = express.Router();

router.post("/register", registerAdmin);
router.post('/login', adminLogin);
router.get("/orders", getAllOrders);
router.get("/order-stats", getOrderStats);
router.get("/monthly-sales", getMonthlySales);
router.get("/best", getBestSellingProducts);
router.put("/order-status", updateOrderStatus);
module.exports = router;
