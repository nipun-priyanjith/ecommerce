



import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { sendOrder } from "../service/ApiUser"; // Import sendOrder function
import "./css/py.css";

// Load Stripe with your test API key
const stripePromise = loadStripe("pk_test_51OIPw6GpWvF56qfDZapmZrZO5SdOJgtvST019vGPYj5zbt5KP0f4Eh6RYWoejE7YVieMOo6RIlbGnjpEQCKpE8lB00KuQAFBqy");

function PaymentForm({ orderDetails }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      alert(error.message);
      return;
    }

    const updatedOrderDetails = {
      ...orderDetails,
      paymentDetails: {
        ...orderDetails.paymentDetails,
        methodId: paymentMethod.id,
        date: new Date(),
      },
    };

    try {
      const response = await sendOrder(updatedOrderDetails);
      alert("Payment successful! Order placed.");
      window.location.href = "http://localhost:3000/myorder";
    } catch (err) {
      console.error("Error sending order:", err);
      alert("Order submission failed: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      
      <div className="payment-details">
        <h3>Secure Payment</h3>
        <div className="secure-badge">
          <svg xmlns="https://media.istockphoto.com/id/1419640719/vector/blue-color-powerful-100-money-back-guarantee-badge-with-hand-and-return-arrow-isolated-on.jpg?s=170667a&w=0&k=20&c=EEdnweVns45AeWfK3sx4KvFvMPMcUZlV-N1WavZ4f6E=" width="16" height="16" fill="currentColor" className="bi bi-shield-check" viewBox="0 0 16 16">
            <path d="M5.854 8.146a.5.5 0 0 1 .639-.057l.07.058 2 2a.5.5 0 0 1-.638.765l-.07-.058L6.5 9.207l-.646.647a.5.5 0 0 1-.765-.638l.058-.07 1-1z"></path>
            <path d="M8 0c-.69 0-1.521.176-2.387.512A9.09 9.09 0 0 0 2.18 1.741c-.778.618-1.498 1.522-2.072 2.731A12.023 12.023 0 0 0 0 8c0 4.42 2.835 8.077 7.604 8.93.246.045.5.07.749.07.249 0 .504-.025.749-.07C13.165 16.077 16 12.42 16 8c0-1.747-.538-3.224-1.605-4.528-.574-1.21-1.294-2.113-2.072-2.731A9.09 9.09 0 0 0 10.387.512 7.89 7.89 0 0 0 8 0z"></path>
          </svg>
          Secure Checkout
        </div>
        <div className="card-icons">
          <img src="https://static.vecteezy.com/system/resources/previews/020/975/572/original/visa-logo-visa-icon-transparent-free-png.png" alt="Visa" />
          <img src="https://th.bing.com/th/id/R.712a8255113f10fed9712c7ef48bfcc4?rik=oRrsR%2f4rOMYTeA&riu=http%3a%2f%2flogok.org%2fwp-content%2fuploads%2f2014%2f03%2fMasterCard-Logo.png&ehk=Bi6%2bChyZT%2fCZ%2fRHqL7mnHvWOkwpNA9rogqbZM%2ftYhh8%3d&risl=&pid=ImgRaw&r=0" alt="MasterCard" />
          <img src="https://th.bing.com/th/id/OIP.aejxZDH8dT3Q7pQ8GBLV_AHaHa?rs=1&pid=ImgDetMain" alt="Amex" />
          <img src="https://th.bing.com/th/id/R.c01292cdd7f51d3520c75031fc479c2b?rik=0qZxmR9AXGhBdw&pid=ImgRaw&r=0" alt="PayPal" />
        </div>
      
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button></div>
    </form>
  );
}

function Pyment() {
  const location = useLocation();
  const { fullName, address, city, postalCode, country, cartItems } = location.state || {};

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const orderDetails = {
    shippingDetails: { fullName, address, city, postalCode, country },
    cartItems: cartItems?.map((item) => ({
      pid: item.productId || item.pid, // Ensure product ID is mapped correctly
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      image: item.image,
    })),
    userId: JSON.parse(localStorage.getItem("user"))?._id,
    paymentDetails: {
      totalPrice,
      cardNumber: "4242 4242 4242 4242", // Placeholder for now
      cvv: "567", // Placeholder for now
      expiryDate: "12/34", // Placeholder for now
      month: "12", // Placeholder for now
      year: "2036", // Placeholder for now
    },
  };

  return (
    <div className="payment-container">
      <h2>Review Your Order</h2>
      <ul>
        {cartItems?.map((item) => (
          <li key={item.productId || item.pid}>
            <p>Product ID: {item.productId || item.pid}</p>
            <p>Product: {item.name}</p>
            <p>Color: {item.color}</p>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price * item.quantity}</p>
          </li>
        ))}
      </ul>
      <div className="shipping-details">
        <h3>Shipping Details</h3>
        <p>{fullName}</p>
        <p>{address}</p>
        <p>{city}, {postalCode}</p>
        <p>{country}</p>
      </div>
      <Elements stripe={stripePromise}>
        <PaymentForm orderDetails={orderDetails} />
      </Elements>
    </div>
  );
}

export default Pyment;
















