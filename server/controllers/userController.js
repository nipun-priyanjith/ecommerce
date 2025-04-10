
//const bcrypt = require("bcrypt");
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const Rating = require('../models/Rating');
const jwt = require("jsonwebtoken");
const UserSearch = require('../models/uSerch');

//const AWS = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

// const createUser=  async (req, res) => {
//   const { username, password, email, ...otherDetails } = req.body;

// try {
  
//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create user
//   const newUser = new User({
//     username,
//     password: hashedPassword,
//     email,
//     ...otherDetails,
//   });

//   await newUser.save();
  
//   res.status(201).json( {password,email} );
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ message: "Error registering user" });
// }
// };


// Configure AWS SDK

// Manually specify AWS credentials and region


// Initialize the S3 client.......

const createUser = async (req, res) => {
  try {
    const { username, password, email, imageBase64, ...otherDetails } = req.body;

    // Check if image is provided and is base64-encoded
    let imageUrl = null;
    if (imageBase64) {
      imageUrl = imageBase64;  // You can directly store the base64 string
      console.log("Base64 image received:", imageUrl);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document with the image stored as base64
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      profileImage: imageUrl, // Store base64 string in profileImage
      ...otherDetails,
    });

    // Save the user to the database
    await newUser.save();

    // Send response
    res.status(201).json({ message: 'User registered successfully', email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};



// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from MongoDB
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with user info and token
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user data based on token
const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateSearchHistory = async (req, res) => {
  const { user_id, search_term, related_products_ids } = req.body;

  try {
    let userSearch = await UserSearch.findOne({ user_id });

    if (userSearch) {
      // Update existing search history
      userSearch.search_keywords.push(search_term);
      userSearch.related_products_ids.push(...related_products_ids);
      userSearch.search_keywords = [...new Set(userSearch.search_keywords)]; // Remove duplicates
      userSearch.related_products_ids = [...new Set(userSearch.related_products_ids)]; // Remove duplicates
    } else {
      // Create new search history
      userSearch = new UserSearch({
        user_id,
        search_keywords: [search_term],
        related_products_ids,
      });
    }

    await userSearch.save();
    res.status(200).json({ message: 'Search history updated successfully', data: userSearch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const submitRating = async (req, res) => {
  try {
    const { userId, fullName, productIds, rating, message } = req.body;

    // Create a new rating entry
    console.log("awaaaaaaaaa");
    const newRating = new Rating({
      productIds,
      fullName,
      rating,
      message,
    });

    await newRating.save();
    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting rating' });
  }
};




const getProductRatings = async (req, res) => {
  try {
    console.log('Fetching ratings...');
    const { productId } = req.body;  // Get productId from request body
    console.log("Product ID:", productId);

    // Use $in operator to check inside array
    const ratings = await Rating.find({ productIds: { $in: [productId] } })
      .populate('fullName');

    console.log("Ratings:", ratings);
    res.json({ success: true, ratings });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ success: false, message: "Error fetching ratings", error: error.message });
  }
};







module.exports =  { createUser, getAllUsers,loginUser,getUserData,updateSearchHistory, submitRating,getProductRatings};