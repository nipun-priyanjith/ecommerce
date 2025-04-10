import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { AdminAuthProvider } from './context/AdminAuthContext'; // Import AdminAuthProvider
import { ProductProvider } from './context/ProductContext'; // Import ProductProvider
import { CartProvider } from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <AuthProvider> {/* Wrap App with AuthProvider */}
      <AdminAuthProvider> {/* Wrap App with AdminAuthProvider */}
        <ProductProvider> {/* Wrap App with ProductProvider */}
          <CartProvider>
    <App /></CartProvider>
    </ProductProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
