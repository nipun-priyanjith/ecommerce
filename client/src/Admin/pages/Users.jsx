import React from 'react'
// components/ViewUser.js
import { useState, useEffect } from 'react';
import { fetchUsers } from '../../service/ApiUser'; // Import the fetchUsers function
import ANavBar from '../../components/ANavBar';
import'../../components/css/au.css';
import Loading from '../../components/Loading';
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(); // Call the fetchUsers function from the service
        setUsers(data); // Set the user data in state
        setLoading(false); // Update loading state
      } catch (err) {
        setError(err.message); // Set error message in state
        setLoading(false); // Update loading state
      }
    };

    loadUsers();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) return <Loading/>;
  if (error) return <div>Error: {error}</div>;

  return (<>

    <div className="admin-users-page">
      
      <h1 className="page-title">User List</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-card">
            <div className="user-header">
              <p className="user-name">
                <strong>{user.username}</strong> 
                <span className="user-email-label"></span> {user.email}
              </p>
              <img 
                src={`data:image/jpeg;base64,${user.profileImage}`}  // Display image from Base64 string
                alt="User Profile" 
                className="user-profile-img" 
              />
            </div>
            <p className="user-detail"><strong>Bio:</strong> {user.bio}</p>
            <p className="user-detail"><strong>Age:</strong> {user.age}</p>
            <p className="user-detail"><strong>Gender:</strong> {user.gender}</p>
            <p className="user-detail"><strong>Country:</strong> {user.country}</p>
            <p className="user-detail"><strong>Hobbies:</strong> {user.hobbies.join(", ")}</p>
            <p className="user-detail"><strong>Occupation:</strong> {user.occupation}</p>
          </li>
        ))}
      </ul>
    </div></>
  );
}
export default Users