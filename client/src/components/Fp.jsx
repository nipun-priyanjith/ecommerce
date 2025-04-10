

import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SerchBar from './SerchBar';
import './css/h.css';
import Loading from './Loading';

function NewHome() {
  const { products, filteredProducts, loading, error } = useContext(ProductContext);

  if (loading) return <Loading/>;
  if (error) return <div>Error: {error}</div>;
  //console.log(products);

  return (
    <div className="home-container">
      <NavBar />
      <SerchBar />
      <h1 className="home-heading"></h1>
      
      <div className="all-products">
        
        <div className="product-grid">
        
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-img-container">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-img"
                />
              </div>
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-category">
                  Category: {product.category.join(", ")}
                </p>
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
          ))
        ) : (
          <p>No filtered products found</p>
        )}
      </div></div>

      <div className="all-products">
        <br/>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-img-container">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-img"
                />
              </div>
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-category">
                  Category: {product.category.join(", ")}
                </p>
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
    </div>
  );
}

export default NewHome;









// import React, { useContext } from 'react';
// import { ProductContext } from '../context/ProductContext';
// import { Link } from 'react-router-dom';
// import NavBar from './NavBar';
// import SerchBar from './SerchBar';
// import './css/h.css';

// function NewHome() {
//   const { products, filteredProducts, loading, error } = useContext(ProductContext);

//   if (loading) return <div>Loading products...</div>;
//   if (error) return <div>Error: {error}</div>;
//   console.log(products);

//   return (
//     <div className="home-container">
//       <NavBar />
//       <SerchBar />
//       <h1 className="home-heading">Recommended Products</h1>
      
//       <div className="filtered-products">
//         <h2>Filtered Products</h2>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div key={product._id} className="product-card">
//               <div className="product-img-container">
//                 <img
//                   src={product.images[0]}
//                   alt={product.name}
//                   className="product-img"
//                 />
//               </div>
//               <div className="product-info">
//                 <h2 className="product-name">{product.name}</h2>
//                 <p className="product-category">
//                   Category: {product.category.join(", ")}
//                 </p>
//                 <div className="product-price-rating">
//                   <p className="product-price">${product.price.toFixed(2)}</p>
//                   <p className="product-rating">
//                     {product.rating} <span className="star-rating">★</span>
//                   </p>
//                 </div>
//                 <Link to={`/product/${product._id}`} className="view-more-btn">
//                   <button>View More</button>
//                 </Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No filtered products found</p>
//         )}
//       </div>

//       <div className="all-products">
//         <h2>All Products</h2>
//         <div className="product-grid">
//           {products.map((product) => (
//             <div key={product._id} className="product-card">
//               <div className="product-img-container">
//                 <img
//                   src={product.images[0]}
//                   alt={product.name}
//                   className="product-img"
//                 />
//               </div>
//               <div className="product-info">
//                 <h2 className="product-name">{product.name}</h2>
//                 <p className="product-category">
//                   Category: {product.category.join(", ")}
//                 </p>
//                 <div className="product-price-rating">
//                   <p className="product-price">${product.price.toFixed(2)}</p>
//                   <p className="product-rating">
//                     {product.rating} <span className="star-rating">★</span>
//                   </p>
//                 </div>
//                 <Link to={`/product/${product._id}`} className="view-more-btn">
//                   <button>View More</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewHome;







