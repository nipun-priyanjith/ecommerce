import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import "./ManageStock.css";

function ManageStock() {
  const { products, fetchProducts } = useContext(ProductContext);
  const [increaseValues, setIncreaseValues] = useState({});

  // Filter products with stockCount less than 5 or stockCount equals to 0
  const lowStockProducts = products.filter(
    (product) => product.stockCount < 5000 || product.stockCount === 0
  );

  // Handle input changes for increasing stock
  const handleInputChange = (productId, value) => {
    setIncreaseValues({
      ...increaseValues,
      [productId]: value,
    });
  };

  // Handle the apply button click
  const handleApply = async (product) => {
    const increaseValue = parseInt(increaseValues[product._id], 10);
    if (isNaN(increaseValue) || increaseValue <= 0) {
      alert("Please enter a valid positive number for increase.");
      return;
    }

    const newStockCount = product.stockCount + increaseValue;

    try {
      const response = await fetch("http://localhost:5000/api/products/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          stockCount: newStockCount,
        }),
      });

      if (response.ok) {
        alert(`Stock updated successfully for ${product.name}`);
        fetchProducts(); // Refresh product list
      } else {
        alert("Failed to update stock.");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div className="manage-stock-container">
      <h2 className="manage-stock-title">Manage Stock</h2>
      <div className="table-container">
        <table className="manage-stock-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Current Quantity</th>
              <th>Increase Quantity</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="product-image"
                      />
                    ) : (
                      <span>No image available</span>
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description || "N/A"}</td>
                  <td>{product.category.join(", ")}</td>
                  <td>${product.price}</td>
                  <td>{product.stockCount}</td>
                  <td>
                    <input
                      type="number"
                      value={increaseValues[product._id] || ""}
                      onChange={(e) =>
                        handleInputChange(product._id, e.target.value)
                      }
                      min="1"
                      placeholder="Increase by"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleApply(product)}
                      className="apply-button"
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No products with low or empty stock</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageStock;


// import React, { useContext, useState } from "react";
// import { ProductContext } from "../../context/ProductContext";
// import "./ManageStock.css";

// function ManageStock() {
//   const { products } = useContext(ProductContext);
//   const [increaseValues, setIncreaseValues] = useState({});

//   // Filter products with stockCount less than 5 or stockCount equals to 0
//   const lowStockProducts = products.filter(
//     (product) => product.stockCount < 5000 || product.stockCount === 0
//   );

//   // Handle input changes for increasing stock
//   const handleInputChange = (productId, value) => {
//     setIncreaseValues({
//       ...increaseValues,
//       [productId]: value,
//     });
//   };

//   // Handle the apply button click
//   const handleApply = (product) => {
//     const increaseValue = parseInt(increaseValues[product._id], 10);
//     if (isNaN(increaseValue) || increaseValue <= 0) {
//       alert("Please enter a valid positive number for increase.");
//       return;
//     }

//     const newStockCount = product.stockCount + increaseValue;
//     console.log({
//       productDetails: product,
//       increase: increaseValue,
//       newStockCount: newStockCount,
//     });
//   };

//   return (
//     <div className="manage-stock-container">
//       <h2 className="manage-stock-title">Manage Stock</h2>
//       <div className="table-container">
//         <table className="manage-stock-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Current Quantity</th>
//               <th>Increase Quantity</th>
//               <th>Apply</th>
//             </tr>
//           </thead>
//           <tbody>
//             {lowStockProducts.length > 0 ? (
//               lowStockProducts.map((product) => (
//                 <tr key={product._id}>
//                   <td>
//                     {product.images.length > 0 ? (
//                       <img
//                         src={product.images[0]} // Display the first image from the array
//                         alt={product.name}
//                         className="product-image"
//                       />
//                     ) : (
//                       <span>No image available</span>
//                     )}
//                   </td>
//                   <td>{product.name}</td>
//                   <td>{product.description || "N/A"}</td>
//                   <td>{product.category.join(", ")}</td>
//                   <td>${product.price}</td>
//                   <td>{product.stockCount}</td>
//                   <td>
//                     <input
//                       type="number"
//                       value={increaseValues[product._id] || ""}
//                       onChange={(e) =>
//                         handleInputChange(product._id, e.target.value)
//                       }
//                       min="1"
//                       placeholder="Increase by"
//                     />
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => handleApply(product)}
//                       className="apply-button"
//                     >
//                       Apply
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8">No products with low or empty stock</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ManageStock;
