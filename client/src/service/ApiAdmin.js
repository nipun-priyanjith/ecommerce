// src/service/ApiAdmin.js
const API_URL = 'http://192.168.88.134:31500/api/products'; // Update this URL with your actual API endpoint



export const createProduct = async (formData) => {
  console.log([...formData.entries()]);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};



export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const API_BASE_URL = "http://192.168.88.134:31500/api/admin";

export const registerAdmin = async (adminData) => {
  try {
    console.log("dddddd",adminData);
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register admin");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering admin:", error.message);
    throw error;
  }
};




const apiUrl = "http://192.168.88.134:31500/api/admin";  // The base URL for your admin API endpoints

// Function to handle admin login
export const adminLogin = async (email, password) => {
  try {
    // Making a POST request to the backend to authenticate the admin
    console.log("VVVV",email);
    console.log("VVVV",password);
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),  // Sending email and password in the request body
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed!"); // Handle errors from the server
    }

    const data = await response.json();
    return data;  // Return the data (admin info and token)
  } catch (error) {
    console.error("Admin login error: ", error);
    throw error;  // Rethrow error to be handled by the component
  }
};


export const fetchAllOrders = async (token) => {
  try {
    const response = await fetch("http://192.168.88.134:31500/api/admin/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};



export const fetchOrderStats = async () => {
  try {
    const response = await fetch(`http://192.168.88.134:31500/api/admin/order-stats`);
    if (!response.ok) throw new Error("Failed to fetch order stats");
    
    const data = await response.json(); // Parse the JSON once
    console.log(data); // Log the parsed data
    return data; // Return the parsed data
    
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
};

export const fetchMonthlySales = async () => {
  try {
    const response = await fetch(`http://192.168.88.134:31500/api/admin/monthly-sales`);
    if (!response.ok) throw new Error("Failed to fetch monthly sales data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching monthly sales data:", error);
    return null;
  }
};


export const updateOrderStatus = async (token, orderId, status) => {
  console.log("IIIIDDDD", orderId);
  console.log("IIIIDDDD", status);

  const response = await fetch(`http://192.168.88.134:31500/api/admin/order-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId, status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update order status");
  }

  return await response.json();
};


