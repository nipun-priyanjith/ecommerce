import React, { useState, useContext } from 'react';
import { AdminAuthContext } from '../../context/AdminAuthContext';
import { adminLogin } from '../../service/ApiAdmin';  // Import the adminLogin function
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import './AdminLogin.css';

function Aloging() {
  const { adminLogin: contextAdminLogin } = useContext(AdminAuthContext); // Access adminLogin from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state to trigger navigation

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { adminData, token } = await adminLogin(email, password); // Call the API function
      contextAdminLogin(adminData, token); // Store the admin data and token in context
      toast.success('Login successful!');  // Success toast
      setIsLoggedIn(true);  // Set the state to trigger navigation
      navigate("/adm"); 
    } catch (err) {
      setError(err.message);  // Display error if login fails
      toast.error('Login failed. Please check your credentials.');  // Error toast
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="form-title">Admin Login</h2>

        {error && <p className="error-message">{error}</p>} {/* Display error */}

        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </label>

        <label className="form-label">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </label>

        <button type="submit" className="form-button">Login</button>
      </form>

      {/* ToastContainer to display the toast notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default Aloging;

















// import React, { useState, useContext, useEffect } from 'react';
// import { AdminAuthContext } from '../../context/AdminAuthContext';
// import { adminLogin } from '../../service/ApiAdmin';  // Import the adminLogin function
// import { useNavigate } from "react-router-dom";
// import './AdminLogin.css';


// function Aloging() {
//   const { adminLogin: contextAdminLogin } = useContext(AdminAuthContext); // Access adminLogin from context
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state to trigger navigation

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const { adminData, token } = await adminLogin(email, password); // Call the API function
//       contextAdminLogin(adminData, token); // Store the admin data and token in context
//       alert('Login successful!');  // Notify success
//       setIsLoggedIn(true);  // Set the state to trigger navigation
//       navigate("/adm"); 
//     } catch (err) {
//       setError(err.message);  // Display error if login fails
//     }
//   };


//   return (
//     <form onSubmit={handleLogin} className="login-form">
//       <h2 className="form-title">Admin Login</h2>

//       {error && <p className="error-message">{error}</p>} {/* Display error */}

//       <label className="form-label">
//         Email:
//         <input
//           type="email"
//           name="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="form-input"
//         />
//       </label>

//       <label className="form-label">
//         Password:
//         <input
//           type="password"
//           name="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="form-input"
//         />
//       </label>

//       <button type="submit" className="form-button">Login</button>
//     </form>
//   );
// }

// export default Aloging;
