// // ZipingForm.js
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function ZipingForm() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Retrieve the cart details from state
//   const { cartItems } = location.state || {};

//   // State for shipping form
//   const [fullName, setFullName] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [postalCode, setPostalCode] = useState('');
//   const [country, setCountry] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Navigate to the payment page with cart and shipping details
//     navigate('/payment', { state: { fullName, address, city, postalCode, country, cartItems } });
    
//   };

//   return (
//     <div>
//       <h1>Order Summary</h1>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.id}>
//             <p>Product: {item.name}</p>
//             <p>Description: {item.description}</p>
//             <p>Price: ${item.price}</p>
//             <p>Color: {item.color}</p>
//             <p>Size: {item.size}</p>
//             <p>Quantity: {item.quantity}</p>
//             <img src={item.image} alt={item.name} style={{ maxWidth: '100px' }} />
//           </li>
//         ))}
//       </ul>
//       <h2>Shipping Details</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Full Name:
//           <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
//         </label>
//         <label>
//           Address:
//           <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
//         </label>
//         <label>
//           City:
//           <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
//         </label>
//         <label>
//           Postal Code:
//           <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
//         </label>
//         <label>
//           Country:
//           <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
//         </label>
//         <button type="submit">Proceed to Payment</button>
//       </form>
//     </div>
//   );
// }

// export default ZipingForm;
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import'./css/zip.css';

function ZipingForm() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the cart details from state
  const { cartItems } = location.state || {};

  // State for shipping form
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the payment page with cart and shipping details
    navigate('/payment', { state: { fullName, address, city, postalCode, country, cartItems } });
  };

  return (<><NavBar />

    <div className="shipping-container">
    
    <h1>Order Summary</h1>
    <ul>
      {cartItems?.map((item) => (
        <li key={item.id}>
          <p>Product: {item.name}</p>
          <p>Description: {item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Color: {item.color}</p>
          <p>Size: {item.size}</p>
          <p>Quantity: {item.quantity}</p>
          <img src={item.image} alt={item.name} />
        </li>
      ))}
    </ul>
    <h2>Shipping Details</h2>
    <form className="shipping-form" onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </label>
      <label>
        Postal Code:
        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      </label>
      <label>
        Country:
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </label>
      <button type="submit">Proceed to Payment</button>
    </form>
  </div></>
  );
}

export default ZipingForm;
