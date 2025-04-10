
import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import NewNavBar from "../../components/NewNavBar";
import "../../components/css/h.css";
import Loading from "../../components/Loading";
import Bottom from "../../components/Buttom";
import Chatbot from "../../catbot/Chatbot"; // Import the Chatbot
import { FaRobot } from "react-icons/fa"; // React Icons for chatbot

function NewHome() {
  const { products, loading, error } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showChatbot, setShowChatbot] = useState(false); // Chatbot toggle state

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const categories = ["All", ...new Set(products.map((product) => product.category).flat())];
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category.includes(selectedCategory)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <NewNavBar />
      <div className="home-container">
        {/* Chatbot Icon */}
        <div className="chatbot-icon" onClick={() => setShowChatbot(!showChatbot)}>
          <FaRobot size={60} color="#ff3131" />
        </div>

        {showChatbot && <Chatbot />} {/* Show chatbot when icon is clicked */}

        {/* Filters */}
        <div className="filters">
          <label>Category: </label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label>Price: </label>
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <span>${priceRange[0]} - ${priceRange[1]}</span>
        </div>

        <h1 className="home-heading">Our Products</h1>
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-img-container">
                <img src={product.images[0]} alt={product.name} className="product-img" />
              </div>
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-category">Category: {product.category.join(", ")}</p>
                <div className="product-price-rating">
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-rating">
                    {product.rating} <span className="star-rating">★</span>
                  </p>
                </div>
                <Link to={`/product/${product._id}`} className="view-more-btn">
                  <button>View More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Bottom />
    </>
  );
}

export default NewHome;

























// import React, { useContext, useState } from 'react';
// import { ProductContext } from '../../context/ProductContext';
// import { Link } from 'react-router-dom';
// import NewNavBar from '../../components/NewNavBar';
// import '../../components/css/h.css';
// import Loading from '../../components/Loading';
// import Bottom from '../../components/Buttom';

// function NewHome() {
//   const { products, loading, error } = useContext(ProductContext);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [priceRange, setPriceRange] = useState([0, 100000]);

//   if (loading) return <Loading/>;
//   if (error) return <div>Error: {error}<Loading/></div>;

//   // Extract unique categories
//   const categories = ['All', ...new Set(products.map(product => product.category).flat())];

//   // Filter products based on selected category and price range
//   const filteredProducts = products.filter(product => 
//     (selectedCategory === 'All' || product.category.includes(selectedCategory)) &&
//     product.price >= priceRange[0] && product.price <= priceRange[1]
//   );

//   // Sort products by rating (high to low)
//   const sortedProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);

//   return (
//     <>
//       <NewNavBar />
//       <div className="home-container">
        
        
//         {/* Filters */}
//         <div className="filters">
//           <label>Category: </label>
//           <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
          
//           <label>Price: </label>
//           <input 
//             type="range" 
//             min="0" max="100000" 
//             value={priceRange[1]} 
//             onChange={(e) => setPriceRange([0, Number(e.target.value)])}
//           />
//           <span>${priceRange[0]} - ${priceRange[1]}</span>
//         </div>
        
//         <h1 className="home-heading">Our Products</h1>
//         <div className="product-grid">
//           {sortedProducts.map((product) => (
//             <div key={product._id} className="product-card">
//               <div className="product-img-container">
//                 <img src={product.images[0]} alt={product.name} className="product-img" />
//               </div>
//               <div className="product-info">
//                 <h2 className="product-name">{product.name}</h2>
//                 <p className="product-category">Category: {product.category.join(', ')}</p>
//                 <div className="product-price-rating">
//                   <p className="product-price">${product.price.toFixed(2)}</p>
//                   <p className="product-rating">{product.rating} <span className="star-rating">★</span></p>
//                 </div>
//                 <Link to={`/product/${product._id}`} className="view-more-btn">
//                   <button>View More</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Bottom />
//     </>
//   );
// }

// export default NewHome;
