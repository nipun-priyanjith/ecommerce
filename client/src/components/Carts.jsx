import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import NavBar from './NavBar';
import'./css/cart.css';
import CartEmpty from './CartEmpty';
import Bottom from './Buttom';
function Carts() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, userId } = useContext(CartContext);
  const navigate = useNavigate();
  console.log("jjjjjjjjj",cartItems);
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.price && !isNaN(item.price) ? item.price : 0;
      return acc + price * item.quantity;
    }, 0).toFixed(2);
  };

  const handleOrder = () => {
    navigate('/shipping', { state: { cartItems, userId } });
  };

  if (!cartItems || cartItems.length === 0) {
    return (<>
      
        
        <CartEmpty/>
        <Bottom/></>
    );
  }

  return (<><NavBar /> 
    <div className="cart-container">
      
      {cartItems && cartItems.length > 0 ? (
        <>
          <h1>Your Cart (User ID: {userId._id})</h1>
          <ul className="cart-list">
          {cartItems.map((item, index) => (
  <li key={item.id || `${item.name}-${index}`} className="cart-item">
    <img src={item.image} alt={item.name} />
    <p>Product: {item.name}</p>
    <p>Price: ${item.price && !isNaN(item.price) ? item.price.toFixed(2) : "N/A"}</p>
    <p>Color: {item.color || "Not Selected"}</p>
    <p>Size: {item.size || "Not Selected"}</p>
    <p>
      Quantity: 
      <input
        type="number"
        value={item.quantity}
        min="1"
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
      />
    </p>
    <button onClick={() => removeFromCart(item.id)}>Remove</button>
  </li>
))}

          </ul>
          <h3 className="cart-total">Total: ${calculateTotal()}</h3>
          <div className="cart-actions">
            <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
            <button onClick={handleOrder}>Order</button>
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart!</p>
        </div>
      )}
    </div><Bottom/></>
  );
}

export default Carts;


