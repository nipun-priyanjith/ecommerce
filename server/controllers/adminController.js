const Admin = require("../models/Admin"); // Mongoose model for Admin
//const bcrypt = require("bcrypt");
const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");
const Order = require("../models/orderModel");
const orderHistory = require("../models/orderHistory");
const Product = require("../models/Product");
const Orderss = require("../models/orderstatus");
//const OrderHistory = require("../models/OrderHistory");
//const Product = require("../models/Product");
//const JWT_SECRET = "your_jwt_secret_key"; // Use environment variables in production

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({ fullName, email, password: hashedPassword });
    await newAdmin.save();

    // Generate JWT
    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      success: true,
      admin: {
        id: newAdmin._id,
        fullName: newAdmin.fullName,
        email: newAdmin.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Admin Login Handler
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  // const JWT_SECRET = "";

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      adminData: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getOrderStats = async (req, res) => {
  try {
    // Count total distinct customers
    const distinctCustomers = await Order.distinct("user");
    const totalCustomers = distinctCustomers.length;

    // Count total orders
    const totalOrders = await Order.countDocuments();

    // Calculate total products sold
    const orders = await Order.find();
    const totalProductsSold = orders.reduce((sum, order) => {
      return sum + order.cartItems.reduce((qtySum, item) => qtySum + item.quantity, 0);
    }, 0);
    console.log("fff",distinctCustomers,totalCustomers,totalOrders,orders,totalProductsSold);

    // Send response
    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalProductsSold,
        totalCustomers,
      },
    });
  } catch (error) {
    console.error("Error fetching order stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching stats",
    });
  }
};




exports.getMonthlySales = async (req, res) => {
  try {
    // Initialize an object to store monthly sales data
    const salesByMonth = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    // Fetch all order data
    const orders = await OrderHistory.find();

    // Calculate total sales for each month
    orders.forEach((order) => {
      const { paymentDetails } = order.orderData;
      if (paymentDetails && paymentDetails.month && paymentDetails.totalPrice) {
        const month = paymentDetails.month; // Month as a number (1-12)
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December",
        ];
        const monthName = monthNames[month - 1]; // Convert to month name
        if (salesByMonth[monthName] !== undefined) {
          salesByMonth[monthName] += paymentDetails.totalPrice;
        }
      }
    });

    // Respond with the calculated data
    res.status(200).json({
      success: true,
      data: salesByMonth,
    });
  } catch (error) {
    console.error("Error fetching monthly sales:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch monthly sales data.",
    });
  }
};

exports.getBestSellingProducts = async (req, res) => {
  try {
    // MongoDB aggregation pipeline
    const topProducts = await OrderHistory.aggregate([
      // Unwind the products array to handle each product separately
      { $unwind: "$orderData.products" },
      
      // Group by product name and calculate total quantity sold
      {
        $group: {
          _id: "$orderData.products.name", // Group by product name
          totalQuantity: { $sum: "$orderData.products.quantity" }, // Sum the quantity
          totalRevenue: {
            $sum: { $multiply: ["$orderData.products.quantity", "$orderData.products.price"] },
          }, // Calculate total revenue for each product
        },
      },
      
      // Sort by total quantity sold in descending order
      { $sort: { totalQuantity: -1 } },

      // Limit to top 5 products
      { $limit: 5 },
    ]);
    console.log("5000/api/admin/best",topProducts);

    // Respond with the top products
    res.status(200).json({
      success: true,
      data: topProducts,
    });
  } catch (error) {
    console.error("Error fetching best-selling products:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch best-selling products.",
    });
  }
};





exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  console.log("-----------------------------------------------------------------------------------------");
  console.log("Order ID:", orderId);
  console.log("Status:", status);

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // if (status === "Delivered") {
    //   // Delete the order if the status is "Delivered"
    //   await Order.findByIdAndDelete(orderId);
    //   return res.status(200).json({ message: "Order delivered and deleted successfully" });
    // }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};
