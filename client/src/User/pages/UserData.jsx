

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserData } from "../../service/ApiUser";
// import NavBar from "../../components/NavBar";
// import '../../components/css/myaccount.css';
// import Loading from "../../components/Loading";

// function UserData() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       getUserData(token)
//         .then((data) => setUser(data))
//         .catch((error) => console.error("Error fetching user data:", error));
//     }
//   }, []);

//   if (!user) {
//     return <Loading />;
//   }

//   return (
//     <div className="my-account-container">
//       <NavBar />
//       <h1 className="my-account-heading">{user.username}</h1>
//       <div className="my-account-content">
//         <div className="my-account-details">
//           <p className="my-account-info">
//             <strong>Email:</strong> {user.email}
//           </p>
//           <p className="my-account-info">
//             <strong>Bio:</strong> {user.bio}
//           </p>
//           <p className="my-account-info">
//             <strong>Age:</strong> {user.age}
//           </p>
//           <p className="my-account-info">
//             <strong>Gender:</strong> {user.gender}
//           </p>
//           <p className="my-account-info">
//             <strong>Country:</strong> {user.country}
//           </p>
//           <p className="my-account-info">
//             <strong>Occupation:</strong> {user.occupation}
//           </p>
//           <p className="my-account-info">
//             <strong>Hobbies:</strong> {user.hobbies?.join(", ")}
//           </p>
//           <p className="my-account-info">
//             <strong>Favorite Categories:</strong> {user.favorite_categories?.join(", ")}
//           </p>
//           <h3 className="my-account-heading">Address</h3>
//           <p className="my-account-info"><strong>City:</strong> {user.address.city}</p>
//           <p className="my-account-info"><strong>Country:</strong> {user.address.country}</p>
//           <p className="my-account-info"><strong>ZIP:</strong> {user.address.zip}</p>

//           <div className="button-container">
//         <button className="my-account-button" onClick={() => navigate('/help')}>
//           Help
//         </button>
//       </div>

//         </div>
//         <div className="profile-picture-container">
//           <img
//             className="profile-picture"
//             src="https://www.bing.com/th?id=OIP.N6fVTSGFt3ANWwLFrJk3OQHaEH&w=314&h=200&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
//             alt="User Profile"
//           />
//         </div>
        
//       </div>

//     </div>
//   );
// }

// export default UserData;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../service/ApiUser";
import NavBar from "../../components/NavBar";
import '../../components/css/myaccount.css';
import Loading from "../../components/Loading";
import { FaCog } from "react-icons/fa"; // Import settings icon from react-icons
import Bottom from "../../components/Buttom";

function UserData() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData(token)
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (<><NavBar />
    <div className="my-account-container">
      
      <div className="header-container">
        <h1 className="my-account-heading">{user.username}</h1>
        <FaCog
          className="settings-icon"
          onClick={() => navigate('/setting')}
          title="Settings"
        />
      </div>
      <div className="my-account-content">
        <div className="my-account-details">
          <p className="my-account-info">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="my-account-info">
            <strong>Bio:</strong> {user.bio}
          </p>
          <p className="my-account-info">
            <strong>Age:</strong> {user.age}
          </p>
          <p className="my-account-info">
            <strong>Gender:</strong> {user.gender}
          </p>
          <p className="my-account-info">
            <strong>Country:</strong> {user.country}
          </p>
          <p className="my-account-info">
            <strong>Occupation:</strong> {user.occupation}
          </p>
          <p className="my-account-info">
            <strong>Hobbies:</strong> {user.hobbies?.join(", ")}
          </p>
          <p className="my-account-info">
            <strong>Favorite Categories:</strong> {user.favorite_categories?.join(", ")}
          </p>
          <h3 className="my-account-heading">Address</h3>
          <p className="my-account-info"><strong>City:</strong> {user.address.city}</p>
          <p className="my-account-info"><strong>Country:</strong> {user.address.country}</p>
          <p className="my-account-info"><strong>ZIP:</strong> {user.address.zip}</p>

        </div>
        <div className="profile-picture-container">
          <img
            className="profile-picture"
            src="https://cdn-icons-png.freepik.com/512/6543/6543087.png?ga=GA1.1.1758546340.1714183750"
            alt="User Profile"
          />
        </div>
      </div>
    </div><Bottom/></>
  );
}

export default UserData;

