
// import React, { useContext } from "react";
// import { ProductContext } from "../../context/ProductContext";
// import "./AvailableStock.css";  // Import the CSS file

// function AvailableStock() {
//   const { products, loading, error } = useContext(ProductContext);

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="available-stock-container">
//       <h2 className="available-stock-title">Available Stocks</h2>
//       <div className="table-container">
//         <table className="available-stock-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Current Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <tr key={product._id}>
//                   <td>{product.name}</td>
//                   <td>{product.description || "N/A"}</td>
//                   <td>{product.category.join(", ")}</td>
//                   <td>${product.price}</td>
//                   <td>{product.stockCount}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No products available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AvailableStock;
import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import "./AvailableStock.css";  // Import the CSS file

function AvailableStock() {
  const { products, loading, error } = useContext(ProductContext);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="available-stock-container">
      <h2 className="available-stock-title">Available Stocks</h2>
      <div className="table-container">
        <table className="available-stock-table">
          <thead>
            <tr>
              <th>Image</th> {/* New header for Image */}
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Current Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]} // Display the first image
                        alt={product.name}
                        className="product-image"
                      />
                    ) : (
                      <img
                        src="default-image.jpg" // Default image if no image is available
                        alt="No image available"
                        className="product-image"
                      />
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description || "N/A"}</td>
                  <td>{product.category.join(", ")}</td>
                  <td>${product.price}</td>
                  <td>{product.stockCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AvailableStock;
