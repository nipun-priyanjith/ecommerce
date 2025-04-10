

const express = require('express');
const { createUser,getAllUsers, loginUser ,getUserData,updateSearchHistory ,submitRating,getProductRatings} = require('../controllers/userController');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// User registration route
router.post('/register', createUser);
router.get('/all', getAllUsers);
router.post("/login", loginUser); // POST: Authenticate user
router.get("/me", protect, getUserData);
router.post('/update-search-history', updateSearchHistory);

router.post('/ratings', getProductRatings);
router.post('/submitRating', submitRating);
module.exports = router;





// const express = require('express');
// const { createUser} = require('../controllers/userController');
// const router = express.Router();

// router.post('/register', createUser);

// //router.post('/api/users/register',createUser ); // POST: Create a product
// //router.get('/', getProducts);    // GET: Retrieve all products

// module.exports = router;
