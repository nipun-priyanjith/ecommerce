import React, { useState, useContext } from 'react';
import './css/SearchBar.css'; // Ensure this CSS file is imported
import { ProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { updateUserSearchHistory } from '../service/ApiUser'; 
import { AuthContext } from '../context/AuthContext';

function SearchBar() {
  const { user } = useContext(AuthContext);
  const userId = user;
  const [searchTerm, setSearchTerm] = useState('');
  const { products, setFilteredProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      setFilteredProducts(filteredProducts);

      // Extract product IDs from filtered products
      const relatedProductsIds = filteredProducts.map((product) => product._id);
      console.log("iddd",userId, "serchhh",searchTerm,"ppp",relatedProductsIds);
      // Update search history
      try {
        await updateUserSearchHistory(userId, searchTerm, relatedProductsIds);
        console.log('Search history updated');
      } catch (error) {
        console.error('Failed to update search history');
      }
    }

    navigate('/fp');
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
