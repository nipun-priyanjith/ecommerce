import React from 'react';
import './css/CartEmpty.css'; // Add custom CSS for styling
import NavBar from './NavBar'; // Assuming NavBar is another component
//import emptyCartImage from './assets/empty-cart.png'; // Replace with the path to your image

function CartEmpty({ cartItems }) {
  if (!cartItems || cartItems.length === 0) {
    return (<>   <NavBar />
      <div className="cart-empty-container">
        
        <div className="empty-cart-message">
          <img 
            src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png" 
            alt="Empty Cart" 
            className="empty-cart-image" 
          />
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart!</p>
        </div>
      </div></>
    );
  }
  return null; // Return nothing if there are items in the cart
}

export default CartEmpty;
