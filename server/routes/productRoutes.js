const express = require('express');
const { createProduct, getProducts ,stocks} = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct); // POST: Create a product
// router.post(
//   '/',
//   upload.array('images', 5), // Middleware for handling image uploads
//   createProduct // Your createProduct logic
// );
router.get('/', getProducts);    // GET: Retrieve all products
router.post('/stock', stocks);

module.exports = router;
