const Product = require('../models/Product');
//const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


const { S3Client, PutObjectCommand } = require('');

// Directly specify the AWS credentials and region
const s3 = new S3Client({
  region: 'ap-southeast-1',  // Replace with your AWS region
  credentials: {
    accessKeyId: '',  // Replace with your AWS Access Key
    secretAccessKey: '',  // Replace with your AWS Secret Key
  },
});

// Configure multerS3 with S3 client
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'chandra-image',  // Replace with your S3 bucket name

    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `products/${Date.now().toString()}-${file.originalname}`);
    },
  }),
}).array('images', 10);

const createProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ success: false, error: err.message });
    }

    try {
      console.log('Request Body:', req.body);
      const productData = JSON.parse(req.body.productData);

      // Add image URLs to product data
      const imageLinks = req.files.map((file) => file.location);  // Use file.location provided by multerS3

      // Log the AWS image URLs
      console.log('AWS Image URLs:', imageLinks);

      productData.images = imageLinks;

      // Save to MongoDB
      const product = await Product.create(productData);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  });
};








// const createProduct = async (req, res) => {
//   try {
//     console.log("ssssssssssa",req);
//     const product = await Product.create(req.body);
//     res.status(201).json({ success: true, data: product });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const stocks =async (req, res) => {
  try {
    console.log('wedoooo');
    const { productId, stockCount } = req.body;

    if (!productId || stockCount < 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { stockCount },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Stock updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ message: "Server error" });
  }
};











module.exports = { createProduct, getProducts ,stocks};
