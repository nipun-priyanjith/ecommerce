const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const createUser = require('./routes/userRout');
const userRoutes = require('./routes/userRout');
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require('./routes/orderRoutes');
const dotenv = require('dotenv');
// Middleware
app.use(cors({
  origin: '*', // You can replace * with your frontend URL for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
//app.use(express.json());
app.use(express.json({ limit: '50mb' }));  // Increase limit to 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Load environment variables
dotenv.config();
// Connect to MongoDB
connectDB();


// Routes
app.use('/api/products', productRoutes);
//app.use("/api/users/register", createUser);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/order', orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

