
import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../service/ApiUser';
import { FaBox, FaShippingFast, FaCheckCircle } from 'react-icons/fa';
import './css/order.css';

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      fetchOrders(user._id);
    }
  }, [user]);

  const fetchOrders = async (userId) => {
    try {
      const response = await getUserOrders(userId);
      setOrders(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingClick = (orderId, items) => {
    setCurrentOrderId(orderId);
    setCartItems(items);
    setIsModalOpen(true);

    // Log the pid of each item in the cart
    items.forEach(item => {
      console.log('Product ID:', item.pid);
    });
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmitRating = async () => {
    const order = orders.find(order => order._id === currentOrderId);
    if (order) {
      const ratingData = {
        userId: user._id,
        fullName: order.shippingDetails.fullName,
        productIds: cartItems.map(item => item.pid),
        rating,
        message,
      };

      try {
        // Send the rating data to the backend
        const response = await fetch('http://localhost:5000/api/users/submitRating', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ratingData),
        });

        const result = await response.json();
        console.log('Rating submitted:', result);
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRating(0);
    setMessage('');
  };

  const getStatusStyle = (currentStatus, status) => {
    return currentStatus === status ? 'status-icon active' : 'status-icon';
  };

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order ID: {order._id}</h3>

          <p>Shipping Address: {order.shippingDetails.address}</p>

          <ul className="cart-item-list">
            {order.cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div>
                  {item.name} - {item.quantity} x <span>${item.price}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="order-status-icons">
            <span className={`status-icon ${getStatusStyle(order.status, 'Process')}`}>
              <FaBox />{order.status === 'Process' ? <p>Processing</p> : <></>}
            </span>
            <div className="status-line"></div>
            <span className={`status-icon ${getStatusStyle(order.status, 'Zipped')}`}>
              <FaShippingFast />
              {order.status === 'Zipped' ? <p>Zipped</p> : <></>}
            </span>
            <div className="status-line"></div>
            <span className={`status-icon ${getStatusStyle(order.status, 'Delivered')}`}>
              <FaCheckCircle />
              {order.status === 'Delivered' ? <p>Delivered</p> : <></>}
            </span>
          </div>

          {order.status === 'Delivered' && (
            <button
              onClick={() => handleRatingClick(order._id, order.cartItems)}
              className="rate-btn"
            >
              Rate Order
            </button>
          )}
        </div>
      ))}

      {isModalOpen && (
        <div className="rating-modal-overlay">
          <div className="rating-modal">
            <h3>Rate Your Order</h3>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`star ${rating >= value ? 'filled' : ''}`}
                  onClick={() => handleStarClick(value)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="rating-message"
              placeholder="Leave a message about your experience..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <div>
              <button onClick={handleSubmitRating} className="submit-btn">
                Submit
              </button>
              <button onClick={handleCloseModal} className="close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrder;
