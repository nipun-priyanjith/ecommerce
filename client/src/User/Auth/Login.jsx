import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../service/ApiUser";
import { AuthContext } from "../../context/AuthContext";
import "../../Admin/Auth/Aloging.css";

function Login() {
  const { login } = useContext(AuthContext); // Access user state from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await loginUser(email, password); // Authenticate user
      login(user, token); // Store user and token in context
      setError(""); // Clear any previous errors
      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate("/usr"), 3000); // Delay navigation for notification
    } catch (err) {
      setError("Invalid email or password."); // Set error message
      toast.error("Invalid email or password.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Welcome Back!</h2>
        {error && <p className="error-message">{error}</p>}
        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            placeholder="Enter your email"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Enter your password"
          />
        </label>
        <button type="submit" className="form-button">Login</button>
        <p className="form-footer">
          Don't have an account?{" "}
          <Link to="/SignUp" className="register-link">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;






// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../../service/ApiUser";
// import { AuthContext } from "../../context/AuthContext";
// import "../../Admin/Auth/Aloging.css";

// function Login() {
//   const { login } = useContext(AuthContext); // Access user state from AuthContext
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { user, token } = await loginUser(email, password); // Authenticate user
//       login(user, token); // Store user and token in context
//       setError(""); // Clear any previous errors
//       alert("Login successful");
//       navigate("/usr");
//     } catch (err) {
//       setError("Invalid email or password."); // Display error message
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2 className="form-title">Welcome Back!</h2>
//         {error && <p className="error-message">{error}</p>}
//         <label className="form-label">
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="form-input"
//             placeholder="Enter your email"
//           />
//         </label>
//         <label className="form-label">
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="form-input"
//             placeholder="Enter your password"
//           />
//         </label>
//         <button type="submit" className="form-button">Login</button>
//         <p className="form-footer">
//           Don't have an account?{" "}
//           <Link to="/SignUp" className="register-link">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;
