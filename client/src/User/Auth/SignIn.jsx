
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { registerUser, loginUser } from "../../service/ApiUser";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"; // Import CSS file

function SignIn() {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    bio: "",
    favorite_categories: [""],
    age: "",
    gender: "",
    country: "",
    hobbies: [""],
    occupation: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
    imageBase64: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageBase64: reader.result.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);

      const response = await registerUser(formData);
      if (response) {
        console.log("User registered successfully.");

        const loginResponse = await loginUser(formData.email, formData.password);
        if (loginResponse) {
          console.log("Login successful:", loginResponse);
          alert("User registered and logged in successfully!");
          login(loginResponse);
          navigate("/re");
        } else {
          console.error("Login failed.");
        }
      }
    } catch (error) {
      console.error("Error during registration or login:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <h2 className="form-title">User Registration</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="input-field"
        required
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        className="textarea-field"
      />
      <input
        type="text"
        name="favorite_categories"
        placeholder="Favorite Categories (comma-separated)"
        value={formData.favorite_categories}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            favorite_categories: e.target.value.split(","),
          }))
        }
        className="input-field"
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        className="input-field"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="input-field"
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="text"
        name="hobbies"
        placeholder="Hobbies (comma-separated)"
        value={formData.hobbies}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            hobbies: e.target.value.split(","),
          }))
        }
        className="input-field"
      />
      <input
        type="text"
        name="occupation"
        placeholder="Occupation"
        value={formData.occupation}
        onChange={handleChange}
        className="input-field"
      />

      <h3 className="form-subtitle">Upload Profile Image</h3>
      <input
        type="file"
        name="profileImage"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
        required
      />

      <h3 className="form-subtitle">Address</h3>
      <input
        type="text"
        name="address.street"
        placeholder="Street"
        value={formData.address.street}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="text"
        name="address.city"
        placeholder="City"
        value={formData.address.city}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="text"
        name="address.zipCode"
        placeholder="Zip Code"
        value={formData.address.zipCode}
        onChange={handleChange}
        className="input-field"
      />

      <button type="submit" className="submit-button">
        Register
      </button>
    </form>
  );
}

export default SignIn;



// import React, { useState, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { registerUser, loginUser } from "../../service/ApiUser";
// import { useNavigate } from "react-router-dom";
// function SignIn() {
//   const { login } = useContext(AuthContext); // Get login function from AuthContext
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     email: "",
//     bio: "",
//     favorite_categories: [""],
//     age: "",
//     gender: "",
//     country: "",
//     hobbies: [""],
//     occupation: "",
//     address: {
//       street: "",
//       city: "",
//       zipCode: "",
//     },
//   });

//   // Update form data based on input field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     // Check for nested keys in the name (e.g., "address.street")
//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };
  

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Submitting form data:", formData);

//       // Register the user
//       const response = await registerUser(formData);
//       if (response) {
//         console.log("User registered successfully.");

//         // Automatically log in the user after successful registration
//         const loginResponse = await loginUser(
//           formData.email,
//           formData.password
//         );
//         if (loginResponse) {
//           console.log("Login successful:", loginResponse);
//           alert("User registered and logged in successfully!");
//           login(loginResponse); // Update context state
//           navigate("/re");
//         } else {
//           console.error("Login failed.");
//         }
//       }
//     } catch (error) {
//       console.error("Error during registration or login:", error.message);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>User Registration</h2>

//       {/* Basic Fields */}
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={formData.username}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       <textarea
//         name="bio"
//         placeholder="Bio"
//         value={formData.bio}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="favorite_categories"
//         placeholder="Favorite Categories (comma-separated)"
//         value={formData.favorite_categories}
//         onChange={(e) =>
//           setFormData((prev) => ({
//             ...prev,
//             favorite_categories: e.target.value.split(","),
//           }))
//         }
//       />
//       <input
//         type="number"
//         name="age"
//         placeholder="Age"
//         value={formData.age}
//         onChange={handleChange}
//       />
//       <select
//         name="gender"
//         value={formData.gender}
//         onChange={handleChange}
//         required
//       >
//         <option value="">Select Gender</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//         <option value="Other">Other</option>
//       </select>
//       <input
//         type="text"
//         name="country"
//         placeholder="Country"
//         value={formData.country}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="hobbies"
//         placeholder="Hobbies (comma-separated)"
//         value={formData.hobbies}
//         onChange={(e) =>
//           setFormData((prev) => ({
//             ...prev,
//             hobbies: e.target.value.split(","),
//           }))
//         }
//       />
//       <input
//         type="text"
//         name="occupation"
//         placeholder="Occupation"
//         value={formData.occupation}
//         onChange={handleChange}
//       />
// <input
//   type="file"
//   name="profileImage"
//   accept="image/*"
//   onChange={(e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, imageBase64: reader.result.split(",")[1] }));
//     };
//     reader.readAsDataURL(file);
//   }}
//   required
// />


//       {/* Address Fields */}
//       <h3>Address</h3>
//       <input
//         type="text"
//         name="address.street"
//         placeholder="Street"
//         value={formData.address.street}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="address.city"
//         placeholder="City"
//         value={formData.address.city}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="address.zipCode"
//         placeholder="Zip Code"
//         value={formData.address.zipCode}
//         onChange={handleChange}
//       />

//       {/* Submit Button */}
//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default SignIn;









