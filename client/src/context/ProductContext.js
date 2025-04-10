import React, { createContext, useState, useEffect } from "react";
import { fetchProducts } from "../service/ApiAdmin";

// Create Product Context
export const ProductContext = createContext();

// ProductProvider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products using service API
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data.success) {
          setProducts(data.data); // Assuming API response has a 'data' key
          setFilteredProducts(data.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products,filteredProducts, setFilteredProducts, setProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};















// import React, { createContext, useState, useEffect } from "react";

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products from API
//     fetch("/api/products")
//       .then((response) => response.json())
//       .then((data) => setProducts(data));
//   }, []);

//   return (
//     <ProductContext.Provider value={{ products, setProducts }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

