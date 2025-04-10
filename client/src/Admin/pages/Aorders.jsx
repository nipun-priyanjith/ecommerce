
// import React, { useState, useEffect } from "react";
// import { fetchAllOrders,updateOrderStatus  } from "../../service/ApiAdmin";
// import ANavBar from "../../components/ANavBar";
// import'../../components/css/aor.css';
// import Loading from "../../components/Loading";
// function Aorders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//    // const user = localStorage.getItem('user');
    
//     if (!token) {
//       setError("Unauthorized: Please log in");
//       setLoading(false);
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const data = await fetchAllOrders(token);
//         setOrders(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     const token = localStorage.getItem("adminToken");
//     console.log("ssss",token,"iddd",orderId,"sss",newStatus);
//     try {
//       await updateOrderStatus(token, orderId, newStatus);
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (err) {
//       alert("Failed to update order status");
//     }
//   };
//   if (loading) return <Loading/>;
//   if (error) return <div>Error: {error}</div>;

//   return (<><ANavBar />
//     <div className="admin-orders">
      
//       <h1 className="page-title">All Orders</h1>
//       <ul className="orders-list">
//         {orders.map((order) => (
//           <li key={order._id} className="order-card">
//             <p><strong>Order ID:</strong> {order._id}</p>
//             <p><strong>User:</strong> {order.user?.username} ({order.user?.email})</p>
//             <p><strong>Shipping Address:</strong> {order.shippingDetails.address}</p>
//             <p><strong>City:</strong> {order.shippingDetails.city}</p>
//             <p><strong>Total Items:</strong> {order.cartItems.length}</p>
//             <ul className="cart-items-list">
//               {order.cartItems.map((item, index) => (
//                 <li key={index} className="cart-item">
//                   <img src={item.image} alt={item.name} className="item-image" />
//                   <div className="item-details">
//                     <p><strong>Product ID:</strong> {item._id}</p>
//                     <p><strong>Product Name:</strong> {item.name}</p>
//                     <p><strong>Price:</strong> ${item.price}</p>
//                     <p><strong>Quantity:</strong> {item.quantity}</p>
//                     <p><strong>Size:</strong> {item.size}</p>
//                     <p><strong>Color:</strong> {item.color}</p>
//                   </div>
//                   <p><strong>Status:</strong> {order.status || "Pending"}</p>
//             <div className="status-buttons">
//               <button onClick={() => handleStatusUpdate(order._id, "Process")}>Process</button>
//               <button onClick={() => handleStatusUpdate(order._id, "Zipped")}>Zipped</button>
//               <button onClick={() => handleStatusUpdate(order._id, "Delivered")}>Delivered</button>
//             </div>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div></>
//   );
// }

// export default Aorders;




import React, { useState, useEffect } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../service/ApiAdmin";
import ANavBar from "../../components/ANavBar";
import '../../components/css/aor.css';
import Loading from "../../components/Loading";

function Aorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("Unauthorized: Please log in");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await fetchAllOrders(token);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    const token = localStorage.getItem("adminToken");
    try {
      await updateOrderStatus(token, orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ANavBar />
      <div className="admin-orders">
        <h1 className="page-title">Orders</h1>
        <ul className="orders-list">
          {orders
            .filter((order) => order.status !== "Delivered") // Filter out delivered orders
            .map((order) => (
              <li key={order._id} className="order-card">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>User:</strong> {order.user?.username} ({order.user?.email})</p>
                <p><strong>Shipping Address:</strong> {order.shippingDetails.address}</p>
                <p><strong>City:</strong> {order.shippingDetails.city}</p>
                <p><strong>Total Items:</strong> {order.cartItems.length}</p>
                <ul className="cart-items-list">
                  {order.cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <p><strong>Product ID:</strong> {item._id}</p>
                        <p><strong>Product Name:</strong> {item.name}</p>
                        <p><strong>Price:</strong> ${item.price}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Size:</strong> {item.size}</p>
                        <p><strong>Color:</strong> {item.color}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p><strong>Status:</strong> {order.status || "Pending"}</p>
                <div className="status-buttons">
                  <button onClick={() => handleStatusUpdate(order._id, "Process")}>Process</button>
                  <button onClick={() => handleStatusUpdate(order._id, "Zipped")}>Zipped</button>
                  <button onClick={() => handleStatusUpdate(order._id, "Delivered")}>Delivered</button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Aorders;
