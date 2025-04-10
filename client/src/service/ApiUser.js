const API_BASE_URL = "http://192.168.88.134:31500/api"; // Adjust if backend URL differs


export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }

    // Return the response with token and user data
    const data = await response.json();
    return data; // { token, user }
  } catch (error) {
    throw new Error(error.message || "Error registering user");
  }
};




// service/ApiUser.js



// Function to fetch all users
export const fetchUsers = async () => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/users/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    console.log(data);
    return data; // Return the user data
  } catch (error) {
    throw error; // Throw the error to be caught in the component
  }
};

// service/ApiUser.js

const API_URL = "http://192.168.88.134:31500/api/users";

// Function to authenticate user and retrieve JWT
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json(); // Data includes token and user info
    return data; // Return the token and user data
  } catch (error) {
    throw error; // Propagate error to be handled in the component
  }
};

const API_ORDER_URL = "http://192.168.88.134:31500/api/order";

export const sendOrder = async (orderData) => {
    console.log("llllll",orderData)
  try {
    const response = await fetch(API_ORDER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderData }),
    });

    if (!response.ok) {
      throw new Error('Failed to send order. Please try again.');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error sending order: ' + error.message);
  }
};



export const getUserOrders = async (userId) => {
  try {
    const response = await fetch(`http://192.168.88.134:31500/api/order/user/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders.');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching orders: ' + error.message);
  }
};


export const getUserData = async (token) => {
  try {
    const response = await fetch(`http://192.168.88.134:31500/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getUserData:", error);
    throw error;
  }
};


export const updateUserSearchHistory = async (userId, searchTerm, relatedProductsIds) => {
  try {
    const response = await fetch('http://192.168.88.134:31500/api/users/update-search-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        search_term: searchTerm,
        related_products_ids: relatedProductsIds,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.error('Error updating search history:', error);
    throw error;
  }
};
